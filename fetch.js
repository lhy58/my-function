/**
 * Created by lihanying on 2018/7/31.
 */
import 'whatwg-fetch';
import {message} from 'antd'

//GET请求
export function fetchData(endpoint) {
    let myHeader = {
        headers: {
            "Authorisation": sessionStorage.getItem('s'),
            "Accept"       : 'application/json',
            'Content-Type' : 'application/json',
            'Club-Id': sessionStorage.getItem('club_id'),
        },
        method : 'GET',
    };
    return fetch(endpoint, myHeader)
        .then(res=> {
            if(res.status == 401){
                message.error('很抱歉,您没有权限');
            }else if(res.status == 403){
                message.error('本次登录已过期,请重新登录',2,()=>{window.location.href = "/"});
            }
            return res.json()
        })
        .catch((error)=> {
            console.log(error.message)
        })
}

//POST请求
export function postData(endpoint, method = 'post', body = {}) {
    let methods  = ['GET', 'POST', 'DELETE', 'PUT'];
    let myHeader = {
        headers: {
            "Authorisation": sessionStorage.getItem('s'),
            "Accept"       : 'application/json',
            'Content-Type' : 'application/json',
            'Club-Id': sessionStorage.getItem('club_id'),
        },
        method : methods[methods.indexOf(method.toUpperCase())],
        body   : body
    };
    return fetch(endpoint, myHeader)
        .then(res => {
            if(res.status == 401){
                message.error('很抱歉,您没有权限')
            }else if(res.status == 403){
                message.error('本次登录已过期,请重新登录',2,()=>{window.location.href = "/"});
            }
            return res.json()
        })
        .catch((error) => {
            console.log(error.message)
        })
}

//url参数拼接
export function obj_to_query(path = '/', obj) {
    let parts = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
    }
    return path + "?" + parts.join('&');
}