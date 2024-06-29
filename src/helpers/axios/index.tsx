import axios from 'axios'
import { BASE_URL } from 'src/configs/api'
import { getLocalUserData } from '../storege'
import { jwtDecode } from 'jwt-decode'

const instanceAxios = axios.create({ baseURL: BASE_URL })

instanceAxios.interceptors.request.use(config => {
  const { accessToken, refreshToken } = getLocalUserData()
  console.log('config', { config })
  if (accessToken) {
    const decodedAccessToken: any = jwtDecode(accessToken)
    if (decodedAccessToken.exp > Date.now() / 1000) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    } else {
      if (refreshToken) {
        const decodedRefreshToken: any = jwtDecode(refreshToken)
        if (decodedRefreshToken.exp > Date.now() / 1000) {
        } // call api
      } else {
      }
    }
  }
  return config
})

instanceAxios.interceptors.response.use(response => {
  console.log('response', { response })

  return response
})
export default instanceAxios
