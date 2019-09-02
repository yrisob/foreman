import apiInstance from './api.instance'
const prefix = 'auth'

class AuthApi {
  login (authUser) {
    return apiInstance.post(`${prefix}/login`, authUser)
  }

  register (userInfo) {
    return apiInstance.post(`${prefix}/register`, userInfo)
  }

  refreshToken (refreshToken) {
    return apiInstance.post(`${prefix}/refreshtoken`, refreshToken)
  }
}
const authApi = new AuthApi()
export default authApi
