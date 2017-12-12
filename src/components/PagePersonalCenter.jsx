import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon, WingBlank, WhiteSpace, List, Button } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

export default class PagePersonalCenter extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate() {
        return (this.props.router.location.action === 'PUSH');
    }
    render() {
        console.log("render");
        return (
            <QueueAnim
                type="right"
                duration="500"
                ease="easeOutBack"
            >
                <div key="1" className="page-login page-personalCenter page-contactUs">
                    <NavBar
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                    >个人中心</NavBar>
                    <div className="avatar-box">
                        <div className="avatar-content">
                            <div className="img-box">
                                <img className="avatar-img" src={require("../images/avatar.png")}/>
                            </div>
                            <div className="nick-name-box">
                                <span>昵称：</span>
                                <span className="nick-name">想飞飞飞</span>
                                <img className="pen-icon" src={require("../images/pen-icon.png")} />
                            </div>
                        </div>
                        <div className="avatar-blur-box">
                            <img src={require("../images/avatar.png")} className="blur"/>
                        </div>
                    </div>
                    <WingBlank className="page-login-WingBlank" size="lg">
                        <List className="my-list">
                            <List.Item>
                                <span className="contact-us-left">姓名</span>
                                <span className="contact-us-right">王小妮</span>
                            </List.Item>
                            <List.Item>
                                <span className="contact-us-left">证件号</span>
                                <span className="contact-us-right">3402*************375</span>
                            </List.Item>
                            <List.Item>
                                <span className="contact-us-left">联系方式</span>
                                <span className="contact-us-right">18297532703</span>
                            </List.Item>
                        </List>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <Button type="" className="page-login-bottom">退出当前账号</Button>
                    </WingBlank>
                </div>
            </QueueAnim>
        )
    }
}

PagePersonalCenter.contextTypes = {
    router: React.PropTypes.object
};