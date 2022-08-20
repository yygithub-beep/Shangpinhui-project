// 引入
import Vue from "vue";
import VueRouter from 'vue-router';

// 使用插件
Vue.use(VueRouter);

// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

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
    routes:[
        {
            path:'/home',
            component:Home,
            meta:{show:true}
        },
        {
            // :keyWord?中的 ? 表示params参数可传可不传
            path:'/search/:keyWord?',
            component:Search,
            meta:{show:true},
            name:'search'
        },
        {
            path:'/login',
            component:Login,
            meta:{show:false}

        },
        {
            path:'/register',
            component:Register,
            meta:{show:false}

        },
        // 重定向，在项目跑起来的时候，访问/，立马让它定向到首页
        {
            path:'*',
            redirect:'/home'
        }

    ]
})