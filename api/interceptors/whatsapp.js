const axios = require('axios')
const constants = require('../helpers/constants')

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  config => {
    const token = constants.whatsappToken // Replace 'YOUR_BEARER_TOKEN_HERE' with your actual token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

module.exports = axiosInstance
