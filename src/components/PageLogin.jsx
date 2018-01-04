import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, Flex, Toast } from 'antd-mobile';
import { runPromise } from '../common/promise';

export default class PageLogin extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            nick_name: '',
            account: '',
            password: ''
        }
        //发送登录后的处理函数
        this.handleLogin = (req) =>{
            let res = req.result;
            // console.log(res);
            if (res.code == 1000) {
                //拿到token，保存到本地存储里
                if (res.data.token) {
                    //本地保存登录状态
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("kangdid", this.state.account);
                    //跳转到首页,MyCar
                    this.context.router.push({
                        pathname: '/MyCar'
                    });
                }
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
    }

    testAccount(val) {
        if (!(/^1(2|3|4|5|6|7|8|9)\d{9}$/.test(val))) {
            Toast.info("请输入正确手机号！", 1);
            return false;
        } else {
            return true;
        }
    }

    testPassword(val) {
        let value = val.replace(" ", "");
        if (!(/^.{1,20}$/.test(value))) {
            Toast.info("请输入正确密码", 1);
            return false;
        } else {
            return true;
        }
    }

    onClickLogin = () => {
        let account = this.state.account;
        let password = this.state.password;
        if (this.testAccount(account) && this.testPassword(password)) {
            //发送ajax登录
            runPromise("accountLogin", {
                "kangdid": this.state.account,
                "psd": this.state.password,
                "vincode": "",
                "logintype": 1
            }, this.handleLogin, false);
        }
    }
    render(){
        return (
            <div key="1" className="page-login">
                <div className="page-login-bg-div">
                    <img className="page-login-bg-img" src={require('../images/backgroundLogin.png')} />
                </div>
                <WingBlank className="page-login-WingBlank" size="lg">
                    <InputItem
                        type="string"
                        placeholder="请输入您的用户名"
                        maxLength="20"
                        value = {this.state.account}
                        onChange={(val) => { this.setState({ account: val }) }}
                        onBlur={(val) => { this.testAccount(val) }}
                    >
                        <img className="page-login-account-img" src={require('../images/page-login-account.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        type="password"
                        placeholder="请输入密码"
                        maxLength="20"
                        value={this.state.password}
                        onChange={(val) => { this.setState({ password: val }) }}
                        onBlur={(val) => { this.testPassword(val) }}
                    >
                        <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <Button type="" className="page-login-bottom" onClick={this.onClickLogin}>登入</Button>
                    <Flex style={{"margin-top":"1rem"}}>
                        <Flex.Item style={{"textAlign":"left", "paddingLeft":"1rem"}}><Link to="/register">新用户注册</Link></Flex.Item>
                        <Flex.Item style={{ "textAlign": "right", "paddingRight": "1rem" }}><Link to="/forgetPassword">忘记密码?</Link></Flex.Item>
                    </Flex>
                </WingBlank>
            </div>
        )
    }
}

PageLogin.contextTypes = {
    router: React.PropTypes.object
};