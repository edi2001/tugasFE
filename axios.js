import axios from 'axios'
import config from './src/config/config'

const instance = axios.create({})

instance.defaults.baseURL = config.apiURL

export default instance