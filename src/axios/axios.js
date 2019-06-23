
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
// import storg from '@/sw/storage.js'
//取消请求
let CancelToken = axios.CancelToken
//设置默认请求头，如果不需要可以取消这一步
axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json;charset=UTF-8',
}
// 请求超时的时间限制
axios.defaults.timeout = 20000
// 开始设置请求 发起的拦截处理
// config 代表发起请求的参数的实体
axios.interceptors.request.use(config => {
    // 得到参数中的 requestName 字段，用于决定下次发起请求，取消对应的 相同字段的请求
    // 因为这里 post 和 get 取值的方式不同，所以用了三目运算符
    let requestName = config.method === 'post' ? config.data.requestName : config.params.requestName
    // 判断，如果这里拿到的参数中的 requestName 在上一次请求中已经存在，就取消上一次的请求
    if (requestName) {
        if (axios[requestName] && axios[requestName].cancel) {
            axios[requestName].cancel()
        }
        config.cancelToken = new CancelToken(c => {
            axios[requestName] = {}
            axios[requestName].cancel = c
        })
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 请求到结果的拦截处理
axios.interceptors.response.use(config => {
    // 返回请求正确的结果
    return config
}, error => {
    // 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break
            case 401:
                error.message = '未授权，请重新登录'
                break
            case 403:
                error.message = '拒绝访问'
                break
            case 404:
                error.message = '请求错误,未找到该资源'
                break
            case 405:
                error.message = '请求方法未允许'
                break
            case 408:
                error.message = '请求超时'
                break
            case 500:
                error.message = '服务器端出错'
                break
            case 501:
                error.message = '网络未实现'
                break
            case 502:
                error.message = '网络错误'
                break
            case 503:
                error.message = '服务不可用'
                break
            case 504:
                error.message = '网络超时'
                break
            case 505:
                error.message = 'http版本不支持该请求'
                break
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        error.message = "连接到服务器失败"
    }
    return Promise.reject(error.message)
})
// 将axios 的 post 方法，绑定到 vue 实例上面的 $post
Vue.prototype.$post = function (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
        })
    })
}
// 将axios 的 post 方法，绑定到 vue 实例上面的 $post
Vue.prototype.$jsonPost = function (url, params) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            baseURL: '',
            method: 'post',
            data: JSON.stringify(params),
            headers:{
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json;charset=UTF-8',
            },
            // headers: headers,
            // timeout: API.intServiceReqTimeout,
            maxContentLength: 2000,
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
//multipart
Vue.prototype.$filePost = function (url, params) {
    return new Promise((resolve, reject) => {
        let param = new FormData();
        for (var j in params) {
            param.append(j, params[j]);
        }
        axios({
            url,
            baseURL: '',
            method: 'post',
            data: param,
            headers:{
                'Content-Type': 'multipart/form-data;',
            },
            // headers: headers,
            // timeout: API.intServiceReqTimeout,
            maxContentLength: 2000,
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
// 将axios 的 get 方法，绑定到 vue 实例上面的 $get
Vue.prototype.$get = function (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res) // 返回请求成功的数据 data
        }).catch(err => {
            reject(err)
        })
    })
}
// 请求示例requestName为多段请求的标注
/**
    this.$post(url, { name: '123', requestName: 'post_1' })
        .then(res => {
            console.log(`请求成功：${res}`)
        })
 */

export default axios
