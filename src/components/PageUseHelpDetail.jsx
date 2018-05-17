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
        this.clickKeyback(); //注册监听事件， 点击返回键
        let name = this.props.location.state.name;
        this.setState({ navBarTitle: name });

        // let doc_url = decodeURI(this.props.location.state.doc_url);
        
        let doc_url = "";
        let form = this.props.location.query.form;
        if (form == "pageMyCarLogin") {
            doc_url = PDFUrl2[0];
        } else {
            doc_url = decodeURI(this.props.location.state.doc_url);
        }
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

        if (form == "pageMyCarLogin") {
            doc_url = PDFUrl2[0];
            Toast.hide();
            this.openPdfReader(false);
        } else {
            let entryIndex = this.props.location.state.index; //判断进入的是第几个
            //判断当前PDF是不是第一次打开。
            let FirstEntryPDF = localStorage.getItem("firstEntryPageUseHelpDetail");
            let entryIndexStatus = false;  //是否打开过
            if (FirstEntryPDF) {
                entryIndexStatus = (JSON.parse(FirstEntryPDF))[entryIndex];
            } else {
                return;
            }
            doc_url = decodeURI(this.props.location.state.doc_url);
            if (isiOS && !entryIndexStatus) {
                this.pdfReader.hideView(); //隐藏文档视图
                Toast.loading('加载中...', 2, () => {
                    this.openPdfReader(true);

                    let newFirstEntryPDF = JSON.parse(FirstEntryPDF);
                    newFirstEntryPDF[entryIndex] = true;
                    localStorage.setItem("firstEntryPageUseHelpDetail", JSON.stringify(newFirstEntryPDF));
                });
            } else {
                this.openPdfReader(false);
            }
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

        // let then = this;
        // this.pdfReader.openView({
        //     rect: {
        //         x: 0,
        //         y: 65,
        //         w: 'auto',
        //         h: 'auto'
        //     },
        //     path: doc_url,
        //     fixed: true
        // }, function (ret) {
        //     if (isiOS) {
        //         if (ret.eventType == 'show') {
        //             then.setState({ openPdfReader: true });
        //             if (then.props.location.pathname != "/useHelpDetail") {
        //                 then.pdfReader.closeView()
        //             }
        //         }
        //     }
        // }); 
    }
    openPdfReader(showView) {
        if (showView) {
            this.pdfReader.showView(); //显示文档视图
        }
    }
    componentWillUnmount() {
        // clearTimeout(this.state.token);
        // if (isiOS) {
        //     if (this.state.openPdfReader) {
        //         this.pdfReader.closeView()
        //     }  
        // } else {
        //     this.pdfReader.closeView()
        // }
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
    //监听事件，点击系统返回键
    clickKeyback = () => {
        if (window.api) {
            window.api.addEventListener({
                name: 'keyback'
            }, (ret, err) => {
                this.closePage(); //执行关闭页面的相关操作
            });
        }
    }
    componentWillMount() {
        //移除事件，点击系统返回键
        if (window.api) {
            window.api.removeEventListener({
                name: 'keyback'
            });
        }
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