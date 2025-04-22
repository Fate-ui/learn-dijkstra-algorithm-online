import L from 'leaflet'
import { Node, isPointEqual } from './NavigateRoute'
import type { IPoint } from './NavigateRoute'
import type { ISegment } from '@/views/NavigateRoute'
import { useMapStore } from '@/store/map'
import { toGraphStructure } from '@/views/NavigateRoute'

const popupOptions: L.PopupOptions = { autoClose: false, closeOnClick: false }

export class StepNavigateRoute {
  nodes: Node[] = []
  currentNode: Node
  closeList: Node[] = []
  path: IPoint[] = []
  pathLine: L.Polyline

  startPoint: IPoint
  endPoint: IPoint

  vertexMarkers = []
  lines: L.Polyline[] = []
  popups: L.Popup[] = []

  generator: Generator<Node, IPoint[], unknown>

  constructor() {}

  navigate(routeSegments: ISegment[], startPoint: IPoint, endPoint: IPoint) {
    this.currentNode = null
    this.closeList = []
    this.path = []

    this.startPoint = startPoint
    this.endPoint = endPoint

    const graphList = toGraphStructure(routeSegments)
    const mapStore = useMapStore()
    mapStore.showNextButton = true
    const map = toRaw(mapStore.map) as L.Map
    const segmentNodes = graphList.map((item) => new Node(item))

    for (const [index, segmentNode] of segmentNodes.entries()) {
      const myIcon = L.divIcon({
        className: 'my-div-icon',
        html: `${index}`,
        iconSize: [30, 30],
        popupAnchor: [0, -20]
      })
      const point = { lat: segmentNode.point.y, lng: segmentNode.point.x }
      const marker = L.marker(point, { icon: myIcon }).addTo(map)

      this.vertexMarkers.push(marker)
    }

    this.nodes = segmentNodes
    const index = segmentNodes.findIndex((item) => isPointEqual(item.point, startPoint))
    this.currentNode = segmentNodes[index]
    segmentNodes[index].cost = 0
    this.generator = this.foundRoute.call(this)
    this.generator.next()
    this.generator.next()
  }

  foundRoute = function* (this: StepNavigateRoute) {
    yield
    if (this.currentNode) {
      this.#removeLines()
      const current = this.currentNode
      const nodes = this.nodes.filter((item) => !this.closeList.includes(item) && current.children.some((el) => el.id === item.id))

      const mapStore = useMapStore()
      const map = toRaw(mapStore.map) as L.Map
      const index = this.nodes.findIndex((item) => item.id === current.id)
      mapStore.timelineNodes.push({ content: `将节点${index}作为当前节点，节点代价：${current.cost}` })
      const marker = this.vertexMarkers[index] as L.Marker
      marker.closePopup()
      const iconElement = marker.getElement() as HTMLDivElement
      iconElement.classList.remove('ripple')
      iconElement.style.backgroundColor = '#53e553'

      yield

      for (const node of nodes) {
        const nodeIndex = current.children.findIndex((item) => item.id === node.id)
        const cost = current.cost + current.children[nodeIndex].distance
        const currentPoint = { lat: current.point.y, lng: current.point.x }
        const nodePoint = { lat: node.point.y, lng: node.point.x }
        this.lines.push(L.polyline([currentPoint, nodePoint], { color: '#FFFF00', weight: 5 }).addTo(map))
        const tempIndex = this.nodes.findIndex((item) => item.id === node.id)
        if (node.cost === null || cost < node.cost) {
          if (node.cost === null) {
            mapStore.timelineNodes.push({ content: `计算节点${tempIndex}的代价：${cost}，并将节点${tempIndex}的父节点设为节点${index}` })
          } else {
            mapStore.timelineNodes.push({
              content: `再次计算节点${tempIndex}的代价：${cost}（比原来的代价：${node.cost}小），更新代价，，并将节点${tempIndex}的父节点设为节点${index}`
            })
          }

          node.cost = cost
          node.parent = current
          const markerIndex = this.nodes.findIndex((item) => item.id === node.id)
          const marker = this.vertexMarkers[markerIndex]
          marker.closePopup()
          const iconElement = marker.getElement() as HTMLDivElement
          const popup = marker.bindPopup(`代价：${node.cost} &nbsp;&nbsp; 父节点：${index}号`, popupOptions)
          this.popups.push(popup)
          popup.openPopup()
          iconElement.style.backgroundColor = 'pink'
        } else {
          mapStore.timelineNodes.push({
            content: `再次计算节点${tempIndex}的代价：${cost}（比原来的代价：${node.cost}大），不更新代价`
          })
        }

        yield
      }

      iconElement.style.backgroundColor = '#ccc'
      this.closeList.push(current)
      mapStore.timelineNodes.push({ content: `在遍历完当前节点周围所有的节点后将当前节点${index}加入关闭节点列表中，后续将不再遍历该节点` })
      yield
      const path = this.#foundSmallestCostRoute()
      if (path) {
        return path
      }
    }
  }

