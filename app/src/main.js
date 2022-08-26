import Vue from 'vue'
import App from './App.vue'
// 引入全局组件（在入口问价引入引入一次后，在任何组件当中都可以使用）
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 注册全局组件：第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

// 引入mockServe.js------mock数据
import '@/mock/mockServe.js'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'

// 引入swiper
import 'swiper/css/swiper.css'
// 测试
/* import {reqGetSearchInfo} from '@/api'
console.log(reqGetSearchInfo({})); */

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 配置全局事件总线
  
  beforeCreate() {
    Vue.prototype.$bus=this
  },
  // 注册路由，底下的写法KV一致，省略V【router小写】
  // 注册路由信息：当这里书写router的时候，组件身上都有$route，$router属性
  router,
  // 注册仓库：组件实例的身上会多一个属性$store属性
  store,
}).$mount('#app')
