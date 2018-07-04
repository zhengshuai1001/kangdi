import { hashHistory } from 'react-router';
import { Toast } from 'antd-mobile';

import axios from 'axios';
let CancelToken = axios.CancelToken;
let AjaxCancel;
let Ajax = axios.create({
    // baseURL: 'http://kd.hetaoyun.com/api/',
    // baseURL: 'https://bird.ioliu.cn/v2?Content-Type=application/json&url=http://kd.hetaoyun.com/api/',
    baseURL:'http://47.96.17.228:9001/api/',
    timeout: 2000,
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json'
});

// 添加响应拦截器
Ajax.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let { data } = response;
    if (data && data.result && data.result.code != 1000 && data.result.errmsg_text ) {
        //此时存在errmsg_text，自定义错误信息，此时应该重定向errmsg，同时将errmsg_text绑定到window上，让错误表调用
        window.AjaxResponseErrmsgText = data.result.errmsg_text;
        response.data.result.errmsg = "302"; //重定向errmsg
    }
    console.log(response);
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

const ajaxURLList = {
    smsNumsend: "sms/numsend", //获取短信
    accountLogin: "account/login", //登录
    accountRegister: "account/register", //注册
    passwordChange: "password/change", //修改密码
    passwordForget: "password/forget", //忘记密码
    appuserRetrieve: "appuser/retrieve", //查询个人信息
    appuserUpdate: "appuser/update", //修改用户信息
    appuserSuggestion: "appuser/suggestion", //意见反馈   
    controlCodeChange: "password/change", //修改控制码（车主密码）   
    appuserChangeimg: "appuser/changeimg", //上传图片修改头像   
    carOwner: "car/owner", //车辆查询 
    queryCarStatus: "control/queryCarStatus", //车辆运行数据查询
    controlCar: "control/car", //车身控制
    controlAc: "control/ac", //空调控制
    appHelp: "app/help", //使用帮助
    controlWakeup: "control/wakeup", //唤醒车辆
}

//定义一个基于Promise的异步任务执行器
function run(taskDef) {
    //创建迭代器
    let task = taskDef();

    //开始执行任务
    let result = task.next();

    //递归函数遍历
    (function step() {

        //如果有更多任务要做
        if (!result.done) {
            //用一个Promise来解决会简化问题
            let  promise = Promise.resolve(result.value);
            promise.then(function (value) {
                result = task.next(value);
                step();
            }).catch(function (error) {
                result = task.throw(error);
                step();
            });
        }
    }())
}

/**
 * 执行异步任务执行器的函数
 * 
 * @author ZhengGuoQing
 * @param {any} ajaxName 具体执行ajax的请求名称
 * @param {any} param ajax请求的参数对象，必须是对象，属性名和ajax参数的属性名相同
 * @param {any} handle ajax执行完成后的处理函数
 * @param {any} mustLogin 是否必须登录后才能发送请求，判断登录是查询本地存储的token
 * @param {any} mustCarLogin 是否必须车主登录后才能发送请求，判断车主登录是查询本地存储的vincode
 * @param {any} handleParam ajax执行完成后的处理函数的参数
 */
function runPromise(ajaxName, param, handle, mustLogin = true, mustCarLogin = false, handleParam ) {
    let token = localStorage.getItem("token");
    let kangdid = localStorage.getItem("kangdid");
    if (mustLogin && (!token || !kangdid)) {
        //如果没登录，跳转到登录页
        hashHistory.push({
            pathname: '/login',
            query: { form: 'promise' }
        });
        return;  
    }
    let vincode = localStorage.getItem("vincode");
    if (mustCarLogin && !vincode) {
        //车辆没有没登录，跳转到我的车辆页，输入车辆验证码
        hashHistory.push({
            pathname: '/MyCarLogin',
            query: { form: 'promise' }
        });
        return;
    }
    let serializeParam = { "timestamp": Date.parse(new Date()) / 1000, "token": token, "kangdid": kangdid, "vincode": vincode};
    Object.assign(serializeParam, param);

    run(function* () {
        // let contents = yield ajaxName(param);
        let contents = yield sendAjax(ajaxURLList[ajaxName], serializeParam);
        handle(contents.data, handleParam);
    })
}

//发送ajax请求通用
function sendAjax(url, param) {
    return new Promise(function (resolve, reject) {
        // Ajax.post(url, param).then(req => {
        Ajax.post(url, param,{
            // url: url,
            // data: param,
            cancelToken: new CancelToken(function executor(c) {
                // executor 函数接收一个 cancel 函数作为参数
                AjaxCancel = c;
            })
        }).then(req => {
            if (ServerJudgeLogon(req)) {
                resolve(req);
            }
            // resolve(req);
        }).catch(error => {
            //全局处理网络请求错误
            // console.log(error.message);
            if (error.message) {
                Toast.offline("网络错误",2);
            }
            reject(error);
        });
    });
}


/**
 * 服务器判断是否登录
 * 
 * @author ZhengGuoQing
 * @param {any} req 
 */
function ServerJudgeLogon(req){
    let res = req.data.result;
    // console.log(res, res.code, res.errmsg)
    if (res && res.code != 1000 && res.errmsg == 124) {
        //车辆没有没登录，跳转到我的车辆页，输入车辆验证码
        localStorage.removeItem("vincode");
        hashHistory.push({
            pathname: '/MyCarLogin',
            query: { form: 'promise' }
        });
        return false;
    } else if (res && res.code != 1000 && res.errmsg == 902) {
        localStorage.removeItem("token");
        localStorage.removeItem("vincode");
        // localStorage.removeItem("controlCode");
        localStorage.removeItem("car_no");
        localStorage.removeItem("firstEntryPageUseHelpDetail");
        localStorage.removeItem("car_model_selected");
        localStorage.removeItem("vincode_selected");
        //跳转到登录页
        hashHistory.push({
            pathname: '/login',
            query: { form: 'promise' }
        });
        return false;
    } else {
        return true;
    }
}

export { runPromise, AjaxCancel };