import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, Flex, NavBar, Icon, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { runPromise } from '../common/promise';

export default class PageRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nick_name: '',
            phone: '',
            password: '',
            SMSCode: '',
            SMSCodeTxt:'获取验证码'
        }
        //发送短信验证码后的处理函数
        this.handleSendSMSCode = (req) =>{
            let res = req.result;
            if (res.code == 1000) {
                this.SMSCountdown();
                Toast.success('发送短信成功!', 1);
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
    }
    testPhone(val) {
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(val))) {
            Toast.info("请输入正确手机号！", 1);
            return false;
        } else {
            return true;
        }
    }
    testPassword(val) {
        let value = val.replace(" ","");
        if (!(/^.{1,20}$/.test(value))) {
            Toast.info("请输入正确密码", 1);
            return false;
        } else {
            return true;
        }
    }
    testSMSCode(val, noLimitSMSCode = false) {
        if (this.state.SMSTxt === "获取验证码" || noLimitSMSCode) {
            if (!(/^\d{6}$/.test(val))) {
                Toast.info("请输入6位数字短信验证码！", 2);
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    SMSCountdown() {
        let second = 60;
        let then = this;
        var value = second + "S后重试";
        then.setState({ SMSCodeTxt: value });
        function render() {
            var value = second + "S后重试";
            then.setState({ SMSCodeTxt: value });
            second--;
            if (second === 0) {
                window.clearInterval(token);
                then.setState({ SMSCodeTxt: "获取验证码" });
            }
        }
        let token = window.setInterval(render, 1000);
    }
    handleSMSCode() {
        let phoneValue = this.state.phone;
        if (this.testPhone(phoneValue) && this.state.SMSCodeTxt == "获取验证码") {
            //发送ajax获取短信验证码
            runPromise("smsNumsend", {
                "mobile": phoneValue,
                "busitype": 1
            }, this.handleSendSMSCode, false);
        }
    }
    handleRouterGoNext = () =>{
        let phone = this.state.phone;
        let password = this.state.password;
        let SMSCode = this.state.SMSCode;
        if (this.testPhone(phone) && this.testPassword(password) && this.testSMSCode(SMSCode, true)) {
            //跳转到下一页
            this.context.router.push({
                pathname: '/moreInfo',
                state: this.state
            });
        }
    }
    render(){
        return(
            <QueueAnim
                type="right"
                duration="500"
                ease="easeOutBack"
            >
            <div key="1" className="page-register page-login">
                <NavBar
                    style={{"background-color":"#000"}}
                    mode="light"
                    icon={<Icon type="left" size="lg" style={{"color":"#fff"}} />}
                    onLeftClick={() => hashHistory.goBack() }
                >注册</NavBar>
                <WingBlank className="page-login-WingBlank" size="lg" style={{"margin-top":"2rem"}}>
                    <InputItem
                        type="number"
                        placeholder="请输入手机号"
                        maxLength="11"
                        value= {this.state.phone}
                        onChange={(val) => { this.setState({ phone: val }) }}
                        onBlur={(val) => { this.testPhone(val) }}
                        clear
                    >
                        <img className="page-login-account-img" src={require('../images/page-login-phone.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        type="password"
                        placeholder="请输入密码"
                        maxLength="20"
                        value={this.state.password}
                        onChange={(val) => { val = val.trim(); this.setState({ password: val }) }}
                        onBlur={(val) => { this.testPassword(val) }}
                        clear
                    >
                        <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        className="SMSInput"
                        type="number"
                        value={this.state.SMSCode}
                        onChange={(val) => { this.setState({ SMSCode: val }) }}
                        placeholder="请输入验证码"
                        maxLength="6"
                        onBlur={(val) => { this.testSMSCode(val) }}
                        extra={<span>{this.state.SMSCodeTxt}</span>}
                        onExtraClick={() => { this.handleSMSCode() }}
                    >
                        <img className="page-login-code-img" src={require('../images/page-register-code.png')} />
                    </InputItem> 
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <Button type="" className="page-login-bottom">
                            {/* <Link style={{ "color": "#fff" }} className="toPageMoreInfo" to={{ pathname: "/moreInfo", state: this.state }}>下一步</Link> */}
                        <a 
                            style={{ "color": "#fff" }} 
                            className="toPageMoreInfo" 
                            onClick= {this.handleRouterGoNext}
                        >下一步</a>
                    </Button>
                </WingBlank>
            </div>
            </QueueAnim>
        )
    }
}

PageRegister.contextTypes = {
    router: React.PropTypes.object
};