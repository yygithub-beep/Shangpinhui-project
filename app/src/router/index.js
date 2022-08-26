// 引入
import Vue from "vue";
import VueRouter from 'vue-router';
import routes from './routes'
// 使用插件
Vue.use(VueRouter);



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
export default new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        return {y:0} // 代表滚动条在最上方
    },
})