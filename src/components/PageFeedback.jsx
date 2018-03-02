import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, TextareaItem, NavBar, Icon, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { runPromise } from '../common/promise';
import { setInterval } from 'core-js/library/web/timers';

// import iScroll from 'iscroll/build/iscroll';

export default class PageFeedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opinionTxt: "",
            phone: '',
            focusScrollInput: false, //判断页面下半部分的输入框是否focus，如果是，页面要大变。
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
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(val))) {
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
    // focusPhoneInput = () => {
    //     // let oldInnerHeight = window.innerHeight;
        
    //     let token = setTimeout(() => {
    //         // if (window.innerHeight < 480) {
    //         // }
    //         document.querySelector(".scrollIntoViewDOM").scrollIntoView(false);
    //         clearTimeout(token);
    //     }, 500);
    // }
    // componentDidMount() {
    //     let token = setTimeout(() => {
            
    //     }, 500);
    // }
    focusScrollInput = () => {
        this.setState({ focusScrollInput: true });
        // let myScroll = new iScroll('#wrapper');
        // this.setState({ myScroll });
        let token = setTimeout(() => {
            // this.state.myScroll.scrollToElement(document.querySelector(".scrollIntoViewDOM"));
            // this.state.myScroll.scrollTo(0, -250);

            document.body.style.overflow = "hidden";
            document.body.style.height = window.innerHeight + "px";

            document.documentElement.style.overflow = "hidden";
            document.documentElement.style.height = window.innerHeight + "px";

            document.getElementById("example").style.overflow = "hidden";
            document.getElementById("example").style.height = window.innerHeight + "px";

            document.querySelector(".scrollIntoViewDOM").scrollIntoView(false);

        }, 500);
    }
    setHeightAuto = () => {
        this.setState({ focusScrollInput: false });

        // this.state.myScroll.scrollTo(0, 0);

        // let myScroll = this.state.myScroll;
        // myScroll.destroy();
        // myScroll = null;

        document.body.style.overflow = "auto";
        document.body.style.height = "100%";

        document.documentElement.style.overflow = "auto";
        document.documentElement.style.height = "100%";

        document.getElementById("example").style.overflow = "auto";
        document.getElementById("example").style.height = "100%";
    }
    handleTouchPage = (e) => {
        if (this.state.focusScrollInput) {
            // this.refs["showControlCode"].blur();
            document.querySelector(".scrollIntoViewDOM input").blur();
        }
        if (this.state.focusScrollTextarea) {
            // this.refs["showControlCode"].blur();
            if ((e.target.tagName).toLowerCase() == "textarea") {
                let textareaHeight = document.querySelector(".opinion .am-textarea-control textarea").clientHeight
                if (textareaHeight >= 200) {
                    return;
                }
            }
            document.querySelector(".opinion textarea").blur();
        }
    }
    render() {
        return (
            <QueueAnim
                type="right"
                duration="500"
                ease="easeOutBack"
                onEnd={(e) => { document.getElementsByClassName("page-login")[0].style.transform = "initial" }}
            >
                <div key="1" className="page-login page-feedback" onTouchStart={this.handleTouchPage}>
                    <NavBar
                        className="fixed-NavBar"
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                    >意见反馈</NavBar>
                    <div className="backgroud-fixed-NavBar"></div>
                    {/* <div id="wrapper" className="main-scroll">
                        <div id="scroller"> */}
                            <WingBlank className="page-login-WingBlank" size="lg" style={{ "margin-top": "2rem" }}>
                                <p className="title">问题和意见</p>
                                <TextareaItem
                                    className="opinion"
                                    // rows={8}
                                    autoHeight
                                    count={200}
                                    placeholder="请简述您遇到的问题，或留下您的宝贵意见"
                                    value={this.state.opinionTxt}
                                    onChange={(val) => { this.setState({ opinionTxt: val }) }}
                                    onFocus={() => { this.setState({ focusScrollTextarea: true}) }}
                                    onBlur={() => { this.setState({ focusScrollTextarea: false }) }}
                                />
                            </WingBlank>
                            <div className="segmenting-line"></div>
                            <WingBlank className="page-login-WingBlank" size="lg" >
                                <p className="title">手机号</p>
                                <InputItem
                                    className="phone scrollIntoViewDOM"
                                    // type="number"
                                    type="tel"
                                    pattern="[0-9]*"
                                    maxLength="11"
                                    placeholder="选填，便于我们及时回复您"
                                    value={this.state.phone}
                                    onChange={(val) => { this.setState({ phone: val }) }}
                                    onFocus={this.focusScrollInput}
                                    onBlur={this.setHeightAuto}
                                />
                                <WhiteSpace className="page-login-WhiteSpace" size="xs" style={{ "margin-top": "2rem" }} />
                                <Button onClick={this.onClickSubmit} className="page-login-bottom">提交</Button>
                            </WingBlank>
                        {/* </div>
                    </div> */}
                </div>
            </QueueAnim>
        )
    }
}

PageFeedback.contextTypes = {
    router: React.PropTypes.object
};