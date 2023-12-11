import type { BuildOptions } from 'vite'

/**
 *  打包配置
 */
export function buildConfig(): BuildOptions {
  const timestamp = Date.now()
  return {
    target: 'chrome65',
    //是否生成映射文件，便于上线后调试
    sourcemap: true,
    // 关闭文件计算
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        chunkFileNames: `js/chunk-[name]-[hash]-${timestamp}.js`,
        entryFileNames: `js/[name].js`,
        assetFileNames: (assertInfo) => {
          let dest = `assets/[name]-[hash]-${timestamp}[extname]`
          if (assertInfo.name.lastIndexOf('css') != -1) {
            dest = `css/[name]-[hash]-${timestamp}[extname]`
          }

          return dest
        },
        manualChunks: {
          vue: ['vue', 'vue-router'],
          'element-plus': ['element-plus']
        }
      }
    }
  }
}
