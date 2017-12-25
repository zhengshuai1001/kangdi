import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, Flex, NavBar, Icon, Toast, Modal } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { runPromise } from '../common/promise';

export default class PageModifyControlCodeSecond extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldControlCode: '',
            newControlCode: '',
            confirmControlCode: ''
        }
        //发送完成修改控制码后的处理函数
        this.handleControlCode = (req) => {
            let res = req.result;
            console.log(res);
            if (res.code == 1000) {
                //修改控制码成功
                
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
    }
    testOldControlCode(val) {
        let value = val.replace(" ", "");
        if (!(/^.{1,20}$/.test(value))) {
            Toast.info("请输入正确密码", 1);
            return false;
        } else {
            return true;
        }
    }
    testNewControlCode(val) {
        let value = val.replace(" ", "");
        if (!(/^.{1,20}$/.test(value))) {
            Toast.info("请输入正确密码", 1);
            return false;
        } else {
            return true;
        }
    }
    testConfirmControlCode(val) {
        let value = val.replace(" ", "");
        //判断两次密码是否相等
        if (!(val === this.state.newPassword)) {
            Toast.info("两次输入密码不相同", 1);
            return false;
        } else {
            return true;
        }
    }
    handleConfirmChange = () => {
        let { oldControlCode, newControlCode, confirmControlCode } = this.state;
        if (this.testOldControlCode(oldControlCode) && this.testNewControlCode(newControlCode) && this.testConfirmControlCode(confirmControlCode)) {
            //首先获取到从上一个页面跳过来的state，也就说获取手机号，和短信验证码
            let MixinState = this.props.location.state;  //上一页的state
            Object.assign(MixinState, this.state);
            //发送ajax完成修改控制码
            runPromise("controlCodeChange", {
                "kangdid": MixinState.phone,
                "vericode": MixinState.SMSCode,
                "oldpsd": oldControlCode,
                "newpsd": newControlCode,
                "busitype": "2"
            }, this.handleControlCode, false, true);

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
                    >修改控制码</NavBar>
                    <WingBlank className="page-login-WingBlank" size="lg" style={{ "margin-top": "2rem" }}>
                        <InputItem
                            type="password"
                            placeholder="请输入原控制码"
                            maxLength="20"
                            value={this.state.oldControlCode}
                            onChange={(val) => { this.setState({ oldControlCode: val }) }}
                            onBlur={(val) => { this.testOldControlCode(val) }}
                        >
                            <img className="page-login-password-img" src={require('../images/page-modify-control-code.png')} />
                        </InputItem>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <InputItem
                            type="password"
                            placeholder="设置新控制码"
                            maxLength="20"
                            value={this.state.newControlCode}
                            onChange={(val) => { this.setState({ newControlCode: val }) }}
                            onBlur={(val) => { this.testNewControlCode(val) }}
                        >
                            <img className="page-login-password-img" src={require('../images/page-modify-control-code.png')} />
                        </InputItem>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <InputItem
                            type="password"
                            placeholder="确认新控制码"
                            maxLength="20"
                            value={this.state.confirmControlCode}
                            onChange={(val) => { this.setState({ confirmControlCode: val }) }}
                            onBlur={(val) => { this.testConfirmControlCode(val) }}
                        >
                            <img className="page-login-password-img" src={require('../images/page-modify-control-code.png')} />
                        </InputItem>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <Button type="" className="page-login-bottom" onClick={this.handleConfirmChange}>确认修改</Button>
                    </WingBlank>
                </div>
            </QueueAnim>
        )
    }
}

PageModifyControlCodeSecond.contextTypes = {
    router: React.PropTypes.object
};