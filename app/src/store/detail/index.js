import { reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api"
// 封装游客身份模块uuid--->生成一个随机的字符串（不能变了）
import {getUUID} from '@/utils/uuid_token'
const state={
    goodInfo:{},
    // 游客的临时身份
    uuid_token:getUUID()
}
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    }
}
const actions={
    // 获取产品信息的action
    async getGoodInfo({commit},skuId){
       let result=await reqGoodsInfo(skuId)
       if (result.code==200) {
        commit('GETGOODINFO',result.data)
       }
    },
    // 将产品添加到购物车中||修改某一个产品的个数
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回返回的解构
        // 加入购物车以后（发请求）前台将参数带给服务器
        // 服务器写入数据库成功，并没有返回其他的数据，只是返回了code=200，代表这一次的操作成功
        // code: 200, message: '成功', data: null, ok: true ，因此不需要三连环存储数据
        let result=await reqAddOrUpdateShopCart(skuId,skuNum)
        // 当前函数如果执行则返回Promise
        if(result.code==200){
            // 加购成功
            return 'ok'
        }else{
            // 加购失败
            return Promise.reject(new Error('fail'))
        }
    }
}
// 简化数组而生
const getters={
    // 路径导航简化的数据
    categoryView(state){
        // state.goodInfo初始状态是空对象，空对象的categoryView属性值是undefined（和Search组件一样）
        return state.goodInfo.categoryView||{}
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}