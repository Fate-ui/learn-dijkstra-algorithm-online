<script lang="ts" setup>
import L from 'leaflet'
import ShowLines from '@/views/ShowLines/ShowLines.vue'
import { lineList } from '@/views/ShowLines/segements'
import { useMapStore } from '@/store/map'
import { StepNavigateRoute } from '@/views/StepNavigateRoute'
import ShowStepText from '@/views/ShowStepText/ShowStepText.vue'

const stepNavigateRoute = new StepNavigateRoute()
const startPoint = lineList[0].start
const endPoint = lineList.at(-1).end

const mapStore = useMapStore()
watch(
  () => mapStore.map,
  (val) => {
    if (!val) return
    stepNavigateRoute.navigate(lineList, startPoint, endPoint)
    markStartEndPoint()
  }
)

function markStartEndPoint() {
  const map = toRaw(mapStore.map as unknown as L.Map)
  const points = [startPoint, endPoint]
  const text = ['起点', '终点']
  for (const [index, point] of points.entries()) {
    const latLng = [point.y, point.x] as unknown as L.LatLngExpression
    const myIcon = L.divIcon({ className: '!mt-20px text-center', html: `${text[index]}`, iconSize: [30, 30] })
    const marker = L.marker(latLng, { icon: myIcon }).addTo(map)
  }
}

function next() {
  const generator = stepNavigateRoute.generator
  generator.next()
}
</script>
<template>
  <ShowLines />
  <div class="fixed top-20px left-1/2 -translate-x-1/2 px-12px py-6px flex items-center z-999">
    <el-button v-if="mapStore.showNextButton" plain type="primary" @click="next">下一步</el-button>
  </div>
  <ShowStepText class="fixed top-20px left-20px z-999" />
</template>

<style scoped lang="scss"></style>
