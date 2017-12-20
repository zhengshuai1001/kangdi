import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, Flex, Toast } from 'antd-mobile';
import qs from 'qs';

export default class PageLogin extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            nick_name: '',
            account: '17683993335',
            password: '123456'
        }
        this.loginAjax = function (){
            // var post_data = {
            //     params: {
            //         "timestamp": 0,
            //         "token": "",
            //         "mobile": "17683993335",
            //         "busitype": 1
            //     }
            // };
            CONFIG.ajax.post('account/login',JSON.stringify({
                    "timestamp": Date.parse(new Date())/1000,
                    "token": "",
                    "kangdid": this.state.account,
                    "psd": this.state.password,
                    "vincode": "",
                    "logintype": 1
                })
                // data: JSON.stringify(post_data)
            ).then(req => {
                console.log(req.data);
                let res = req.result;
                if (res.code == 1000) {
                    console.log("success");
                } else {
                    Toast.fail(ERRMSG[res.code], 3);
                }
            }).catch(error => {
                console.log(error);
            });	
        }
    }

    render(){
        this.loginAjax()
        // console.log(CONFIG.ajax)
        return (
            <div key="1" className="page-login">
                <div className="page-login-bg-div">
                    <img className="page-login-bg-img" src={require('../images/backgroundLogin.png')} />
                </div>
                <WingBlank className="page-login-WingBlank" size="lg">
                    <InputItem
                        type="string"
                        placeholder="请输入您的用户名"
                        maxLength="20"
                        onChange={(val) => { this.setState({ account: val }) }}
                    >
                        <img className="page-login-account-img" src={require('../images/page-login-account.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        type="password"
                        placeholder="请输入密码"
                        maxLength="20"
                        onChange={(val) => { this.setState({ password: val }) }}
                    >
                        <img className="page-login-password-img" src={require('../images/page-login-password.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <Button type="" className="page-login-bottom">登入</Button>
                    <Flex style={{"margin-top":"1rem"}}>
                        <Flex.Item style={{"textAlign":"left", "paddingLeft":"1rem"}}><Link to="/register">新用户注册</Link></Flex.Item>
                        <Flex.Item style={{ "textAlign": "right", "paddingRight": "1rem" }}><Link to="/forgetPassword">忘记密码?</Link></Flex.Item>
                    </Flex>
                </WingBlank>
            </div>
        )
    }
}

PageLogin.contextTypes = {
    router: React.PropTypes.object
};