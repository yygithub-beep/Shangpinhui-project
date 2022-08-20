// 
import { reqCategoryList } from "@/api"
// home模块的小仓库
const state={
    // state中数据的默认值不能乱写
    categoryList:[]
}
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    }
}
const actions={
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({commit}){
       let result=await reqCategoryList()
       if(result.code==200){
        commit('CATEGORYLIST',result.data)
       }
       
    }
}
const getters={}

export default{
    state,
    mutations,
    actions,
    getters
}