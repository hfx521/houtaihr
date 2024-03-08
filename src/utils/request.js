import axios from 'axios'
import store from '@/store'
import {Message} from 'element-ui'
const service = axios.create({
  baseURL:process.env.VUE_APP_BASE_API,//基础地址
  timeout:10000 //十秒钟
}) //创建一个新的axios实例
//成功1 失败2
service.interceptors.request.use((config) => {
  //注入token
  //store.getters.token => 请求头里面
  if (store.getters.token){
    config.headers.Authorization = 'Bearer ${store.getters.token}'
  }
  return config
}, (error) => {
  //失败执行promise
  return Promise.reject(error)
})
//响应拦截器
service.interceptors.response.use((response) => {
  //axios默认包括data
  const {data,message,success} = response.data
  if (success) {
    return data
  }else {
    Message({type:'error',message})
    return Promise.reject(new Error(message))
  }
}, (error) => {
  //error.message
  Message({type:'error',message:error.message})
  return Promise.reject(error)
})
export default service