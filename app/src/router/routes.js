// 路由配置信息
// 引入
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
export default [
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        // 是否显示footer
        meta:{show:true}
    },
    {
        path:'/home',
        component:Home,
        meta:{show:true}
    },
    {
        path:'/detail/:skuid?',
        component:Detail,
        meta:{show:true}
    },
    {
        // :keyword?中的 ? 表示params参数可传可不传
        path:'/search/:keyword?',
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