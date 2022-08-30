import { reqCartList, reqDeleteCartById,reqUpdateCheckedById} from "@/api"
const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车；列表数据
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 修改购物车某一个产品的选中状态---{commit}从context中解构出来的
  async updateCheckedById({commit},{skuId,isChecked}){
    let result=await reqUpdateCheckedById(skuId,isChecked)
    if(result.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 删除全部勾选产品----{dispatch,getters}从context中解构出来的
  deleteAllCheckedCart({dispatch,getters}){
    // context：小仓库 commit【提交mutations修改state】 getters【计算属性】dispatch【派发action】 state【当前仓库数据】
    // 获取购物车中全部的信息（数组）
    let promiseAll=[]
    getters.cartList.cartInfoList.forEach(item => {
      // 将每一次返回的promise添加到数组当中
      let promise=item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
      promiseAll.push(promise);
    });
    // 只有所有返回的p1,p2...都成功，返回结果即为成功，
    return Promise.all(promiseAll)
  },
  // 修改全部产品的状态
  updateAllCartIsChecked({dispatch,state},isChecked){
    let promiseAll=[]
    state.cartList[0].cartInfoList.forEach(item=>{
      let promise=dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
      promiseAll.push(promise)
    })
    // 最终返回的结果
    return Promise.all(promiseAll)
  }
}

const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },

}

export default {
  state,
  mutations,
  actions,
  getters
}