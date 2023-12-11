import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { AxiosRequestConfig } from 'axios'

//声明请求响应对象
export interface Result<T = any> {
  data: T
  message: string
  code: number
  success: boolean
}

//转换错误信息
const translate = (errMessage) => {
  if (errMessage.includes('Request failed with status code')) {
    return errMessage.replace('Request failed with status code', '服务请求失败 状态码为:')
  }

  if (errMessage.includes('timeout of')) {
    return '服务请求超时 20000ms'
  }

  return errMessage
}

// 创建axios实例
const service = axios.create({
  baseURL: '/api', // 请求基础路径
  // withCredentials: true, // 跨域请求是否携带cookie
  timeout: 20000 // 请求超时时间毫秒
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error) => {
    // 请求还未发送前出错
    console.log(error) //
    return Promise.reject(error)
  }
)
let isExecuting = false
// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果您想要获得http信息，例如头或状态
   * 请 return  response => response
   */
  (response) => {
    const res = response.data
    //如果响应状态码不是200
    if (res.code && res.code !== 200) {
      ElMessage({
        message: res.message || '请求错误!',
        grouping: true,
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 10002 && !isExecuting) {
        // 权限问题跳转到重新登录
        ElMessageBox.confirm('您已经登出，您可以取消留在此页面，或重新登录!', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {})
          .catch((reason) => {
            console.log(reason)
          })
          .finally(() => {
            isExecuting = false
          })
      }

      if (res.code === 99999) {
        console.log(`%c [${response.config.url}]接口返回的数据有误`, 'color: red;')
        return res
      }

      return Promise.reject(`[${response.config.url}]接口返回的数据有误` || '请求错误')
    } else {
      return res
    }
  },
  (error) => {
    console.log(`err${error}`) // for debug
    ElMessage({
      message: translate(error.message),
      grouping: true,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export const createAPI = <T = any>(url, method, data?, config: AxiosRequestConfig = {}): Promise<Result<T>> => {
  if (method === 'get') {
    config.params = data
  } else {
    config.data = data
  }

  return service({
    url,
    method,
    ...config
  }) as any
}
