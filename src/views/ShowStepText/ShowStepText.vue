<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/store/map'

const mapStore = useMapStore()
const { timelineNodes } = storeToRefs(mapStore)
const containerRef = shallowRef<HTMLDivElement>()
watch(
  timelineNodes,
  () => {
    nextTick(() => {
      containerRef.value?.scrollTo(0, containerRef.value.scrollHeight)
    })
  },
  { deep: true }
)
</script>

<template>
  <div ref="containerRef" class="bg-white w-300px max-h-50vh rounded p-12px overflow-y-scroll break-all" text="justify">
    <el-timeline class="!pl-0">
      <el-timeline-item v-for="(activity, index) in timelineNodes" :key="index" :timestamp="activity.timestamp">
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
    <div v-if="timelineNodes.length > 1" class="text-gray" text="12px">提示：节点的代价 = 父节点的代价 + 节点间距</div>
  </div>
</template>

<style scoped lang="scss"></style>
