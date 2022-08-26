// API接口进行统一管理
import requests from "./request";
import mockRequest from './mockAjax'

// 首页三级分类接口： /api/product/getBaseCategoryList get 无参数
// 对外暴露一个函数，只要外部调用这个函数，就向服务器发起ajax请求，获取三级菜单数据，当前这个函数只需要把服务器返回的结果返回即可
export const reqCategoryList=()=>{
    // 发请求:axios发请求返回的结果是Promise对象
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

// 获取banner（Home首页轮播图接口---返回的是promise实例）
export const reqGetBannerList=()=>mockRequest.get('/banner')
// 获取floor数据
export const reqGetFloorList=()=>mockRequest.get('/floor')

// 获取搜索模块的数据接口 /api/list post 需要参数
// 当前的接口，给服务器传递的参数params，至少是一个空对象
export const reqGetSearchInfo=(params)=>requests({
    url:'/list',
    method:'post',
    data:params
})

// 获取产品详情信息的接口 /api/item/{ skuId }
export const reqGoodsInfo=(skuId)=>requests({
    url:`/item/${skuId}`,
    method:'get'
})

// 将产品添加到购物车中或者更新某一个产品在购物车中的个数 /api/cart/addToCart/{ skuId }/{ skuNum } POST
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({
    url:`/cart/addToCart/${ skuId }/${ skuNum }`,
    method:'post'
})

// 获取购物车列表的数据接口 /api/cart/cartList  GET 无参
export const reqCartList=()=>requests({
    url:'/cart/cartList',
    method:'get'
})
