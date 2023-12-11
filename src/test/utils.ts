//判断两多边形线段是否相交
function isSegmentsIntersectant(segA, segB) {
  //线线
  const abc = (segA[0].x - segB[0].x) * (segA[1].y - segB[0].y) - (segA[0].y - segB[0].y) * (segA[1].x - segB[0].x)
  const abd = (segA[0].x - segB[1].x) * (segA[1].y - segB[1].y) - (segA[0].y - segB[1].y) * (segA[1].x - segB[1].x)
  if (abc * abd >= 0) {
    return false
  }

  const cda = (segB[0].x - segA[0].x) * (segB[1].y - segA[0].y) - (segB[0].y - segA[0].y) * (segB[1].x - segA[0].x)
  const cdb = cda + abc - abd
  return !(cda * cdb >= 0)
}

//判断两多边形边界是否相交
function isPolygonsIntersectant(plyA, plyB) {
  //面面
  for (let i = 0, il = plyA.length; i < il; i++) {
    for (let j = 0, jl = plyB.length; j < jl; j++) {
      const segA = [plyA[i], plyA[i === il - 1 ? 0 : i + 1]]
      const segB = [plyB[j], plyB[j === jl - 1 ? 0 : j + 1]]
      if (isSegmentsIntersectant(segA, segB)) {
        return true
      }
    }
  }

  return false
}

//判断点是否在另一平面图中
function isPointInPolygon(point, polygon) {
  //下述代码来源：http://paulbourke.net/geometry/insidepoly/，进行了部分修改
  //基本思想是利用射线法，计算射线与多边形各边的交点，如果是偶数，则点在多边形外，否则
  //在多边形内。还会考虑一些特殊情况，如点在多边形顶点上，点在多边形边上等特殊情况。

  const N = polygon.length
  const boundOrVertex = true //如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true
  let intersectCount = 0 //cross points count of x
  const precision = 2e-10 //浮点类型计算时候与0比较时候的容差
  let p1, p2 //neighbour bound vertices
  const p = point //测试点

  p1 = polygon[0] //left vertex
  for (let i = 1; i <= N; ++i) {
    //check all rays
    if (p.x == p1.x && p.y == p1.y) {
      return boundOrVertex //p is an vertex
    }

    p2 = polygon[i % N] //right vertex
    if (p.y < Math.min(p1.y, p2.y) || p.y > Math.max(p1.y, p2.y)) {
      //ray is outside of our interests
      p1 = p2
      continue //next ray left point
    }

    if (p.y > Math.min(p1.y, p2.y) && p.y < Math.max(p1.y, p2.y)) {
      //ray is crossing over by the algorithm (common part of)
      if (p.x <= Math.max(p1.x, p2.x)) {
        //x is before of ray
        if (p1.y == p2.y && p.x >= Math.min(p1.x, p2.x)) {
          //overlies on a horizontal ray
          return boundOrVertex
        }

        if (p1.x == p2.x) {
          //ray is vertical
          if (p1.x == p.x) {
            //overlies on a vertical ray
            return boundOrVertex
          } else {
            //before ray
            ++intersectCount
          }
        } else {
          //cross point on the left side
          const xinters = ((p.y - p1.y) * (p2.x - p1.x)) / (p2.y - p1.y) + p1.x //cross point of x
          if (Math.abs(p.x - xinters) < precision) {
            //overlies on a ray
            return boundOrVertex
          }

          if (p.x < xinters) {
            //before ray
            ++intersectCount
          }
        }
      }
    } else {
      //special case when ray is crossing through the vertex
      if (p.y == p2.y && p.x <= p2.x) {
        //p crossing over p2
        const p3 = polygon[(i + 1) % N] //next vertex
        if (p.y >= Math.min(p1.y, p3.y) && p.y <= Math.max(p1.y, p3.y)) {
          //p.y lies between p1.y & p3.y
          ++intersectCount
        } else {
          intersectCount += 2
        }
      }
    }

    p1 = p2 //next ray left point
  }

  if (intersectCount % 2 == 0) {
    //偶数在多边形外
    return false
  } else {
    //奇数在多边形内
    return true
  }
}

//判断两多变形是否存在点与区域的包含关系(A的点在B的区域内或B的点在A的区域内)
function isPointInPolygonBidirectional(plyA, plyB) {
  //面面
  let [a, b] = [false, false]
  a = plyA.some((item) => isPointInPolygon(item, plyB))
  if (!a) {
    b = plyB.some((item) => isPointInPolygon(item, plyA))
  }

  return a || b
}

export function isPolygonsOverlap(plyA, plyB) {
  return isPolygonsIntersectant(plyA, plyB) || isPointInPolygonBidirectional(plyA, plyB)
}
