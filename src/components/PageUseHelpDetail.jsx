import React from "react";
import { hashHistory, Link } from "react-router";
import { NavBar, Icon, Toast } from "antd-mobile";

import QueueAnim from 'rc-queue-anim';

// const PDFUrl = [
//     'widget://res/maintenance.pdf',
//     'widget://res/fault.pdf',
//     'widget://res/faultcode.pdf',
//     'widget://res/instructions.pdf',
//     'widget://res/faultcode.pdf'
// ];
// const PDF_title =[
//     '保养检查项目手册',
//     '常用故障灯的解析',
//     '常用故障码的解析',
//     '智慧出行APP系统说明书',
//     '常用故障码的解析'
// ];
// var pdfReader = api.require('pdfReader');

const PDFUrl2 = [
    'widget://res/car_control_code.pdf'
]

let u = navigator.userAgent;
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

export default class PageUseHelpDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            navBarTitle: "帮助详情",
            openPdfReader: false,
        }
        this.pdfReader = api.require('pdfReader');
    }
    componentDidMount() {
        Toast.hide();
        let name = this.props.location.state.name;
        // let doc_url = decodeURI(this.props.location.state.doc_url);

        let doc_url = "";
        let form = this.props.location.query.form;
        if (form == "pageMyCarLogin") {
            doc_url = PDFUrl2[0];
        } else {
            doc_url = decodeURI(this.props.location.state.doc_url);
        }
        
        // let url = PDFUrl[0];
        // if (name == "智慧出行APP系统说明书") {
        //     url = "https://www.huakewang.com/mhkw/%E4%B8%AD%E6%96%87doc.pdf";
        // }
        // if (name == "车辆故障指南") {
        //     url = "https://www.huakewang.com/mhkw/中文doc.pdf";
        // }
        // if (name == "车辆保养项目手册") {
        //     url = decodeURI("https://www.huakewang.com/mhkw/%E4%B8%AD%E6%96%87doc.pdf");
        // }
        this.setState({ navBarTitle: name});
        let then = this;
        this.pdfReader.openView({
            rect: {
                x: 0,
                y: 65,
                w: 'auto',
                h: 'auto'
            },
            path: doc_url,
            fixed: true
        }, function (ret) {
            if (isiOS) {
                if (ret.eventType == 'show') {
                    then.setState({ openPdfReader: true });
                    if (then.props.location.pathname != "/useHelpDetail") {
                        then.pdfReader.closeView()
                    }
                }
            }
        });         
    }
    componentWillUnmount() {
        // clearTimeout(this.state.token);
        if (isiOS) {
            if (this.state.openPdfReader) {
                this.pdfReader.closeView()
            }  
        } else {
            this.pdfReader.closeView()
        }
    }
    // shouldComponentUpdate() {
    //     return this.props.router.location.action === 'POP';
    // }
    closePage() {
        hashHistory.goBack();
        if (isiOS) {
            if (this.state.openPdfReader) {
                this.pdfReader.closeView()
            }
        } else {
            this.pdfReader.closeView()
        }
        // this.pdfReader.closeView();
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
                        onLeftClick={() => { this.closePage() }}
                        // onLeftClick={() => {  hashHistory.goBack()}}
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