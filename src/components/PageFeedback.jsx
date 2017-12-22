import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, TextareaItem, NavBar, Icon, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { runPromise } from '../common/promise';

export default class PageFeedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opinionTxt: "",
            phone: ''
        }
        //发送意见反馈后的处理函数
        this.handleSubmit = (req) => {
            let res = req.result;
            console.log(res);
            if (res.code == 1000) {
                //发送意见反馈成功
                Toast.success('意见反馈成功', 2, () => {
                    hashHistory.goBack();
                });
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
    }

    testOpinion(val) {
        if (!val.trim()) {
            Toast.info("请输入反馈内容！", 1);
            return false;
        } else {
            return true;
        }
    }

    testPhone(val) {
        if (!(/^1(2|3|4|5|6|7|8|9)\d{9}$/.test(val))) {
            Toast.info("请输入正确手机号！", 1);
            return false;
        } else {
            return true;
        }
    }
    onClickSubmit = () => {
        let { opinionTxt, phone}= this.state;
        if (this.testOpinion(opinionTxt) && this.testPhone(phone)) {
            //发送ajax完成重置密码
            runPromise("appuserSuggestion", {
                "kangdid": phone,
                "suggestion": opinionTxt
            }, this.handleSubmit);

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
                            value={this.state.opinionTxt}
                            onChange={(val) => { this.setState({ opinionTxt: val }) }}
                        />
                    </WingBlank>
                    <div className="segmenting-line"></div>
                    <WingBlank className="page-login-WingBlank" size="lg" >
                        <p className="title">手机号</p>
                        <InputItem
                            className="phone"
                            type="number"
                            maxLength="20"
                            placeholder="选填，便于我们及时回复您"
                            value={this.state.phone}
                            onChange={(val) => { this.setState({ phone: val }) }}
                        />
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" style={{ "margin-top": "2rem" }} />
                        <Button onClick={this.onClickSubmit} className="page-login-bottom">提交</Button>
                    </WingBlank>
                </div>
            </QueueAnim>
        )
    }
}

PageFeedback.contextTypes = {
    router: React.PropTypes.object
};