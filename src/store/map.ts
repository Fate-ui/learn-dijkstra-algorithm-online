import { acceptHMRUpdate, defineStore } from 'pinia'
import L from 'leaflet'

/**楼高*/
export const useMapStore = defineStore({
  id: 'map',
  state: () => ({
    map: null as L.Map,
    center: [1273.5, 674] as L.LatLngTuple,
    showNextButton: false,
    timelineNodes: []
  }),
  getters: {},
  actions: {
    init(id: string) {
      const map = L.map(id, {
        center: this.center, //地图中心点
        zoom: 0,
        zoomControl: false,
        crs: L.CRS.Simple,
        minZoom: -1,
        maxZoom: 6,
        attributionControl: false // 版权控件
      })
      this.map = map

      return map
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot))
}
