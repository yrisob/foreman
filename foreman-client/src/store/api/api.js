import apiInstance from './api.instance'

export default function CRUDCaller (prefix) {
  return class {
    getInstance () {
      return apiInstance
    }
    getList () {
      return this.getInstance().get(prefix)
    }

    getById (id) {
      return this.getInstance().get(`${prefix}/${id}`)
    }
    save (data) {
      return this.getInstance().post(prefix, data)
    }

    update (id, data) {
      return this.getInstance().patch(`${prefix}/${id}`, data)
    }

    delete (id) {
      return this.getInstance().delete(`${prefix}/${id}`)
    }
  }
}
