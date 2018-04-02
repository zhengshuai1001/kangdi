import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, Flex, NavBar, Icon, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { runPromise } from '../common/promise';

export default class PageForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nick_name: '',
            phone: '',
            password: '',
            SMSCode: '',
            SMSCodeTxt: '获取验证码',
            passwordLength: 20,
            NavBarTitle: "重置密码",
            NewPasswordPlaceholder: "请输入新密码"
        }
        //发送短信验证码后的处理函数
        this.handleSendSMSCode = (req) => {
            let res = req.result;
            if (res.code == 1000) {
                this.SMSCountdown();
                Toast.success('发送短信成功!', 1);
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        //发送完成重置密码后的处理函数
        this.handleForgetPassword = (req) => {
            let res = req.result;
            console.log(res);
            if (res.code == 1000) {
                //忘记密码重置成功
                //修改密码成功
                Toast.success('重置密码成功', 2, () => {
                    hashHistory.goBack();
                });
                
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
        let value = val.replace(" ", "");
        if (value.length < 6) {
            Toast.info("登陆密码不得少于6位", 1);
            return false;
        }
        if (!(/^.{1,20}$/.test(value))) {
            Toast.info("请输入正确密码", 1);
            return false;
        } else {
            return true;
        }
    }
    testSMSCode(val, noLimitSMSCode = false) {
        if (this.state.SMSCodeTxt === "获取验证码" || noLimitSMSCode) {
            if (!(/^\d{6}$/.test(val))) {
                Toast.info("请输入6位数字短信验证码", 1);
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
            if (this.props.location.query.form == "myCarLogin") {
                runPromise("smsNumsend", {
                    "mobile": phoneValue,
                    "busitype": 4
                }, this.handleSendSMSCode, false);
            }else{
                runPromise("smsNumsend", {
                    "mobile": phoneValue,
                    "busitype": 2
                }, this.handleSendSMSCode, false);
            }
        }
    }
    onClickForgetPassword = () =>{
        let phone = this.state.phone;
        let password = this.state.password;
        let SMSCode = this.state.SMSCode;
        if (this.testPhone(phone) && this.testPassword(password) && this.testSMSCode(SMSCode, true)) {
            if (this.props.location.query.form == "myCarLogin") {
                //发送ajax完成重置密码
                runPromise("passwordForget", {
                    "kangdid": phone,
                    "newpsd": password,
                    "busitype": 2,
                    "vericode": SMSCode,
                    "vincode": localStorage.getItem("vincode")
                }, this.handleForgetPassword, true);
                return;
            }
            //发送ajax完成重置密码
            runPromise("passwordForget", {
                "kangdid": phone,
                "newpsd": password,
                "busitype": 1,
                "vericode": SMSCode,
                "vincode": ""
            }, this.handleForgetPassword, false);

        }
    }
    componentDidMount(){
        Toast.hide();
        if (this.props.location.query.form == "myCarLogin") {
            this.setState({
                passwordLength: 6,
                NavBarTitle: "重置控制码",
                NewPasswordPlaceholder: "请输入新控制码"
            })
        }
    }
    onClickInputEye = (state) => {
        this.setState({ [state]: !this.state[state] })
        // this.refs[state].focus();
        let oldPassword = this.state.password;
        this.setState({ password: '' }, () => {
            this.refs[state].focus();
            this.setState({ password: oldPassword })
        });
        Toast.hide();
    }
    handleTouchPage = (e) => {
        if (this.state.focusScroll) {
            for (let i = 0; i < document.getElementsByTagName("input").length; i++) {
                const element = document.getElementsByTagName("input")[i];
                element.blur();
            }
        }
    }
    render() {
        return (
            <QueueAnim
                type="right"
                duration="500"
                ease="easeOutBack"
            >
            <div key="1" className="page-register page-login" onTouchStart={this.handleTouchPage}>
                <NavBar
                    style={{ "background-color": "#000" }}
                    mode="light"
                    icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                    onLeftClick={() => hashHistory.goBack()}
                >{this.state.NavBarTitle}</NavBar>
                <WingBlank className="page-login-WingBlank" size="lg" style={{ "margin-top": "2rem" }}>
                    <InputItem
                        // type="number"
                        type="tel"
                        pattern="[0-9]*"
                        placeholder="请输入手机号"
                        maxLength="11"
                        value={this.state.phone}
                        onChange={(val) => { val = val.trim(); this.setState({ phone: val }) }}
                        onBlur={(val) => { this.testPhone(val), this.setState({ focusScroll: false }) }}
                        onFocus={() => { this.setState({ focusScroll: true }) }}
                        clear
                    >
                        <img className="page-login-account-img" src={require('../images/page-login-phone.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        className="SMSInput"
                        // type="number"
                        type="tel"
                        pattern="[0-9]*"
                        value={this.state.SMSCode}
                        onChange={(val) => { val = val.trim(); this.setState({ SMSCode: val }) }}
                        placeholder="请输入验证码"
                        maxLength="6"
                        onBlur={(val) => { this.testSMSCode(val), this.setState({ focusScroll: false }) }}
                        onFocus={() => { this.setState({ focusScroll: true }) }}
                        // extra={<span>{this.state.SMSCodeTxt}</span>}
                        // onExtraClick={() => { this.handleSMSCode() }}
                        extra={<span onClick={() => { this.handleSMSCode() }} >{this.state.SMSCodeTxt}</span>}
                    >
                        <img className="page-login-code-img" src={require('../images/page-register-code.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        // type="password"
                        ref="showControlCode"
                        type={this.state.showControlCode ? "string" : "password"}
                        extra={<img onClick={() => { this.onClickInputEye("showControlCode") }} className="password-visible-icon" src={require('../images/password-visible-icon.png')} />}
                        placeholder={this.state.NewPasswordPlaceholder}
                        maxLength={this.state.passwordLength}
                        value={this.state.password}
                        onChange={(val) => { val = val.trim(); this.setState({ password: val }) }}
                        onBlur={(val) => { this.testPassword(val), this.setState({ focusScroll: false }) }}
                        onFocus={() => { this.setState({ focusScroll: true }) }}
                        // clear
                    >
                        <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <Button onClick={this.onClickForgetPassword} className="page-login-bottom">确认</Button>
                </WingBlank>
            </div>
            </QueueAnim>
        )
    }
}

PageForgetPassword.contextTypes = {
    router: React.PropTypes.object
};