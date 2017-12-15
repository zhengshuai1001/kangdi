import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

import MeterG2 from "./MeterG2";

export default class PageRemoteMeter extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        setTimeout(() => {
            MeterG2(60, 0.8);
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
                </div>
            </QueueAnim>
        )
    }
}

PageRemoteMeter.contextTypes = {
    router: React.PropTypes.object
};