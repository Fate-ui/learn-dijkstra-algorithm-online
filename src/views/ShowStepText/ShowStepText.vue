<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { useMapStore } from '@/store/map'

const mapStore = useMapStore()
const { timelineNodes } = storeToRefs(mapStore)
const containerRef = shallowRef<HTMLDivElement>()

/**
 * 监听timelineNodes的变化，当timelineNodes变化时，滚动到底部
 * */
watch(
  timelineNodes,
  () => {
    nextTick(() => {
      containerRef.value?.scrollTo(0, containerRef.value.scrollHeight)
    })
  },
  { deep: true }
)

/**
 * 控制左侧内容栏的显示与隐藏
 * */
const showBar = ref(true)
function toggleBar() {
  showBar.value = !showBar.value
}
</script>

<template>
  <div>
    <div
      ref="containerRef"
      :class="{ '!w-0 !p-0': !showBar }"
      class="bar bg-white w-300px max-h-50vh rounded p-12px overflow-y-scroll overflow-x-hidden break-all"
      text="justify"
    >
      <el-timeline class="!pl-0 w-280px">
        <el-timeline-item v-for="(activity, index) in timelineNodes" :key="index" :timestamp="activity.timestamp">
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
      <div v-if="timelineNodes.length > 1" class="text-gray" text="12px">提示：节点的代价 = 父节点的代价 + 节点间距</div>
    </div>
    <div
      class="absolute top-6px right-0 translate-x-full z-9 grid place-items-center w-13px h-44px rounded-r-6px bg-#D8D8D8 cursor-pointer"
      text="14px white"
      hover="bg-#8c8c8c"
      @click="toggleBar"
    >
      <el-icon v-if="showBar">
        <ArrowLeftBold />
      </el-icon>
      <el-icon v-else>
        <ArrowRightBold />
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
$tr: var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);

.bar {
  transition:
    width $tr,
    padding $tr;
}
</style>
