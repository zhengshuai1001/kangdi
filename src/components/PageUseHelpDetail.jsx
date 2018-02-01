import React from "react";
import { hashHistory, Link } from "react-router";
import { NavBar, Icon, Toast } from "antd-mobile";

// import QueueAnim from 'rc-queue-anim';

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

export default class PageUseHelpDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            navBarTitle: "帮助详情"
        }
        this.pdfReader = api.require('pdfReader');
    }
    componentDidMount() {
        let name = this.props.location.query.name;
        let doc_url = decodeURI(this.props.location.query.doc_url);
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
            Toast.fail(JSON.stringify(ret), 2);
        });         
    }
    componentWillUnmount() {
        // clearTimeout(this.state.token);
        this.pdfReader.closeView()
    }
    // shouldComponentUpdate() {
    //     return this.props.router.location.action === 'POP';
    // }
    closePage() {
        hashHistory.goBack();
        this.pdfReader.closeView();
    }
    render() {
        return (
            // <QueueAnim
            //     type="right"
            //     duration="500"
            // >
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
            // </QueueAnim>
        )
    }
}

PageUseHelpDetail.contextTypes = {
    router: React.PropTypes.object
};