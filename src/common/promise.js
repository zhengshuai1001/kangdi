import axios from 'axios';

let Ajax = axios.create({
    baseURL: 'http://kd.hetaoyun.com/api/',
    // baseURL: 'https://bird.ioliu.cn/v2?Content-Type=application/json&url=http://kd.hetaoyun.com/api/',
    // baseURL:'http://49.96.17.228:9001/api/',
    timeout: 2000,
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json'
});

const ajaxURLList = {
    smsNumsend: "sms/numsend", //获取短信
    accountLogin: "account/login", //登录
    accountRegister: "account/register", //注册
    passwordChange: "password/change", //修改密码
    passwordForget: "password/forget", //忘记密码
    appuserRetrieve: "appuser/retrieve", //查询个人信息
    appuserUpdate: "appuser/update", //修改用户信息
    appuserSuggestion: "appuser/suggestion" //意见反馈   
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
 */
function runPromise(ajaxName, param, handle ) {

    let serializeParam = { "timestamp": Date.parse(new Date()) / 1000, "token": "", "kangdid": ""};
    Object.assign(serializeParam, param);

    run(function* () {
        // let contents = yield ajaxName(param);
        let contents = yield sendAjax(ajaxURLList[ajaxName], serializeParam);
        handle(contents.data);
    })
}

//发送ajax请求通用
function sendAjax(url, param) {
    return new Promise(function (resolve, reject) {
        Ajax.post(url, param).then(req => {
            resolve(req);
        }).catch(error => {
            //全局处理网络请求错误
            console.log(error);
            reject(error);
        });
    });
}

export { runPromise };