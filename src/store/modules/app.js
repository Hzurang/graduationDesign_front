import { login as loginApi } from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'
import { logout as logoutApi } from '@/api/logout'
import { reject } from 'eslint-plugin-promise/rules/lib/promise-statics'

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('ac_token') || '',
    sideBarType: true,
    lang: localStorage.getItem('lang') || 'zh'
  }),
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('ac_token', token)
    },
    changeSideBarType (state) {
      state.sideBarType = !state.sideBarType
    },
    changLang (state, lang) {
      state.lang = lang
    }
  },
  actions: {
    // token 来自登录页面 点击登录之后，所以不如直接放到actions中
    login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            commit('setToken', res.ac_token)
            setTokenTime()
            router.replace('/')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logoutApi()
          .then((res) => {
            commit('setToken', '')
            localStorage.clear()
            router.replace('/login')
            resolve()
          })
      })
        .catch((err) => {
          reject(err)
        })
    }
  }
}
