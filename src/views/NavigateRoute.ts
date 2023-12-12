export class NavigateRoute {
  nodes: Node[] = []
  currentNode: Node
  closeList: Node[] = []

  startPoint: IPoint
  endPoint: IPoint

  path: IPoint[] = []
  constructor() {}

  navigate(routeSegments: ISegment[], startPoint: IPoint, endPoint: IPoint) {
    this.closeList = []
    this.path = []
    this.startPoint = startPoint
    this.endPoint = endPoint
    if (!routeSegments.length) return
    const graphList = toGraphStructure(routeSegments)
    const segmentNodes = graphList.map((item) => new Node(item))
    this.nodes = segmentNodes
    /**将开始点作为寻路起点*/
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
      this.#foundSmallestCostRoute()
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
      this.currentNode = null
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

export interface IPoint {
  x: number
  y: number
  id?: string
}

export function getDistance(p1: IPoint, p2: IPoint) {
  const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
  return Math.floor(distance * 100) / 100
}

/**
 * 判断两坐标点是否相等
 * */
export function isPointEqual(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y
}

interface IGraphChildren {
  id: string
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
    if (!startGraph) {
      const point = { x: start.x, y: start.y }
      graphList.push({ point, children: [{ id: end.id, distance }], id: start.id })
    } else {
      const child = startGraph.children.find((el) => isPointEqual(el.id, end))
      if (!child) {
        startGraph.children.push({ id: end.id, distance })
      }
    }

    const endGraph = graphList.find((el) => el.id === end.id)
    if (!endGraph) {
      const point = { x: end.x, y: end.y }
      graphList.push({ point, children: [{ id: start.id, distance }], id: end.id })
    } else {
      const child = endGraph.children.find((el) => isPointEqual(el.id, start))
      if (!child) {
        endGraph.children.push({ id: start.id, distance })
      }
    }
  }

  return graphList
}
