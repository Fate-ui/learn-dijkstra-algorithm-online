import ViteRestart from 'vite-plugin-restart'

/**
 * @name ConfigRestartPlugin
 * @description 监听配置文件修改自动重启Vite
 */
export const ConfigRestartPlugin = () => {
  return ViteRestart({
    restart: ['*.config.[jt]s', '**/config/*.[jt]s']
  })
}
