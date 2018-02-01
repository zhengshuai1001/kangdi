import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon, WingBlank, List } from 'antd-mobile';
// import QueueAnim from 'rc-queue-anim';

export default class PageContactUs extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            // <QueueAnim
            //     type="right"
            //     duration="500"
            //     ease="easeOutBack"
            // >
                <div key="1" className="page-login page-contactUs">
                    <NavBar
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                    >联系我们</NavBar>
                    <WingBlank className="page-login-WingBlank" size="lg">
                        <List className="my-list">
                            <List.Item>
                                <span className="contact-us-left">公司名称</span>
                                <span className="contact-us-right">康迪电动汽车集团有限公司</span>
                            </List.Item>
                            <List.Item className="addr-wrap">
                                <span className="contact-us-left">地址</span>
                                <span className="contact-us-right">杭州市西湖区教工路1号西湖数源软件园11幢西</span>
                            </List.Item>
                            <List.Item>
                                <span className="contact-us-left">网址</span>
                                <span className="contact-us-right">www.kandigroup.com.cn</span>
                            </List.Item>
                            <List.Item>
                                <span className="contact-us-left">联系电话</span>
                                <span className="contact-us-right">86-571-89775550</span>
                            </List.Item>
                            <List.Item>
                                <span className="contact-us-left">传真</span>
                                <span className="contact-us-right">86-571-89774235</span>
                            </List.Item>
                            {/* <List.Item>
                                <span className="contact-us-left">Q Q </span>
                                <span className="contact-us-right">1234567</span>
                            </List.Item>
                            <List.Item>
                                <span className="contact-us-left">微信</span>
                                <span className="contact-us-right">KANGDI123</span>
                            </List.Item> */}
                        </List>
                    </WingBlank>
                </div>
            // </QueueAnim>
        )
    }
}

PageContactUs.contextTypes = {
    router: React.PropTypes.object
};