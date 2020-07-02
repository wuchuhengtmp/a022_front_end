import axios from 'axios'
import router from "../router/index";
import { Toast } from 'mint-ui'
import { getToken , removeToken } from './auth'
import qs from 'qs'

const service = axios.create({
    baseURL: 'http://a022laravel.mxnt.net',
    timeout: 8000
})

service.interceptors.request.use(
    config => {
        config.headers = {
            'accept': "application/json"
        }
        if (getToken()) { 
            config.headers['Authorization'] = "Bearer " + getToken()
        }
        if (config.method === 'post') { 
            config.data = qs.stringify(config.data)
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':  "Bearer " + getToken()
            }
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => { 
        const res = response.data
        var self= this
        if (res.code !== 0) {
            Toast({
                message: res.msg || 'Error',
                position: 'middle',
                duration: 2000
            });
            if (res.code == 3) { 
                removeToken()
                router.push('/login')
            }
            if (res.code == 4) { 
                router.push('/user/realname')
            }
            return Promise.reject(new Error(res.msg || 'Error'))
        } else { 
            return res
        }
        
    },
    error => {
        console.log('err' + error) // for debug
        Toast({
            message: res.msg || 'Error',
            position: 'middle',
            duration: 2000
        });
        return Promise.reject(error)
      }
)

export default service