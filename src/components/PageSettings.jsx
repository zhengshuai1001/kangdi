import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WingBlank, NavBar, Icon, List, Toast } from 'antd-mobile';

export default class PageSettings extends React.Component {
    constructor(props) {
        super(props);
    }
    onClickList(e) {
        let path = `/${e}`;
        hashHistory.push(path); 
    }
    componentDidMount() {
        Toast.hide()
    }
    render() {
        return (
            <div key="1" className="page-settings">
                <NavBar
                    style={{ "background-color": "#000" }}
                    mode="light"
                >设置</NavBar>
                <List className="my-list">
                    <List.Item extra={<Icon type="right" size="lg" style={{ "color": "#fff" }} />} onClick={() => { this.onClickList("personalCenter") }}>
                        <img src={require("../images/page-settings-person.png")} className="setting-icon" />
                        <span className="setting-text">个人中心</span>
                    </List.Item>
                    <List.Item extra={<Icon type="right" size="lg" style={{ "color": "#fff" }} />} onClick={() => { this.onClickList("modifyPassword") }}>
                        <img src={require("../images/page-settings-password.png")} className="setting-icon" />
                        <span className="setting-text">修改密码</span>
                    </List.Item>
                    <List.Item extra={<Icon type="right" size="lg" style={{ "color": "#fff" }} />} onClick={() => { this.onClickList("contactUs") }}>
                        <img src={require("../images/page-settings-phone.png")} className="setting-icon" />
                        <span className="setting-text">联系我们</span>
                    </List.Item>
                </List>
            </div>
        );
    }
}

PageSettings.contextTypes = {
    router: React.PropTypes.object
};