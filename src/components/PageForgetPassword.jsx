import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, Flex, NavBar, Icon, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

export default class PageForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nick_name: '',
            phone: '',
            password: '',
            SMSCode: ''
        }
    }
    testPhone(val) {
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(val))) {
            // Modal.alert("手机号输入错误！", '',[
            //     { text: '确定', onPress: () => {} }
            // ]); 
            Toast.info("手机号输入错误！", 1);
            return false;
        } else {
            return true;
        }
    }
    testSMSCode(val, noLimitSMSCode = false) {
        if (this.state.SMSTxt === "获取验证码" || noLimitSMSCode) {
            if (!(/^\d{4}$/.test(val))) {
                // Modal.alert("请输入6位数字短信验证码！", '',[
                //     { text: '确定', onPress: () => {} }
                // ]); 
                Toast.info("请输入4位数字短信验证码！", 2);
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    render() {
        return (
            <QueueAnim
                type="right"
                duration="500"
                ease="easeOutBack"
            >
            <div key="1" className="page-register page-login">
                <NavBar
                    style={{ "background-color": "#000" }}
                    mode="light"
                    icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                    onLeftClick={() => hashHistory.goBack()}
                >重置密码</NavBar>
                <WingBlank className="page-login-WingBlank" size="lg" style={{ "margin-top": "2rem" }}>
                    <InputItem
                        type="number"
                        placeholder="请输入手机号"
                        maxLength="20"
                        onChange={(val) => { this.setState({ phone: val }) }}
                        onBlur={(val) => { this.testPhone(val) }}
                        clear
                    >
                        <img className="page-login-account-img" src={require('../images/page-login-phone.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        className="SMSInput"
                        type="number"
                        onChange={(val) => { this.setState({ SMSCode: val }) }}
                        placeholder="请输入验证码"
                        maxLength="6"
                        onBlur={(val) => { this.testSMSCode(val) }}
                        extra={"获取验证码"}
                        onExtraClick={() => { this.testSMSCode() }}
                    >
                        <img className="page-login-code-img" src={require('../images/page-register-code.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        type="password"
                        placeholder="请输入新密码"
                        maxLength="20"
                        onChange={(val) => { this.setState({ password: val }) }}
                        clear
                    >
                        <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <Button type="" className="page-login-bottom">确认</Button>
                </WingBlank>
            </div>
            </QueueAnim>
        )
    }
}

PageForgetPassword.contextTypes = {
    router: React.PropTypes.object
};