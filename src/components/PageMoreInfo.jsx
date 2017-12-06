import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, Flex, NavBar, Icon, Toast, Modal } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

export default class PageMoreInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nick_name: '',
            full_name: '',
            ID_number: '',
            successPopUp: false
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
                        onChange={(val) => { this.setState({ nick_name: val }) }}
                        clear
                    >
                        <img className="page-login-account-img" src={require('../images/page-moreInfo-nickName.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        type="string"
                        onChange={(val) => { this.setState({ full_name: val }) }}
                        placeholder="请输入姓名"
                        maxLength="20"
                        clear
                    >
                        <img className="page-login-code-img" src={require('../images/page-moreInfo-fullName.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        type="number"
                        placeholder="请输入您的身份证号码"
                        maxLength="20"
                        onChange={(val) => { this.setState({ ID_number: val }) }}
                        clear
                    >
                        <img className="page-login-password-img" src={require('../images/page-moreInfo-IDNumber.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <Button type="" className="page-login-bottom" onClick={this.onShowPopUp('successPopUp')}>完成注册</Button>
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