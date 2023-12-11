/// <reference types="vite/client" />

import type { CustomControlOptions } from 'leaflet'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>
  export default component
}
