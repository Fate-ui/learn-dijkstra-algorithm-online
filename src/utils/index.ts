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
