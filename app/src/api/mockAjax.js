/* 对于axios进行二次封装 */

import axios from 'axios'
// 引入进度条：其中start：进度条开始 done：进度条结束
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'// 引入进度条的样式


// 1.利用axios对象的方法create，去创建一个axios实例
// 2.requests就是axios，只不过是稍微配置一下
const requests=axios.create({
    // 基础路径，发送请求的时候，路径中会出现api
    baseURL:'/mock',
    timeout:5000,
});

// 请求拦截器：在发送请求前，请求拦截器可以检测到，能够在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config：配置对象，对象里面有一个属性很重要，headers请求头
    // 进度条开始
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use(
    (res)=>{
        // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，能够做一些事情
        // 进度条结束
        nprogress.done()
        return res.data;
    },
    (err)=>{
        // 响应失败的回调函数
        return Promise.reject(new Error('faile'))
    }
)
// 对外暴露
export default requests