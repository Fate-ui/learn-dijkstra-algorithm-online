import { createAPI } from '@/utils/request'

// 获取标准时间,包含时间服务器地址
export const generatePath = (data) => createAPI('api/line', 'post', data)
// export const generatePath = (data) => createAPI('http://192.168.101.13:5000/api/line', 'post', data)
