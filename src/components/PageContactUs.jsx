import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

export default class PageContactUs extends React.Component {
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
                <div key="1" className="page-login page-contactUs">
                    <NavBar
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                    >联系我们</NavBar>
                </div>
            </QueueAnim>
        )
    }
}

PageContactUs.contextTypes = {
    router: React.PropTypes.object
};