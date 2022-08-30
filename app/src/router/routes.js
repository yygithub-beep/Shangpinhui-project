// 路由配置信息
// 引入
// import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级组件
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
/* 
    当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
    如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
*/
export default [
    {
        path:'/center',
        component:Center,
        meta:{show:true},
        // 二级路由组件
        children:[
            {
                path:'myorder',
                component:myOrder
            },
            {
                path:'grouporder',
                component:groupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]


    },
    {
        path:'/pay',
        component:Pay,
        meta:{show:true},
        //路由独享守卫
        beforeEnter: (to, from,next) => {
            // 去交易页面trade必须从/shopcart进入，其余的页面则停留在当前
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        },
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true}
    },
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
    // 以Home组件为例，实现路由懒加载
    {
        path:'/home',
        component:()=>import('@/pages/Home'),
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
    {
        path:'/trade',
        component:Trade,
        meta:{show:true},
        //路由独享守卫
        beforeEnter: (to, from,next) => {
            // 去交易页面trade必须从/shopcart进入，其余的页面则停留在当前
            if(from.path=='/shopcart'){
                next()
            }else{
                next(false)
            }
        },
    },
    // 重定向，在项目跑起来的时候，访问/，立马让它定向到首页
    {
        path:'/',
        redirect:'/home'
    }
]