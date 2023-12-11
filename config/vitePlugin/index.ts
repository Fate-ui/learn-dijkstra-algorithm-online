import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import { unocssPlugin } from './unocss'
import { ConfigRestartPlugin } from './restart'
import { AutoRegistryComponents } from './component'
import { AutoImportDeps } from './autoImport'
import { ConfigSvgIconsPlugin } from './svgIcons'
import type { PluginOption } from 'vite'

export function createVitePlugins(): PluginOption[] {
  return [
    vue(),
    /*原子化CSS插件*/
    unocssPlugin(),
    /* 打包分析 */
    visualizer(),
    // 自动按需引入组件
    AutoRegistryComponents(),
    // 自动按需引入依赖
    AutoImportDeps(),
    /* 监听配置文件改动重启 */
    ConfigRestartPlugin(),
    ConfigSvgIconsPlugin()
  ]
}
