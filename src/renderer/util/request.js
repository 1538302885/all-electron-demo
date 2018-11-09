import Vue from 'vue';
import axios from 'axios';
import { Promise } from 'es6-promise';
import env from '@/config/env';
import string from '@/util/string';
import common from "@/util/common";
const service = axios.create({
    timeout: 10000,
    withCredentials: true
});
// 扩展交互请求
// option.url:请求的地址
// option.params:上送的参数
// option.success:成功回调
// option.error:失败回调
Vue.prototype.$ajax = (settings) => {
    return new Promise((resolve, reject) => {
        let options = Object.assign({
            method: 'get',
            responseType: 'json'
        }, settings);
        service(options).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        });
    });
};
export default {};
