import React from "react";
import { hashHistory, Link } from "react-router";
import { Accordion, NavBar, Carousel, WingBlank, Button } from "antd-mobile";

export default class PageUseHelp extends React.Component {
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
    render() {
        return (
            <div key="1" className="page-use-help">
                <NavBar
                    style={{ "background-color": "#000" }}
                    mode="light"
                >使用帮助</NavBar>
                <Carousel
                    autoplay={false}
                    infinite
                    selectedIndex={0}
                >
                    {this.state.imgsData.map(ii => (
                        <img
                            src={ii}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                        />
                    ))}
                </Carousel>
                <Accordion className="my-accordion">
                    <Accordion.Panel header="如何注册康迪智慧出行" className="pad">
                        <div className="box">
                            <span className="answer">答</span>
                            <span className="content">this is panel content1 or other</span>
                        </div>
                    </Accordion.Panel>
                    <Accordion.Panel header="如何获得授权码" className="pad">
                        <div className="box">
                            <span className="answer">答</span>
                            <span className="content">你可以先...再...该问题的答案，前台读取，后台录入。你可以先...再...该问题的答案，前台读取，后台录入。</span>
                        </div>
                    </Accordion.Panel>
                    <Accordion.Panel header="如何提升康迪会员等级" className="pad">
                        <div className="box">
                            <span className="answer">答</span>
                            <span className="content">text text text text text text text text text text text text text text text</span>
                        </div>
                    </Accordion.Panel>
                    <Accordion.Panel header="康迪积分的介绍" className="pad">
                        <div className="box">
                            <span className="answer">答</span>
                            <span className="content">text text text text text text text text text text text text text text text</span>
                        </div>
                    </Accordion.Panel>
                    <Accordion.Panel header="康迪积分常见问题" className="pad">
                        <div className="box">
                            <span className="answer">答</span>
                            <span className="content">text text text text text text text text text text text text text text text</span>
                        </div>
                    </Accordion.Panel>
                </Accordion>
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

PageUseHelp.contextTypes = {
    router: React.PropTypes.object
};