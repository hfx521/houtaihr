// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

// const getDefaultState = () => {
//   return {
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }

// const state = getDefaultState()

// const mutations = {
//   RESET_STATE: (state) => {
//     Object.assign(state, getDefaultState())
//   },
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           return reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       removeToken() // must remove  token  first
//       commit('RESET_STATE')
//       resolve()
//     })
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }
import { getToken,setToken,removeToken } from "@/utils/auth"
import {login,getUserInfo} from '@/api/user'
const state = {
  token:getToken(),//从缓存中读取初始值
  userInfo:{}  //用户基本资料
}


const mutations = {
  setToken(state,token){
    state.token = token
    //同步到缓存
    setToken(token)
  },
  removeToken(state) {
    //删除vuetoken
    state.token = null
    removeToken()
  },
  setUserInfo(state,userInfo) {
    state.userInfo = userInfo
    // console.log(userInfo)
  }
}

  const actions = {
    //context上下文 传入参数
    async login(context,data) {
      console.log(data)
      //todo:调用登录接口
      const token = await login(data)
      //返回一个token 123456
      context.commit('setToken',token)
    },
    //调用action
    async getUserInfo(context) {
      const result = await getUserInfo()
      context.commit('setUserInfo', result)
      return result
    }
  }


export default {
  namespaced:true,//开启命名空间
  actions,
  state,
  mutations
 
}