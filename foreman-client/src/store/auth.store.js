import * as jwt from 'jsonwebtoken'
import authApi from './api/auth.api'
import Cookies from 'js-cookie'
import utilTools from '../utils/utilTools'

function throwException (ex) {
  console.log('somthing wrong........')
  console.log(ex)
}

const authStore = {
  state: {},
  getters: {
    GET_USER: (state) => {
      if (!Cookies.get('accessToken')) {
        return undefined
      } else {
        const user = jwt.decode(Cookies.get('refreshToken'))
        return user
      }
    },
    GET_ACCESS_TOKEN: () => {
      const accessToken = Cookies.get('accessToken')
      if (accessToken) {
        const data = jwt.decode(accessToken)
        if (utilTools.isExpired(data.exp * 1000)) {
          return undefined
        }
      }
      return accessToken
    },
    GET_REFRESH_TOKEN: () => {
      const refreshToken = Cookies.get('refreshToken')
      if (refreshToken) {
        const data = jwt.decode(refreshToken)
        if (utilTools.isExpired(data.exp * 1000)) {
          return undefined
        }
      }
      return refreshToken
    }
  },
  mutations: {
    LOGIN: (state, tokens) => {
      const accessTokenDecode = jwt.decode(tokens.accessToken)
      Cookies.set('accessToken', tokens.accessToken, {
        expires: new Date(accessTokenDecode.exp * 1000)
      })
      const refreshTokenDecode = jwt.decode(tokens.refreshToken)
      Cookies.set('refreshToken', tokens.refreshToken, {
        expires: new Date(refreshTokenDecode.exp * 1000)
      })
    }

  },
  actions: {
    LOGIN: async ({
      commit
    }, authUser) => {
      console.log('login operation....')
      try {
        const {
          status,
          data
        } = await authApi.login(authUser)
        if (status === 201) {
          commit('LOGIN', data.token)
          return true
        } else {
          throwException(`status: ${status} \n data ${data}`)
          return false
        }
      } catch (ex) {
        throwException(ex)
        return false
      }
    },
    REGISTRATION: async ({
      commit
    }, userInfo) => {
      console.log('registration operation ....')
      try {
        const {
          status,
          data
        } = await authApi.register(userInfo)
        if (status === 201) {
          commit('LOGIN', data.token)
          return true
        } else {
          throwException(`status: ${status} \n data ${data}`)
          return false
        }
      } catch (ex) {
        throwException(ex)
        return false
      }
    },
    REFRESHTOKEN: async ({
      commit
    }, refreshToken) => {
      console.log('refresh token operation .......')
      try {
        const {
          status,
          data
        } = await authApi.refreshToken(refreshToken)

        if (status === 201) {
          commit('LOGIN', data.token)
        } else {
          throwException(`status: ${status} \n data ${data}`)
        }
      } catch (ex) {
        throwException(ex)
      }
    },
    LOGOUT: async ({
      commit
    }) => {
      console.log('logout operation ...........')
      try {
        authApi.logout(Cookies.get('refreshToken'))
        commit('LOGIN', {
          accessToken: undefined,
          refreshToken: undefined
        })
      } catch (ex) {
        throwException(ex)
      }
    }
  }
}

export default authStore
