import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon, Flex, Tabs } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

const imgUrl = [require('../images/shortcut-btn-trunk.png'),
    require('../images/shortcut-btn-lock.png'),
    require('../images/shortcut-btn-engine.png'),
    require('../images/shortcut-btn-door.png'),
    require('../images/shortcut-btn-lamp.png'),
    require('../images/shortcut-btn-switch.png'),
    require('../images/shortcut-btn-refrigeration.png'),
    require('../images/shortcut-btn-heating.png'),
    require('../images/shortcut-btn-defrost.png'),
    require('../images/big-btn-meter.png'),
    require('../images/big-btn-code.png'),
    require('../images/big-btn-control.png'),
    require('../images/switch-key-icon.png')
];

const tabs = [
    { title: <div className="tabs-one"><img src={imgUrl[0]} /><span>后备箱</span></div> },
    { title: <div className="tabs-one"><img src={imgUrl[1]} /><span>车锁</span></div> },
    { title: <div className="tabs-one"><img src={imgUrl[2]} /><span>电机加锁</span></div> },
    { title: <div className="tabs-one"><img src={imgUrl[3]} /><span>车门</span></div> },
    { title: <div className="tabs-one"><img src={imgUrl[4]} /><span>车灯</span></div> },
    { title: <div className="tabs-one"><img src={imgUrl[5]} /><span>空调</span></div> },
    { title: <div className="tabs-one"><img src={imgUrl[6]} /><span>AC</span></div> },
    { title: <div className="tabs-one"><img src={imgUrl[7]} /><span>PTC</span></div> },
    { title: <div className="tabs-one"><img src={imgUrl[8]} /><span>除雾除霜</span></div> }
];

const MyCarBtn = (props) => (
    <div
        className="my-car-btn-box"
        onClick={() => { props.onActive(props.index) }}
    >
        <div className="my-car-btn-img-box">
            <img src={props.imgURL} />
        </div>
        <span>{props.text}</span>
    </div>
)

export default class PageMyCar extends React.Component{
    constructor(props) {
        super(props)
    }
    onActive = (index) => {
        console.log(index);
    }
    render() {
        return (
            <QueueAnim
                type="right"
                duration="500"
                ease="easeOutBack"
            >
                <div key="1" className="page-login  page-my-car">
                    <NavBar
                        style={{ "background-color": "#000" }}
                        mode="light"
                    >我的车辆</NavBar>
                    <div className="my-car-big-box" style={{ "padding-top": "4.6rem" }}>
                        <div className="my-car-img-box"></div>
                        <div className="my-car-soc-box">
                            <span className="soc">SOC</span>
                            <span className="txt">35%</span>
                        </div>
                        <div className="my-car-annular-box"></div>
                        <div className="my-car-temperature-box">
                            <span className="temperature">25℃</span>
                            <span className="txt">车内温度</span>
                        </div>
                        <div className="my-car-switchKey-box">
                            <img src={imgUrl[12]}/>
                            <div>
                                <span className="off">OFF</span>
                                <span className="acc">ACC</span>
                                <span className="on">ON</span>
                            </div>
                        </div>
                        <Tabs
                            prefixCls="my-car-tabs"
                            tabBarBackgroundColor="transparent"
                            tabBarUnderlineStyle={{ "display": "none" }}
                            tabs={tabs}
                            initialPage={0}
                            onChange={(tab, index) => { console.log('onChange', index, tab); }}
                            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                        >
                        </Tabs>
                    </div>
                    <div className="page-my-car-WingBlank" size="lg" style={{ "padding": "3rem 2rem 0" }}>
                        <Flex>
                            <Flex.Item><MyCarBtn index="0" text="远程仪表" imgURL={imgUrl[9]} onActive={this.onActive} /></Flex.Item>
                            <Flex.Item><MyCarBtn index="1" text="控制码修改" imgURL={imgUrl[10]} onActive={this.onActive} /></Flex.Item>
                            <Flex.Item><MyCarBtn index="2" text="远程控制" imgURL={imgUrl[11]} onActive={this.onActive} /></Flex.Item>
                        </Flex>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}

PageMyCar.contextTypes = {
    router: React.PropTypes.object
};