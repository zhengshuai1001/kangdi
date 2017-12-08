import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

export default class PagePersonalCenter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <QueueAnim
                type="right"
                duration="500"
                ease="easeOutBack"
            >
                <div key="1" className="page-login page-personalCenter">
                    <NavBar
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                    >个人中心</NavBar>
                </div>
            </QueueAnim>
        )
    }
}

PagePersonalCenter.contextTypes = {
    router: React.PropTypes.object
};