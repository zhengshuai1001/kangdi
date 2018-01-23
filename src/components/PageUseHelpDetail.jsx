import React from "react";
import { hashHistory, Link } from "react-router";
import { NavBar, Icon } from "antd-mobile";

import QueueAnim from 'rc-queue-anim';

export default class PageUseHelpDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state= {

        }
    }
    render() {
        return (
            <QueueAnim
                type="right"
                duration="500"
            >
                <div key="1" className="page-login  page-use-help-detail">
                    <NavBar
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                    >帮助详情</NavBar>
                </div>
            </QueueAnim>
        )
    }
}

PageUseHelpDetail.contextTypes = {
    router: React.PropTypes.object
};