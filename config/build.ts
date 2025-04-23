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
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: 'js/[name].[hash].js',
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'js/[name].[hash].js',
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: (assetInfo: any) => {
          const info = assetInfo.name.split('.')
          let extType = info[info.length - 1]
          // console.log('文件信息', assetInfo.name)
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'media'
          } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
            extType = 'img'
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'fonts'
          }

          return `${extType}/[name].[hash].[ext]`
        },
        manualChunks: {
          vue: ['vue', 'vue-router'],
          'element-plus': ['element-plus']
        }
      }
    }
  }
}
