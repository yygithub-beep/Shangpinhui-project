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

// 获取产品详情信息的接口 /api/item/{ skuId } GET
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

// 删除购物车产品的接口 /api/cart/deleteCart/{skuId} DELETE 
export const reqDeleteCartById=(skuId)=>requests({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
})
// 修改商品的选中状态 /api/cart/checkCart/{skuId}/{isChecked} GET
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})
// 获取验证码 /api/user/passport/sendCode/{phone} GET 
export const reqGetCode=(phone)=>requests({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
})
// 注册 /api/user/passport/register POST 带参：code phone password
export const reqUserRegister=(data)=>requests({
    url:'/user/passport/register',
    data,
    method:'post',
})
// 登录 /api/user/passport/login POST 带参：phone password
export const reqUserLogin=(data)=>requests({
    url:'/user/passport/login',
    data,
    method:'post',
})
// 获取用户的信息【需要待着用户的token向服务器要用户信息】/api/user/passport/auth/getUserInfo 无参
export const reqUserInfo=(data)=>requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get',
})
// 退出登录 /api/user/passport/logout GET
export const reqLogout=()=>requests({
    url:'/user/passport/logout',
    method:'get', 
})
// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList GET
export const reqAddressInfo=()=>requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
})
// 获取商品清单 /api/order/auth/trade GET
export const reqOrderInfo=()=>requests({
    url:'/order/auth/trade',
    method:'get'
})
// 提交订单的接口 /api/order/auth/submitOrder?tradeNo={tradeNo} POST---不再使用vuex
export const reqSubmitOrder=(tradeNo,data)=>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method:'post'
})
// 获取支付信息 /api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo=(orderId)=>requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})
// 获取支付订单状态 /api/payment/weixin/queryPayStatus/{orderId} GET
export const reqPayStatus=(orderId)=>requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})
// 获取个人中心的数据---我的订单 /api/order/auth/{page}/{limit} GET
export const reqMyOrderList=(page,limit)=>requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})