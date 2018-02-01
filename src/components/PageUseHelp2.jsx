import React from "react";
import { hashHistory, Link } from "react-router";
import { Accordion, NavBar, Carousel, WingBlank, Button } from "antd-mobile";
import { runPromise } from '../common/promise';

// const imgUrl = [
//     require('../images/use-help-item-default.png')
//     require('../images/use-help-card-1.png'), 
//     require('../images/use-help-card-2.png'), 
//     require('../images/use-help-card-3.png'), 
//     require('../images/use-help-card-4.png'), 
//     require('../images/use-help-card-5.png'),
// ];


const Card = (props) => (
    <div 
        className="card-item"
        onClick={()=>{ props.touchCard(props.index) }}
    >
        <img src={props.imgUrl} onLoad={ (e) => { props.onCacheImg( e, props.imgUrl) } } />
    </div>
)

export default class PageUseHelp2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            useHelpData: localStorage.getItem("useHelpDefaultData") ? JSON.parse(localStorage.getItem("useHelpDefaultData")) : []
        }
        this.handleUseHelp = (req) => {
            let res = req.result;
            if (res.code == 1000) {
                let data = res.data;
                this.setState({
                    useHelpData: data
                });
                localStorage.setItem("useHelpDefaultData",JSON.stringify(data))
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
    }
    componentDidMount() {
        // simulate img loading
        //发送ajax获取使用帮助的文本
        runPromise("appHelp", {}, this.handleUseHelp, true);

        
    }
    handleTouchCard = (index) => {
        // console.log(index);
        hashHistory.push({
            pathname: '/useHelpDetail',
            // query: { form: 'pageUseHelp2' },
            query:{
                name: this.state.useHelpData[index].name,
                doc_url: this.state.useHelpData[index].doc_url
            }
        });
    }
    onCacheImg(e, imgUrl ) {
        // console.log(e.target, imgUrl);

    }
    render() {
        return (
            <div key="1" className="page-use-help">
                <NavBar
                    style={{ "background-color": "#000" }}
                    mode="light"
                >使用帮助</NavBar>
                <WingBlank className="card-item-WingBlank" size="lg">
                    {/* <Card imgUrl={imgUrl[0]} index="0" touchCard={this.handleTouchCard} />
                    <Card imgUrl={imgUrl[1]} index="1" touchCard={this.handleTouchCard} /> */}
                    {/* <Card index="2" touchCard={this.handleTouchCard} />
                    <Card index="3" touchCard={this.handleTouchCard} />
                    <Card index="4" touchCard={this.handleTouchCard} /> */}
                    {
                        this.state.useHelpData.map((val, index) => {
                            return (
                                <Card index={index} onCacheImg={this.onCacheImg} imgUrl={val.nav_url} touchCard={this.handleTouchCard} />
                            )
                        })
                    }
                </WingBlank>
                <Button className="feedbackButton" type="large" size="small" inline>
                    <Link className="toPageFeedback" to="/feedback">
                        <img src={require('../images/white-pen-icon.png')} />
                        <span>意见反馈</span>
                    </Link>
                </Button>
            </div>
        );
    }
}

PageUseHelp2.contextTypes = {
    router: React.PropTypes.object
};