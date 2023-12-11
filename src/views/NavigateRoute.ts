import type { IPoint } from '@/utils'
import { getDistance, isPointEqual } from '@/utils'

export interface ISegment {
  start: IPoint
  end: IPoint
}

export class Node {
  parent: Node = null
  cost: number = null
  id: string
  point: IPoint
  children: IGraphChildren[]
  constructor(segment: IGraph) {
    this.id = segment.id
    this.children = segment.children
    this.point = segment.point
  }
}

export class NavigateRoute {
  nodes: Node[] = []
  currentNode: Node
  closeList: Node[] = []
  path: IPoint[] = []
  startPoint: IPoint
  endPoint: IPoint
  constructor() {}

  navigate(routeSegments: ISegment[], startPoint: IPoint, endPoint: IPoint) {
    this.currentNode = null
    this.closeList = []
    this.path = []
    this.startPoint = startPoint
    this.endPoint = endPoint

    if (!routeSegments) return
    const graphList = toGraphStructure(routeSegments)
    const segmentNodes = graphList.map((item) => new Node(item))
    this.nodes = segmentNodes
    const index = segmentNodes.findIndex((item) => isPointEqual(item.point, startPoint))
    segmentNodes[index].cost = 0
    this.currentNode = segmentNodes[index]
    this.foundRoute()
  }

  foundRoute() {
    if (this.currentNode) {
      const current = this.currentNode
      const nodes = this.nodes.filter((item) => !this.closeList.includes(item) && current.children.some((el) => el.id === item.id))

      for (const node of nodes) {
        const index = current.children.findIndex((item) => item.id === node.id)
        const cost = current.cost + current.children[index].distance
        if (node.cost === null || cost < node.cost) {
          node.cost = cost
          node.parent = current
        }
      }

      this.closeList.push(current)
      this.currentNode = null
      const path = this.#foundSmallestCostRoute()
      if (path) {
        return path
      }
    }
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

    // 如果最小节点是终点，则找到最短路径
    if (isPointEqual(minCostNode.point, this.endPoint)) {
      const path = this.#generatePath(minCostNode)
      this.path = path
      return path
    }

    this.currentNode = minCostNode
    this.foundRoute()
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
}

interface IGraphChildren {
  id: string
  type: number
  distance: number
}

interface IGraph {
  id: string
  point: IPoint
  children: IGraphChildren[]
}

/**
 * 将线段数据处理成图结构
 * ISegment[] -> IGraph[]
 * */
export function toGraphStructure(list: ISegment[]) {
  // 给list中的每个点添加id
  for (const item of list) {
    item.start.id = `${item.start.x}-${item.start.y}`
    item.end.id = `${item.end.x}-${item.end.y}`
  }

  const graphList: IGraph[] = []
  for (const item of list) {
    const start = item.start
    const end = item.end
    const distance = getDistance(start, end)
    const startGraph = graphList.find((el) => el.id === start.id)
    const endGraph = graphList.find((el) => el.id === end.id)
    if (!startGraph) {
      const point = { x: start.x, y: start.y }
      graphList.push({ point, children: [{ id: end.id, type: 1, distance }], id: start.id })
    } else {
      const child = startGraph.children.find((el) => isPointEqual(el.id, end))
      if (!child) {
        startGraph.children.push({ id: end.id, type: 1, distance })
      }
    }

    if (!endGraph) {
      const point = { x: end.x, y: end.y }
      graphList.push({ point, children: [{ id: start.id, type: 1, distance }], id: end.id })
    } else {
      const child = endGraph.children.find((el) => isPointEqual(el.id, start))
      if (!child) {
        endGraph.children.push({ id: start.id, type: 1, distance })
      }
    }
  }

  return graphList
}
