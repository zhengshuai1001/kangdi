import React from "react";
import { hashHistory, Link } from "react-router";
import { NavBar, Icon, Toast } from "antd-mobile";

import QueueAnim from 'rc-queue-anim';
const PDFUrl = [
    'widget://res/maintenance.pdf',
    'widget://res/fault.pdf',
    'widget://res/faultcode.pdf',
    'widget://res/instructions.pdf',
    'widget://res/faultcode.pdf'
];
const PDF_title =[
    '保养检查项目手册',
    '常用故障灯的解析',
    '常用故障码的解析',
    '智慧出行APP系统说明书',
    '常用故障码的解析'
];
// var pdfReader = api.require('pdfReader');
export default class PageUseHelpDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            navBarTitle: "帮助详情"
        }
        this.pdfReader = api.require('pdfReader');
    }
    componentDidMount() {
        let index = this.props.location.state.index;
        this.setState({ navBarTitle: PDF_title[index]})
        // let token = setTimeout(() => {
            this.pdfReader.openView({
                rect: {
                    x: 0,
                    y: 45,
                    w: 'auto',
                    h: 'auto'
                },
                path: PDFUrl[index],
                fixed: true
            }, function (ret) {
                Toast.fail(JSON.stringify(ret), 2);
                // alert(JSON.stringify(ret));
            });
        // }, 500);    
        // this.setState({ token: token});    
    }
    componentWillUnmount() {
        // clearTimeout(this.state.token);
        this.pdfReader.closeView()
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
                        onLeftClick={() => { this.pdfReader.closeView(), hashHistory.goBack()}}
                    >{this.state.navBarTitle}</NavBar>
                    {/* <iframe src="" frameborder="0"></iframe> */}
                </div>
            </QueueAnim>
        )
    }
}

PageUseHelpDetail.contextTypes = {
    router: React.PropTypes.object
};