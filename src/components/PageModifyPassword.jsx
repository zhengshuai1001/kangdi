import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon, WingBlank, WhiteSpace, InputItem, Button, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { runPromise } from '../common/promise';

export default class PageModifyPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        }
        //发送完成修改密码后的处理函数
        this.handleChangePassword = (req) => {
            let res = req.result;
            console.log(res);
            if (res.code == 1000) {
                //修改密码成功
                Toast.success('修改密码成功', 2, () => {
                    hashHistory.goBack();
                });
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
    }
    testOldPassword(val) {
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
    testNewPassword(val) {
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
    testConfirmNewPassword(val) {
        let value = val.replace(" ", "");
        //判断两次密码是否相等
        if (!(val === this.state.newPassword)) {
            Toast.info("两次输入密码不相同", 1);
            return false;
        } else {
            return true;
        }
    }
    handleConfirmChange = () =>{
        let { oldPassword, newPassword, confirmNewPassword} = this.state;
        if (this.testOldPassword(oldPassword) && this.testNewPassword(newPassword) && this.testConfirmNewPassword(confirmNewPassword)) {
            //发送ajax完成修改密码
            runPromise("passwordChange", {
                "oldpsd": oldPassword,
                "newpsd": newPassword,
                "busitype": 1,
                "vericode": "",
                "vincode": ""
            }, this.handleChangePassword);

        }
    }
    onClickInputEye = (state, inputValueState) => {
        this.setState({ [state]: !this.state[state] })
        // this.refs[state].focus();
        let oldPassword = this.state[inputValueState];
        this.setState({ [inputValueState]: '' }, () => {
            this.refs[state].focus();
            this.setState({ [inputValueState]: oldPassword })
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
                <div key="1" className="page-login page-modifyPassword" onTouchStart={this.handleTouchPage}>
                    <NavBar
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                    >修改密码</NavBar>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <WingBlank className="page-login-WingBlank" size="lg">
                        <InputItem
                            // type="password"
                            ref="showControlCode0"
                            type={this.state.showControlCode0 ? "string" : "password"}
                            extra={<img onClick={() => { this.onClickInputEye("showControlCode0", "oldPassword")  }} className="password-visible-icon" src={require('../images/password-visible-icon.png')} />}
                            placeholder="请输入原密码"
                            maxLength="20"
                            value={this.state.oldPassword}
                            onChange={(val) => { val = val.trim(); this.setState({ oldPassword: val }) }}
                            onBlur={(val) => { this.testOldPassword(val), this.setState({ focusScroll: false }) }}
                            onFocus={() => { this.setState({ focusScroll: true }) }}
                        >
                            <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                        </InputItem>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <InputItem
                            // type="password"
                            ref="showControlCode1"
                            type={this.state.showControlCode1 ? "string" : "password"}
                            extra={<img onClick={() => { this.onClickInputEye("showControlCode1", "newPassword")  }} className="password-visible-icon" src={require('../images/password-visible-icon.png')} />}
                            placeholder="设置新密码"
                            maxLength="20"
                            value={this.state.newPassword}
                            onChange={(val) => { val = val.trim(); this.setState({ newPassword: val }) }}
                            onBlur={(val) => { this.testNewPassword(val), this.setState({ focusScroll: false }) }}
                            onFocus={() => { this.setState({ focusScroll: true }) }}
                        >
                            <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                        </InputItem>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <InputItem
                            // type="password"
                            ref="showControlCode2"
                            type={this.state.showControlCode2 ? "string" : "password"}
                            extra={<img onClick={() => { this.onClickInputEye("showControlCode2", "confirmNewPassword") }} className="password-visible-icon" src={require('../images/password-visible-icon.png')} />}
                            placeholder="确认新密码"
                            maxLength="20"
                            value={this.state.confirmNewPassword}
                            onChange={(val) => { val = val.trim(); this.setState({ confirmNewPassword: val }) }}
                            onBlur={(val) => { this.testConfirmNewPassword(val), this.setState({ focusScroll: false }) }}
                            onFocus={() => { this.setState({ focusScroll: true }) }}
                        >
                            <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                        </InputItem>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <Button onClick={this.handleConfirmChange} className="page-login-bottom">确认修改</Button>
                    </WingBlank>
                </div>
            </QueueAnim>
        )
    }
}

PageModifyPassword.contextTypes = {
    router: React.PropTypes.object
};