  #removeLines() {
    for (const line of this.lines) {
      line.remove()
    }

    this.lines = []
  }

  #foundSmallestCostRoute() {
    // 排除已经在关闭列表中的节点
    const okNodes = this.nodes.filter((item) => !this.closeList.includes(item))
    if (!okNodes.length) return
    // 找到代价存在且最小的节点
    const minCostNode = okNodes.reduce((prev, current) => {
      if (prev.cost === null) return current
      if (current.cost && current.cost < prev.cost) return current
      return prev
    }, okNodes[0])

    const markerIndex = this.nodes.findIndex((item) => item.id === minCostNode.id)
    const marker = this.vertexMarkers[markerIndex]
    const iconElement = marker.getElement() as HTMLDivElement

    const mapStore = useMapStore()

    // 绘制当前找到的最小代价节点到起点的临时路径
    const path = this.#drawCurrentPath(minCostNode)

    // 如果最小节点是终点，则找到最短路径
    if (isPointEqual(minCostNode.point, this.endPoint)) {
      this.path = path
      iconElement.style.backgroundColor = '#53e553'
      this.popups.forEach((item) => item.closePopup())
      this.#removeLines()
      mapStore.timelineNodes.push({ content: `找到代价最小的节点${markerIndex}，该节点是终点，停止寻找，追溯该节点的父节点找到最短路径` })

      this.currentNode = null
      mapStore.showNextButton = false
      return path
    }

    mapStore.timelineNodes.push({ content: `找到代价最小的节点${markerIndex}` })

    iconElement.classList.add('ripple')
    marker.closePopup()
    marker.openPopup()

    this.currentNode = minCostNode
    this.generator = this.foundRoute.call(this)
    this.generator.next()
  }

  #generatePath(node: Node) {
    const path = [node.point]
    let current = node
    while (current.parent) {
      path.push(current.parent.point)
      current = current.parent
    }

    path.reverse()
    return path
  }

  #drawCurrentPath(node: Node) {
    // 先移除之前的临时路径线
    this.pathLine?.remove()
    this.pathLine = null

    // 生成从当前节点到起点的路径
    const tempPath = this.#generatePath(node)

    // 在地图上绘制这条临时路径
    const mapStore = useMapStore()
    const map = toRaw(mapStore.map) as L.Map

    this.pathLine = L.polyline(
      tempPath.map((el) => ({ lat: el.y, lng: el.x })),
      { color: '#53e553', weight: 5 } // 使用虚线样式
    ).addTo(map)

    return tempPath
  }

  clear() {
    this.#removeLines()
    this.popups.forEach((item) => {
      item.closePopup()
      item.unbindPopup()
    })
    this.vertexMarkers.forEach((item) => item.remove())
    this.vertexMarkers = []
    this.pathLine?.remove()
    this.popups = []
    this.nodes = []
    this.currentNode = null
    this.closeList = []
    this.path = []
    const mapStore = useMapStore()
    mapStore.timelineNodes = []
  }
}
