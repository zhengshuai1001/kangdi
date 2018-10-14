import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon, WingBlank, WhiteSpace, List, Button, Modal, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { runPromise } from '../common/promise';

import { cropperToUpload } from './uploadAvatar';
import { cropperToUpload2 } from './uploadAvatar2';

export default class PagePersonalCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp_nick_name: '',
            nick_name: '',
            real_name: '',
            certid: '',
            phone: localStorage.getItem("kangdid") || "",
            avatar: require("../images/avatar.png"),
            saveImgObject: false
        }
        //获取个人信息后的处理函数
        this.handleUserInfo = (req) => {
            let res = req.result;
            if (res.code == 1000) {
                this.setState({
                    nick_name: res.data.nick_name || "",
                    real_name: res.data.real_name || "",
                    certid: res.data.certid || "",
                    avatar: "http://47.96.17.228:9001" + res.data.header_img_url || require("../images/avatar.png")
                    // avatar: "http://kd.hetaoyun.com/" + res.data.header_img_url || require("../images/avatar.png")
                });               
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        //修改昵称后的处理函数
        this.handleChangeNickName = (req) => {
            let res = req.result;
            if (res.code == 1000) {
                this.setState({
                    nick_name: this.state.temp_nick_name || "",
                });
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        // this.handleScroll = this.handleScroll.bind(this)
    }
    shouldComponentUpdate() {
        return this.props.router.location.action === 'POP';
    }
    // handleScroll() {
    //     let navBar = document.getElementsByClassName("fixed-NavBar")[0];
    //     navBar.style.top = document.documentElement.scrollTop + "px";
    // }
    componentDidMount() {
        setTimeout(() => {
            // let inputDOM = ReactDOM.findDOMNode(this.refs.imgInput);
            // cropperToUpload.bind(this)(inputDOM, 250, 250); 
            //发送ajax获取个人信息
            runPromise("appuserRetrieve", {}, this.handleUserInfo);  
        }, 0);  
        // window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount_old_update_1014() {
        // window.removeEventListener('scroll', this.handleScroll);
    }
    onChangeFile_old_update_1014 = (e) => {
        // console.log(e.target.files[0]);
        //跳转到裁切图片页
        hashHistory.push({
            pathname: '/uploadAvatar2',
            state: {
                img: e.target.files[0]
            }
        });
    }
    //上传图片
    onChangeFile = (e) => {
        this.props.propsSetState("UploadAvatar", {
            img: e.target.files[0]
        });
        this.setState({
            saveImgObject: true
        },()=>{
            //跳转到裁切图片页
            hashHistory.push({
                pathname: '/uploadAvatar2',
                query: { form: 'PerfectInfo' },
            });
        })
    }
    componentWillUnmount() {
        if (!this.state.saveImgObject) {
            this.props.propsSetState("UploadAvatar", {
                img: null
            });
        }
    }
    changeNickName = () => {
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        let platform = isiOS ? "ios" : "android";
        Modal.prompt('修改昵称', '',[
            {   text: '返回',
                onPress: () => {
                    let propmtTouchBox = document.querySelector(".am-modal-wrap .am-modal");
                    propmtTouchBox.removeEventListener("touchstart", this.handleTouchPage, false);
                }
            },
            {
                text: '确认',
                onPress: (value) => {
                    this.setState({
                        temp_nick_name: value || "",
                    });
                    if (value.length) {
                        //发送ajax修改昵称
                        runPromise("appuserUpdate", { "nick_name": value }, this.handleChangeNickName);
                    } else {
                        Toast.info("昵称不能为空", 1);
                    }
                    let propmtTouchBox = document.querySelector(".am-modal-wrap .am-modal");
                    propmtTouchBox.removeEventListener("touchstart", this.handleTouchPage, false);
                }
            },
        ], 'default', null, ['输入昵称'], platform);
        // let inputOutDOM = document.querySelector(".am-modal-input");
        // if (inputOutDOM) {
        //     let inputDOM = inputOutDOM.getElementsByTagName("input")[0];
        //     inputDOM.maxLength= 20;
        //     inputDOM.value = window.innerHeight;
        // }
        // let oldInnerHeight = window.innerHeight;
        // let token = setTimeout(() => {
        //     let navBar = document.getElementsByClassName("fixed-NavBar")[0];
        //     // navBar.scrollTop = "60px";
        //     // navBar.style.top = document.documentElement.scrollTop + "px";
        //     navBar.style.top = oldInnerHeight - window.innerHeight + "px";
        //     // navBar.style.top = "0px";

        //     let inputDOM = inputOutDOM.getElementsByTagName("input")[0];
        //     inputDOM.value = window.innerHeight;
        //     // alert(document.documentElement.scrollTop)
        //     // navBar.className = navBar.className + " position-absolute";
        //     document.querySelector(".am-modal-content").scrollIntoView(false);
        //     clearTimeout(token);
        // }, 500);

        let token = setTimeout(() => {
            let propmtTouchBox = document.querySelector(".am-modal-wrap .am-modal");
            propmtTouchBox.addEventListener("touchstart", this.handleTouchPage, false);
            clearTimeout(token);
        }, 500);
    }
    //退出登录
    signOut = () => {
        // localStorage.removeItem("kangdid");
        localStorage.removeItem("token");
        localStorage.removeItem("vincode");
        // localStorage.removeItem("controlCode");
        localStorage.removeItem("car_no");
        localStorage.removeItem("firstEntryPageUseHelpDetail");
        localStorage.removeItem("car_model_selected");
        localStorage.removeItem("vincode_selected");
        localStorage.removeItem("old_car_tail");
        //跳转到登录页
        hashHistory.push({
            pathname: '/login',
            query: { form: 'signOut' }
        });
    }
    handleTouchPage = (e) => {
        for (let i = 0; i < document.getElementsByTagName("input").length; i++) {
            const element = document.getElementsByTagName("input")[i];
            element.blur();
        }
    }
    hideRealName = (name) => {
        // let hideStar = "";
        // for (let i = 0; i < name.length - 1; i++) {
        //     hideStar += "*";
        // }
        // return name.substring(0, 1) + hideStar;
        if (name.length > 0) {
            return "*" + name.substring(1, name.length);
        } else {
            return ""
        }
    }
    hideCertid = (str) => {
        return str.replace(/(\w)/g, function (a, b, c, d) { return (c > 9 && c < 18) ? '*' : a });
    }
    hidePhone = (str) => {
        return str.replace(/(\w)/g, function (a, b, c, d) { return (c > 2 && c < 7) ? '*' : a });
    }
    render() {
        return (
            // <QueueAnim
            //     type="right"
            //     duration="500"
            //     ease="easeOutBack"
            //     // onEnd={(e) => { this.refs.queueAnim.style.transform = "initial" }}
            //     onEnd={(e) => { document.getElementsByClassName("page-login")[0].style.transform = "initial" }}
            // >
            <div key="1" className="page-login page-personalCenter page-contactUs">
                    <NavBar
                        className="fixed-NavBar"
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                    >个人中心</NavBar>
                    <div className="div-fixed-NavBar">
                    <div className="backgroud-fixed-NavBar"></div>
                    <div className="avatar-box">
                        <div className="avatar-content">
                            <div className="img-box">
                                <img className="avatar-img" src={this.state.avatar}/>
                                <div className="img-corner-box">
                                    <input ref="imgInput" type="file" accept="image/*" onChange={this.onChangeFile}/>
                                    <img className="img-corner" src={require("../images/pen-icon.png")} />
                                </div>
                            </div>
                            <div className="nick-name-box">
                                <span>昵称：</span>
                                <span className="nick-name">{this.state.nick_name}</span>
                                <img onClick={this.changeNickName} className="pen-icon" src={require("../images/pen-icon.png")} />
                            </div>
                        </div>
                        <div className="avatar-blur-box">
                            <img src={this.state.avatar} className="blur"/>
                        </div>
                    </div>
                    <WingBlank className="page-login-WingBlank" size="lg">
                        <List className="my-list">
                            <List.Item>
                                <span className="contact-us-left">姓名</span>
                                <span className="contact-us-right">{this.hideRealName(this.state.real_name)}</span>
                            </List.Item>
                            <List.Item>
                                <span className="contact-us-left">证件号</span>
                                <span className="contact-us-right">{this.hideCertid(this.state.certid)}</span>
                            </List.Item>
                            <List.Item>
                                <span className="contact-us-left">联系方式</span>
                                <span className="contact-us-right">{this.hidePhone(this.state.phone)}</span>
                            </List.Item>
                        </List>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <Button onClick={ this.signOut }  className="page-login-bottom">退出当前账号</Button>
                    </WingBlank>
                    </div>
                </div>
            // </QueueAnim>
        )
    }
}

PagePersonalCenter.contextTypes = {
    router: React.PropTypes.object
};