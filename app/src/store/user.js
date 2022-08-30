import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
// 登录与注册模块---我设置的账户密码是q1314 111
const state={
    code:'',
    token:getToken(),
    userInfo:{},
}
const mutations={
    GETCODE(state,code){
      state.code=code
    },
    USERLOGIN(state,token){
      state.token=token
    },
    GETUSERINFO(state,userInfo){
      state.userInfo=userInfo
    },
    // 清除本地数据
    CLEAR(state){
      // 把仓库中相关用户信息清空
      state.token=''
      state.userInfo={}
      // 把本地存储数据清空
      removeToken()
    }
    
}
const actions={
    // 获取验证码
    async getCode({commit},phone){
        // 获取验证码的这个借口，把验证码返回，但是征程情况，后台把验证码发送到用户手机上
       let result =await reqGetCode(phone)
       if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
       }else{
            return Promise.reject(new Error('fail'))
       }
    },
    // 用户注册
    async userRegister({commit},user){
      let result =await reqUserRegister(user)
      if(result.code==200){
        return 'ok'
      }else{
        return Promise.reject(new Error('fail'))
      }
    },

    // 登录业务【token】
    async userLogin({commit},data){
      let result=await reqUserLogin(data)
      // 服务器下发的tokrn，是用户的唯一标识（类似于uuid）
      // 将来经常通过token找服务器要用户信息进行展示
      if(result.code==200){
        // 用户已经登录成功且获取到了token
        commit('USERLOGIN',result.data.token)
        // 持久化存储token
        setToken(result.data.token)
        return 'ok'
      }else{
        return Promise.reject(new Error('fail'))
      }
    },
    // 获取用户信息
     async getUserInfo({commit}){
      let result= await reqUserInfo()
      if(result.code==200){
        commit('GETUSERINFO',result.data)
        return 'ok'
      }else{
        return Promise.reject(new Error('fail'))
      }
    },
    //退出登录
    async userLogout({commit}){
      // 只是向服务器发起一次请求，通知服务器清除token
      let result =await reqLogout()
      // action中不能操作state，提交commit修改state
      // 需要判断成功与失败，因为页面需要进行跳转
      if(result.code==200){
        commit('CLEAR')
        return 'ok'
      }else{
        return Promise.reject(new Error('fail'))
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