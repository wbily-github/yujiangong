import axios from 'axios'
import {
    Message
} from 'element-ui'
import router from '../router'

axios.interceptors.request.use(config => { 
   if(window.sessionStorage.getItem('tokenStr')){ 
       config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;
}, error => { 
    console.log(error);
})



//相应拦截器
axios.interceptors.response.use(success => {
    console.log('@@@@@@@@@@@@@1111111111111', success)
    //业务逻辑错误
    if (success.status && success.status === 200) {
        if (success.data.code === 500 || success.data.code === 401) {
            console.log('$$$$$$$$$$$$$$$$$$$', success, success.data)
            if (null != success.data.message ) {
                Message.error({
                    message: success.data.message
                })
            }
            return;
        }
        if (success.data.code === 200 && success.data.obj !== null) {
            console.log('#################', success, success.data)
            if (null != success.data.message) {
                Message.success({
                    message: success.data.message
                });
            }
        }else{
            console.log('#################', success, success.data)
            if (null != success.data.message) {
                Message.error({
                    message: success.data.message
                });
            }
        }
        return success.data
    }

}, error => {
    console.log('@@@@@@@@@@@@@', error);
    if (error.data.code === 500 || error.data.code === 404) {
        Message.error({
            message: "服务器开小差了/(ㄒoㄒ)/~~"
        });
    } else if (error.data.code === 401) {
        Message.error({
            message: "你还没登陆，快去登录"
        });
        router.replace('/')
    } else if (error.data.code === 200) {
        Message.error({
            message: error.data.message
        })
    }
    return;
});

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
       // url: 'http://101.42.232.134:8099' + url,
       url: 'http://localhost:8080' + url,
        data: params
    })
}
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
       // url: 'http://101.42.232.134:8099' + url,
       url: 'http://localhost:8080' + url,
        data: params
    })
}