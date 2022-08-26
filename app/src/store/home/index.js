import { reqCategoryList, reqGetBannerList,reqGetFloorList } from "@/api"
// home模块的小仓库
const state={
    // state中数据的默认值不能乱写
    categoryList:[],
    // 轮播图的数据（参考服务器返回的数据类型）
    bannerList:[],
    // floor组件的数据
    floorList:[],
}
// mutations是唯一修改state的地方
const mutations={
    GETCATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    }
}
// 用户处理派发actions的地方，可以书写异步语句、执行逻辑的地方
const actions={
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({commit}){
        let result=await reqCategoryList()
        if(result.code==200){
            // 提交mutations
            commit('GETCATEGORYLIST',result.data)
        }
       
    },
    // 获取首页轮播图的数据
    async getBannerList({commit}){
        let result= await reqGetBannerList()
        if(result.code==200){
            commit('GETBANNERLIST',result.data)
        }
    },
    // 获取floor数据
    async getFloorList({commit}){
        let result= await reqGetFloorList()
        if(result.code==200){
            commit('GETFLOORLIST',result.data)
        }
    },
}

// 计算属性
const getters={}

export default{
    state,
    mutations,
    actions,
    getters
}