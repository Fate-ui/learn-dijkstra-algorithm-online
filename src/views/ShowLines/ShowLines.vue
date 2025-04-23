<script lang="ts" setup>
import L from 'leaflet'
import { getDistance } from '@/views/NavigateRoute'
import 'leaflet/dist/leaflet.css'
import { useMapStore } from '@/store/map'
import { lineList } from '@/views/ShowLines/segements'

onMounted(() => {
  init()
})

let map: L.Map
const mapStore = useMapStore()
function init() {
  map = mapStore.init('leaflet')
  drawLine()
}

function drawLine() {
  // 用于计算边界的数组
  const bounds = new L.LatLngBounds([])

  for (const line of lineList) {
    const { start, end } = line
    const latLng = [
      [start.y, start.x],
      [end.y, end.x]
    ] as unknown as L.LatLngExpression[][]
    const polyline = L.polyline(latLng, { color: '#3388FF' }).addTo(map)
    const myIcon = L.divIcon({ className: 'text-gray', html: `${getDistance(start, end)}`, iconSize: [30, 30] })
    L.marker(polyline.getCenter(), { icon: myIcon }).addTo(map)

    // 将每条线的起点和终点添加到边界计算中
    bounds.extend([start.y, start.x])
    bounds.extend([end.y, end.x])
  }

  // 如果有线段，则将地图视图设置为包含所有线段的区域
  if (lineList.length > 0) {
    map.fitBounds(bounds, {
      padding: [50, 50], // 添加一些内边距使所有线段在视图中有一定的空间
      maxZoom: 15 // 限制最大缩放级别，防止缩放过度
      // animate: true
    })
  }
}
</script>
<template>
  <div id="leaflet" class="w-screen h-screen" />
</template>

<style scoped lang="scss">
#leaflet {
  background-color: #f5f5f5;
  background-image: url(@/assets/texture.png);
}
</style>
