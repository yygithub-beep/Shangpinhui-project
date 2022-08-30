// 引入
import Vue from "vue";
import VueRouter from 'vue-router';
import routes from './routes'
// 使用插件
Vue.use(VueRouter);
// 引入store
import store from '@/store'
import { removeToken } from "@/utils/token";



// 先把Vuerouter原型对象上的push保存一份
let originPush=VueRouter.prototype.push;
let originPlace=VueRouter.prototype.Place;

// 重写push|replace
// 第一个参数：告诉原来push方法，往哪里跳（传递那些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
/* 
    call||apply区别：
    相同点：可以调用函数一次并篡改函数上下文一次，
    不同点：call传递参数用逗号隔开，apply使用数组传递参数 
*/
VueRouter.prototype.push=function(location,resolve,reject){
    if (resolve&&reject) {
        originPush.call(this,location,resolve,reject) 
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if (resolve&&reject) {
        originPlace.call(this,location,resolve,reject) 
    }else{
        originPlace.call(this,location,()=>{},()=>{})
    }
}

// 配置路由
let router= new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        return {y:0} // 代表滚动条在最上方
    },
})
// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async(to,from,next) => {
    // to：可以获取到你要跳转到的路由信息，from：可以获取到你从哪个路由来的信息，next：放行函数
    // 1.next()放行 2.next('path')放行到指定路由 3.next('false')
    // 用户登录了才会有token
    let token=store.state.user.token
    // 使用name判断用户是否登录（在路由跳转的时候）
    let name=store.state.user.userInfo.name
    if(token){
        // 用户已经登录还想去login【不能去，停留在首页】---判断是否去login
        if(to.path=='/login'||to.path=='/register'){
            next('/')
        }else{
            // 登录后但去的不是login---判断用户名是否存在
            // 如果用户名已经存在
            if(name){
                next()
            }else{
                // 没有用户信息，派发action，让仓库存储用户信息在跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo')
                    next()     
                } catch (error) {
                    // token过期失效获取不到用户信息---清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 未登录：不能去交易相关，不能去支付相关【pay|paysuccess】，不能去个人中心
        let toPath=to.path
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            // 未登录去上面想这些路由----登录
            // 把未登录的想去而没有去成的信息存储在地址栏中【路由】
            next('/login?redirect='+toPath)
        }else{
            // 未登录去的不是上面这些路由【home|search|shopCart】----放行
            next()
        }
    }
    
})

export default router
