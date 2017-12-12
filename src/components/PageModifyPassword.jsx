import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon, WingBlank, WhiteSpace, InputItem, Button } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

export default class PageModifyPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
        }
    }
    render() {
        return (
            <QueueAnim
                type="right"
                duration="500"
                ease="easeOutBack"
            >
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
                            onChange={(val) => { this.setState({ oldPassword: val }) }}
                        >
                            <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                        </InputItem>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <InputItem
                            type="password"
                            placeholder="设置新密码"
                            maxLength="20"
                            onChange={(val) => { this.setState({ newPassword: val }) }}
                        >
                            <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                        </InputItem>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <InputItem
                            type="password"
                            placeholder="确认新密码"
                            maxLength="20"
                            onChange={(val) => { this.setState({ newPassword: val }) }}
                        >
                            <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                        </InputItem>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <Button type="" className="page-login-bottom">确认修改</Button>
                    </WingBlank>
                </div>
            </QueueAnim>
        )
    }
}

PageModifyPassword.contextTypes = {
    router: React.PropTypes.object
};