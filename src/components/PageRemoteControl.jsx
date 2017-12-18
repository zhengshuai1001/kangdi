import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon, Flex, Tabs } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

export default class PageRemoteControl extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        const imgUrl = ['../images/shortcut-btn-trunk.png',
            '../images/shortcut-btn-lock.png',
            '../images/shortcut-btn-engine.png',
            '../images/shortcut-btn-door.png',
            '../images/shortcut-btn-lamp.png',
            '../images/shortcut-btn-switch.png',
            '../images/shortcut-btn-refrigeration.png',
            '../images/shortcut-btn-heating.png',
            '../images/shortcut-btn-switch.png'
        ];
        const tabs = [
            { title: <div><img src={require('../images/shortcut-btn-trunk.png')} /><span>后备箱</span></div> },
            { title: <div><img src={require('../images/shortcut-btn-lock.png')} /><span>车锁</span></div> },
            { title: <div><img src={require('../images/shortcut-btn-engine.png')} /><span>电机加锁</span></div> },
            { title: <div><img src={require('../images/shortcut-btn-door.png')} /><span>车门</span></div> },
            { title: <div><img src={require('../images/shortcut-btn-lamp.png')} /><span>车灯</span></div> },
            { title: <div><img src={require('../images/shortcut-btn-switch.png')} /><span>空调</span></div> },
            { title: <div><img src={require('../images/shortcut-btn-refrigeration.png')} /><span>AC</span></div> },
            { title: <div><img src={require('../images/shortcut-btn-heating.png')} /><span>PTC</span></div> },
            { title: <div><img src={require('../images/shortcut-btn-switch.png')} /><span>除雾除霜</span></div> }
        ];
        return (
            <QueueAnim
                type="right"
                duration="500"
                ease="easeOutBack"
            >
                <div key="1" className="page-login  page-remote-control">
                    <NavBar
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                    >远程控制</NavBar>
                    <div className="air-conditioner-box" style={{ "margin-top": "2rem","padding":"0 1rem 1rem 2rem"}}>
                        <Flex>
                            <Flex.Item className="temperature-flex-item"><span className="temperature">25℃</span></Flex.Item>
                            <Flex.Item><span className="temperature-img-box"><img src={require('../images/shortcut-btn-refrigeration.png')} /></span></Flex.Item>
                            <Flex.Item><span className="temperature-img-box"><img src={require('../images/shortcut-btn-heating.png')} /></span></Flex.Item>
                            <Flex.Item><span className="temperature-img-box"><img src={require('../images/shortcut-btn-defrost.png')} /></span></Flex.Item>
                            <Flex.Item><span className="temperature-img-box"><img src={require('../images/shortcut-btn-switch.png')} /></span></Flex.Item>
                        </Flex>
                    </div>
                    <div className="my-car-img-box"></div>
                    <Tabs
                        prefixCls="my-car-tabs"
                        tabs={tabs}
                        initialPage={1}
                        onChange={(tab, index) => { console.log('onChange', index, tab); }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                    </Tabs>
                </div>
            </QueueAnim>
        )
    }
}

PageRemoteControl.contextTypes = {
    router: React.PropTypes.object
};