import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon, WingBlank, WhiteSpace, InputItem, Button, Toast } from 'antd-mobile';
// import QueueAnim from 'rc-queue-anim';
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
        if (!(/^.{1,20}$/.test(value))) {
            Toast.info("请输入正确密码", 1);
            return false;
        } else {
            return true;
        }
    }
    testNewPassword(val) {
        let value = val.replace(" ", "");
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
    render() {
        return (
            // <QueueAnim
            //     type="right"
            //     duration="500"
            //     ease="easeOutBack"
            // >
                <div key="1" className="page-login page-modifyPassword">
                    <NavBar
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                    >修改密码</NavBar>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <WingBlank className="page-login-WingBlank" size="lg">
                        <InputItem
                            type="password"
                            placeholder="请输入原密码"
                            maxLength="20"
                            value={this.state.oldPassword}
                            onChange={(val) => { this.setState({ oldPassword: val }) }}
                            onBlur={(val) => { this.testOldPassword(val) }}
                        >
                            <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                        </InputItem>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <InputItem
                            type="password"
                            placeholder="设置新密码"
                            maxLength="20"
                            value={this.state.newPassword}
                            onChange={(val) => { this.setState({ newPassword: val }) }}
                            onBlur={(val) => { this.testNewPassword(val) }}
                        >
                            <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                        </InputItem>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <InputItem
                            type="password"
                            placeholder="确认新密码"
                            maxLength="20"
                            value={this.state.confirmNewPassword}
                            onChange={(val) => { this.setState({ confirmNewPassword: val }) }}
                            onBlur={(val) => { this.testConfirmNewPassword(val) }}
                        >
                            <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                        </InputItem>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <Button onClick={this.handleConfirmChange} className="page-login-bottom">确认修改</Button>
                    </WingBlank>
                </div>
            // </QueueAnim>
        )
    }
}

PageModifyPassword.contextTypes = {
    router: React.PropTypes.object
};