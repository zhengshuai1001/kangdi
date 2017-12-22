import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, Flex, NavBar, Icon, Toast, Modal } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { runPromise } from '../common/promise';

export default class PageMoreInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nick_name: '',
            full_name: '',
            ID_number: '',
            successPopUp: false
        }
        //发送完成注册后的处理函数
        this.handleRegister = (req) => {
            let res = req.result;
            console.log(res);
            if (res.code == 1000) {
                //注册成功，弹出弹框
                this.onShowPopUp("successPopUp");
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
    }
    onShowPopUp = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClosePopUp = key => () => {
        this.setState({
            [key]: false,
        });
    }

    testNickName(val) {
        let value = val.replace(" ", "");
        if (!(/^.{1,20}$/.test(value))) {
            Toast.info("请输入正确昵称", 1);
            return false;
        } else {
            return true;
        }
    }

    testFullName(val) {
        let value = val.replace(" ", "");
        if (!(/^[\u4e00-\u9fa5]{2,6}$/.test(value))) {
            Toast.info("请输入真实姓名", 1);
            return false;
        } else {
            return true;
        }
    }

    testIDNumber(val) {
        let value = val.replace(" ", "");
        if (!(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value))) {
            Toast.info("请输入正确身份证号", 1);
            return false;
        } else {
            return true;
        }
    }
    handleComplete = () =>{
        let nick_name = this.state.nick_name;
        let full_name = this.state.full_name;
        let ID_number = this.state.ID_number;
        if (this.testNickName(nick_name) && this.testFullName(full_name) && this.testIDNumber(ID_number)) {
            //首先获取到从上一个页面跳过来的state，也就说获取手机号，密码和短信验证码
            let MixinState = this.props.location.state;  //上一页的state
            Object.assign(MixinState, this.state);
            //发送ajax完成注册
            runPromise("accountRegister", {
                "kangdid": MixinState.phone,
                "vericode": MixinState.SMSCode,
                "psd": MixinState.password,
                "nick_name": MixinState.nick_name,
                "real_name": MixinState.full_name,
                "certid": MixinState.ID_number
            }, this.handleRegister, false);
            
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
                >完善资料</NavBar>
                <WingBlank className="page-login-WingBlank" size="lg" style={{ "margin-top": "2rem" }}>
                    <InputItem
                        type="string"
                        placeholder="请输入昵称"
                        maxLength="20"
                        value={this.state.nick_name}
                        onChange={(val) => { this.setState({ nick_name: val }) }}
                        onBlur={(val) => { this.testNickName(val) }}
                        clear
                    >
                        <img className="page-login-account-img" src={require('../images/page-moreInfo-nickName.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        type="string"
                        value={this.state.full_name}
                        onChange={(val) => { this.setState({ full_name: val }) }}
                        onBlur={(val) => { this.testFullName(val) }}
                        placeholder="请输入姓名"
                        maxLength="20"
                        clear
                    >
                        <img className="page-login-code-img" src={require('../images/page-moreInfo-fullName.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        type="string"
                        placeholder="请输入您的身份证号码"
                        maxLength="20"
                        value={this.state.ID_number}
                        onChange={(val) => { this.setState({ ID_number: val }) }}
                        onBlur={(val) => { this.testIDNumber(val) }}
                        clear
                    >
                        <img className="page-login-password-img" src={require('../images/page-moreInfo-IDNumber.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <Button type="" className="page-login-bottom" onClick={this.handleComplete}>完成注册</Button>
                </WingBlank>
                <Modal
                    className="successModalPopUp"
                    visible={this.state.successPopUp}
                    maskClosable= {false}
                    transparent
                >
                    <img className="page-moreInfo-successPopUp-img" src={require('../images/successPopUp.png')} />
                    <span>注册成功!</span>
                </Modal>
            </div>
            </QueueAnim>
        )
    }
}

PageMoreInfo.contextTypes = {
    router: React.PropTypes.object
};