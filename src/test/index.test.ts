import { expect, test } from 'vitest'
import { isPolygonsOverlap } from '@/test/utils'

test('判断多边形是否相交', () => {
  const polygon1 = [
    { x: 0, y: 0 },
    { x: 0, y: 10 },
    { x: 10, y: 10 },
    { x: 10, y: 0 }
  ]
  const polygon2 = [
    { x: 5, y: 5 },
    { x: 5, y: 15 },
    { x: 15, y: 15 },
    { x: 15, y: 5 }
  ]

  expect(isPolygonsOverlap(polygon1, polygon2)).toBe(true)
  // 绘制两个不相交的多边形
  const polygon3 = [
    { x: 0, y: 0 },
    { x: 0, y: 10 },
    { x: 10, y: 10 },
    { x: 10, y: 0 }
  ]
  const polygon4 = [
    { x: 15, y: 15 },
    { x: 15, y: 25 },
    { x: 25, y: 25 },
    { x: 25, y: 15 }
  ]
  expect(isPolygonsOverlap(polygon3, polygon4)).toBe(false)
  // 用例3
  const polygon5 = [
    { x: 0, y: 0 },
    { x: 0, y: 10 },
    { x: 10, y: 10 },
    { x: 10, y: 0 }
  ]
  const polygon6 = [
    { x: 5, y: 5 },
    { x: 5, y: 15 },
    { x: 15, y: 15 },
    { x: 15, y: 5 }
  ]
  expect(isPolygonsOverlap(polygon5, polygon6)).toBe(true)
})
