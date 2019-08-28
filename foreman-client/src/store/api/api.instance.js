import Axios from 'axios'
import config from '../../config'

const apiInstance = Axios.create({
  baseURL: config.apiUrlPath,
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

export default apiInstance
