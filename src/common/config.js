import axios from 'axios';

export let ajax = axios.create({
    baseURL: 'http://kd.hetaoyun.com/api/',
    // baseURL: 'https://bird.ioliu.cn/v2?Content-Type=application/json&url=http://kd.hetaoyun.com/api/',
    // baseURL:'http://49.96.17.228:9001/api/',
    timeout: 2000,
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json'
});
