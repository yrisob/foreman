import CRUDCaller from './api'

const prefix = 'user'

class UserApi extends CRUDCaller(prefix) {
  getByEmail (email) {
    return this.getInstance().get(`${prefix}/?email=${email}`)
  }
}
const userApi = new UserApi()
export default userApi
