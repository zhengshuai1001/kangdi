import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, Flex, NavBar } from 'antd-mobile';

export default class PageMyCarLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carType: '',
            frameCode: '',
            controlCode: '',
            rememberControlCode: true
        }
    }
    handleRememberControlCode = () => {
        this.setState({
            rememberControlCode: !this.state.rememberControlCode
        });
        if (this.state.rememberControlCode) {
            this.refs.checkMarkImg.style.visibility = "hidden";
        } else {
            this.refs.checkMarkImg.style.visibility = "visible";
        }
    }
    render() {
        return (
            <div key="1" className="page-login">
                <NavBar
                    style={{ "background-color": "#000" }}
                    mode="light"
                >我的车辆</NavBar>
                <div className="page-login-bg-div" style={{"height":"15rem"}}>
                    <img style={{ "padding-top": "10%" }} className="page-login-bg-img" src={require('../images/backgroundLogin.png')} />
                </div>
                <WingBlank className="page-login-WingBlank" size="lg">
                    <InputItem
                        type="string"
                        placeholder="请选择车型"
                        maxLength="20"
                        onChange={(val) => { this.setState({ carType: val }) }}
                        extra={<div className="triangle-down-icon"></div>}
                    >
                        <img className="page-login-account-img" src={require('../images/page-myCar-arrow.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        type="string"
                        placeholder="请输入车架码"
                        maxLength="20"
                        onChange={(val) => { this.setState({ frameCode: val }) }}
                    >
                        <img className="page-login-password-img" src={require('../images/page-myCar-car.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        type="string"
                        placeholder="请输入车辆控制码"
                        maxLength="20"
                        onChange={(val) => { this.setState({ controlCode: val }) }}
                        extra={<img className="password-visible-icon" src={require('../images/password-visible-icon.png')} />}
                    >
                        <img style={{"width":"26px"}} className="page-login-password-img" src={require('../images/page-myCar-lock.png')} />
                    </InputItem>
                    <Flex style={{ "margin-top": "1rem" }}>
                        <Flex.Item onClick={this.handleRememberControlCode} style={{ "textAlign": "left", "paddingLeft": "1rem", "color": "#b3aeae", "font-size": "1.4rem" }}><span className="check-mark-span"><img ref="checkMarkImg" src={require('../images/check-mark-icon.png')}/></span>记住车辆控制码</Flex.Item>
                        <Flex.Item style={{ "textAlign": "right", "paddingRight": "1rem" }}><Link style={{"color":"#b3aeae"}} to="/forgetPassword">忘记控制码？</Link></Flex.Item>
                    </Flex>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <Button type="" className="page-login-bottom">下一步</Button>
                    <p className="what-is-control-code">什么是车辆控制码？</p>
                </WingBlank>
            </div>
        )
    }
}

PageMyCarLogin.contextTypes = {
    router: React.PropTypes.object
};