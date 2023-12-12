<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import L from 'leaflet'
import ShowLines from '@/views/ShowLines/ShowLines.vue'
import { lineList } from '@/views/ShowLines/segements'
import { useMapStore } from '@/store/map'
import { StepNavigateRoute } from '@/views/StepNavigateRoute'
import ShowStepText from '@/views/ShowStepText/ShowStepText.vue'

const stepNavigateRoute = new StepNavigateRoute()
let startPoint = lineList[0].start
let endPoint = lineList.at(-1).end

const mapStore = useMapStore()
watch(
  () => mapStore.map,
  (val) => {
    if (!val) return
    stepNavigateRoute.navigate(lineList, startPoint, endPoint)
    startEndSerial.value.end = stepNavigateRoute.nodes.length - 1
    markStartEndPoint()
  }
)

const markers = []
function markStartEndPoint() {
  for (const marker of markers) {
    marker.remove()
  }

  const map = toRaw(mapStore.map as unknown as L.Map)
  const points = [startPoint, endPoint]
  const text = ['起点', '终点']
  for (const [index, point] of points.entries()) {
    const latLng = [point.y, point.x] as unknown as L.LatLngExpression
    const myIcon = L.divIcon({ className: '!mt-20px text-center', html: `${text[index]}`, iconSize: [30, 30] })
    const marker = L.marker(latLng, { icon: myIcon }).addTo(map)
    markers.push(marker)
  }
}

function next() {
  const generator = stepNavigateRoute.generator
  generator.next()
}

function reset() {
  stepNavigateRoute.clear()
  stepNavigateRoute.navigate(lineList, startPoint, endPoint)
  markStartEndPoint()
}

const startEndSerial = ref({ start: 0, end: 0 })
const showConfig = ref(false)
const maxLength = ref(0)
function openConfigDialog() {
  maxLength.value = stepNavigateRoute.nodes.length - 1
  showConfig.value = true
}

function confirmConfig() {
  if (startEndSerial.value.start === startEndSerial.value.end) {
    ElMessage.error({ message: '起点和终点不能一样', grouping: true })
    return
  }

  startPoint = stepNavigateRoute.nodes[startEndSerial.value.start].point
  endPoint = stepNavigateRoute.nodes[startEndSerial.value.end].point
  stepNavigateRoute.clear()
  stepNavigateRoute.navigate(lineList, startPoint, endPoint)
  markStartEndPoint()
  showConfig.value = false
}
</script>
<template>
  <ShowLines />
  <div class="fixed top-20px left-1/2 -translate-x-1/2 px-12px py-6px flex items-center z-999">
    <el-button v-if="mapStore.showNextButton" type="primary" @click="next">下一步</el-button>
    <el-button plain type="primary" @click="reset">重置</el-button>
  </div>
  <ShowStepText class="fixed top-20px left-20px z-999" />
  <div class="fixed top-20px right-20px px-12px py-6px flex items-center z-999 cursor-pointer">
    <el-tooltip content="配置起始点">
      <SvgIcon name="dehaze" text="30px" @click="openConfigDialog" />
    </el-tooltip>
  </div>
  <el-dialog v-model="showConfig" title="配置" width="20vw">
    <el-form class="!mx-auto">
      <el-form-item label="起点序号">
        <el-input-number v-model="startEndSerial.start" :min="0" :max="maxLength" />
      </el-form-item>
      <el-form-item label="终点序号">
        <el-input-number v-model="startEndSerial.end" :min="0" :max="maxLength" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="confirmConfig">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
