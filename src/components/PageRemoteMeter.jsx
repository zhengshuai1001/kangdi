import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon, Flex } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

import MeterG2 from "./MeterG2";

export default class PageRemoteMeter extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        setTimeout(() => {
            MeterG2(67, 0.1);
        }, 0);
    }
    render(){
        return (
            <QueueAnim
                type="right"
                duration="500"
                ease="easeOutBack"
            >
                <div key="1" className="page-login  page-remote-instrument">
                    <NavBar
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                    >远程仪表</NavBar>
                    <div id="backgroud">
                        <div id="mountNode"></div>
                        <div id="mountNode2"></div>
                        <img id="dashboardCenter" src={require('../images/dashboard-Center.png')} />
                    </div>
                    <div id="mountNode3" className="am-flexbox am-flexbox-align-center am-flexbox-justify-center">
                        <div className="am-flexbox-item">
                            <p className="bar-title">3.5v</p>
                            <div className="bar">
                                <span className="bar-left bar-head"></span>
                                <span className="bar-unfill">
                                    <span className="bar-fill-width">
                                        <span className="bar-fill"></span>
                                    </span>
                                </span>
                                <span className="bar-right bar-head"></span>
                            </div>
                            <p className="bar-bottom">
                                <span className="bar-bottom-left">0v</span>
                                <p className="bar-bottom-text">最低单体电压</p>
                                <p className="bar-bottom-right">5v</p>
                            </p>
                        </div>
                        <div className="am-flexbox-item">
                            <p className="bar-title">250v</p>
                            <div className="bar">
                                <span className="bar-left bar-head"></span>
                                <span className="bar-unfill">
                                    <span className="bar-fill-width">
                                        <span className="bar-fill"></span>
                                    </span>
                                </span>
                                <span className="bar-right bar-head"></span>
                            </div>
                            <p className="bar-bottom">
                                <span className="bar-bottom-left">0v</span>
                                <p className="bar-bottom-text">总压</p>
                                <p className="bar-bottom-right">500v</p>
                            </p>
                        </div>
                    </div>
                    <p className="mileage bar-center-text">当前电量40%，大约可行驶70KM！</p>
                    <p className="voltage bar-center-text">总电压80，最低单体电压4.5V</p>
                    <div className="shortcut-WingBlank" size="lg" style={{ "padding": "3rem 2rem 0 2rem" }}>
                        <Flex justify="center" className="shortcut-flex">
                            <Flex.Item>
                                <div className="shortcut-box"><img src={require('../images/shortcut-btn-trunk.png')} /></div>
                                <span className="shortcut-text">后备箱</span>
                            </Flex.Item>
                            <Flex.Item>
                                <div className="shortcut-box"><img src={require('../images/shortcut-btn-lock.png')} /></div>
                                <span className="shortcut-text">车锁</span>
                            </Flex.Item>
                            <Flex.Item>
                                <div className="shortcut-box"><img src={require('../images/shortcut-btn-lamp.png')} /></div>
                                <span className="shortcut-text">车灯</span>
                            </Flex.Item>
                            <Flex.Item>
                                <div className="shortcut-box"><img src={require('../images/shortcut-btn-door.png')} /></div>
                                <span className="shortcut-text">车门</span>
                            </Flex.Item>
                            <Flex.Item>
                                <div className="shortcut-box"><img src={require('../images/shortcut-btn-switch.png')} /></div>
                                <span className="shortcut-text">空调</span>
                            </Flex.Item>
                            <Flex.Item>
                                <div className="shortcut-box"><img src={require('../images/shortcut-btn-engine.png')} /></div>
                                <span className="shortcut-text">电机加锁</span>
                            </Flex.Item>
                        </Flex>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}

PageRemoteMeter.contextTypes = {
    router: React.PropTypes.object
};