import {reqGetSearchInfo} from '@/api'
// search模块的小仓库
const state={
    // 仓库的初始状态（不能随便写数据类型）
    searchList:{}
}
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
const actions={
    // 获取search模块数据
    async getSearchList({commit},params={}){
        // reqGetSearchInfo调用时至少获取一个空对象
        // params形参，是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result =await reqGetSearchInfo(params)
        if(result.code==200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
// 计算属性，在项目中为简化仓库中的数据而生
// 可以把将来在组件中需要的数据简化一下【将来组件在获取数据的时候就方便了】
const getters={
    // 当前形参state是当前仓库的state，并非当前大仓库的state
    goodsList(state){
        // 如果服务器返回了数据，没问题返回的是一个数组，如果网络不给力|没有网，返回的是undefined（因为state中的数据是空对象）
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}