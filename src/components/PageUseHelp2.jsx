import React from "react";
import { hashHistory, Link } from "react-router";
import { Accordion, NavBar, Carousel, WingBlank, Button } from "antd-mobile";

const imgUrl = [
    require('../images/use-help-card-1.png'), 
    require('../images/use-help-card-2.png'), 
    require('../images/use-help-card-3.png'), 
    require('../images/use-help-card-4.png'), 
    require('../images/use-help-card-5.png')
];

const Card = (props) => (
    <div 
        className="card-item"
        onClick={()=>{ props.touchCard(props.index) }}
    >
        <img src={imgUrl[props.index]} alt=""/>
    </div>
)

export default class PageUseHelp2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgsData: [require('../images/page-useHelp-Carousel-one.png'), require('../images/page-useHelp-Carousel-two.png'), require('../images/page-useHelp-Carousel-three.png')],
            imgHeight: 176,
        }
    }
    componentDidMount() {
        // simulate img loading
    }
    handleTouchCard = (index) => {
        // console.log(index);
        hashHistory.push({
            pathname: '/useHelpDetail',
            query: { form: 'pageUseHelp2' },
            state:{
                index: index
            }
        });
    }
    render() {
        return (
            <div key="1" className="page-use-help">
                <NavBar
                    style={{ "background-color": "#000" }}
                    mode="light"
                >使用帮助</NavBar>
                <WingBlank className="card-item-WingBlank" size="lg">
                    <Card index="0" touchCard={this.handleTouchCard} />
                    <Card index="1" touchCard={this.handleTouchCard} />
                    <Card index="2" touchCard={this.handleTouchCard} />
                    <Card index="3" touchCard={this.handleTouchCard} />
                    <Card index="4" touchCard={this.handleTouchCard} />
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