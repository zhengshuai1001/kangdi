import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, TextareaItem, NavBar, Icon, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

export default class PageFeedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            OpinionTxt: ""
        }
    }
    render() {
        return (
            <QueueAnim
                type="right"
                duration="500"
                ease="easeOutBack"
            >
                <div key="1" className="page-login page-feedback">
                    <NavBar
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                    >意见反馈</NavBar>
                    <WingBlank className="page-login-WingBlank" size="lg" style={{ "margin-top": "2rem" }}>
                        <p className="title">问题和意见</p>
                        <TextareaItem
                            className="opinion"
                            rows={8}
                            count={200}
                            placeholder="请简述您遇到的问题，或留下您的宝贵意见"
                        />
                    </WingBlank>
                    <div className="segmenting-line"></div>
                    <WingBlank className="page-login-WingBlank" size="lg" >
                        <p className="title">手机号</p>
                        <InputItem
                            className="phone"
                            type="phone"
                            placeholder="选填，便于我们及时回复您"
                        />
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" style={{ "margin-top": "2rem" }} />
                        <Button type="" className="page-login-bottom">提交</Button>
                    </WingBlank>
                </div>
            </QueueAnim>
        )
    }
}

PageFeedback.contextTypes = {
    router: React.PropTypes.object
};