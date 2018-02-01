import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon, WingBlank, WhiteSpace, List, Button, Modal } from 'antd-mobile';
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
            avatar: require("../images/avatar.png")
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
    }
    shouldComponentUpdate() {
        return this.props.router.location.action === 'POP';
    }
    componentDidMount() {
        setTimeout(() => {
            // let inputDOM = ReactDOM.findDOMNode(this.refs.imgInput);
            // cropperToUpload.bind(this)(inputDOM, 250, 250); 
            //发送ajax获取个人信息
            runPromise("appuserRetrieve", {}, this.handleUserInfo);  
        }, 0);     
    }
    onChangeFile = (e) => {
        // console.log(e.target.files[0]);
        //跳转到裁切图片页
        this.context.router.push({
            pathname: '/uploadAvatar2',
            state: {
                img: e.target.files[0]
            }
        });
    }
    changeNickName = () => {
        Modal.prompt('修改昵称', '',[
            { text: '返回' },
            {
                text: '确认',
                onPress: (value) => {
                    this.setState({
                        temp_nick_name: value || "",
                    });
                    //发送ajax修改昵称
                    runPromise("appuserUpdate", { "nick_name": value}, this.handleChangeNickName);
                }
            },
        ], 'default', null, ['输入昵称']);
    }
    //退出登录
    signOut = () => {
        // localStorage.removeItem("kangdid");
        localStorage.removeItem("token");
        localStorage.removeItem("vincode");
        // localStorage.removeItem("controlCode");
        localStorage.removeItem("car_no");
        //跳转到登录页
        hashHistory.push({
            pathname: '/login',
            query: { form: 'signOut' }
        });
    }
    render() {
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
                                <span className="contact-us-right">{this.state.real_name}</span>
                            </List.Item>
                            <List.Item>
                                <span className="contact-us-left">证件号</span>
                                <span className="contact-us-right">{this.state.certid}</span>
                            </List.Item>
                            <List.Item>
                                <span className="contact-us-left">联系方式</span>
                                <span className="contact-us-right">{this.state.phone}</span>
                            </List.Item>
                        </List>
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                        <Button onClick={ this.signOut }  className="page-login-bottom">退出当前账号</Button>
                    </WingBlank>
                </div>
            </QueueAnim>
        )
    }
}

PagePersonalCenter.contextTypes = {
    router: React.PropTypes.object
};