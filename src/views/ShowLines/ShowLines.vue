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
  for (const line of lineList) {
    const { start, end } = line
    const latLng = [
      [start.y, start.x],
      [end.y, end.x]
    ] as unknown as L.LatLngExpression[][]
    const polyline = L.polyline(latLng, { color: '#3388FF' }).addTo(map)
    const myIcon = L.divIcon({ className: 'line-icon', html: `${getDistance(start, end)}`, iconSize: [30, 30] })
    const marker = L.marker(polyline.getCenter(), { icon: myIcon }).addTo(map)
  }
}
</script>
<template>
  <div id="leaflet" class="w-screen h-screen" />
</template>

<style scoped lang="scss">
#leaflet {
  background-color: #99cc99;
  background-image: url(@/assets/texture.png);
}
</style>
