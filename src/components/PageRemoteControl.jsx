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
    require('../images/shortcut-btn-window.png'),
    require('../images/shortcut-btn-horn.png')
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

const ShortcutBtn = (props) => (
    <div 
        className="shortcut-btn-box"
        onClick={() => { props.onActive(props.index)}}
    >
        <div className="shortcut-btn-img-box">
            <img src={props.imgURL} />
        </div>
        <span>{props.text}</span>
    </div>    
)

export default class PageRemoteControl extends React.Component{
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
                        tabBarBackgroundColor="transparent"
                        tabBarUnderlineStyle={{"display":"none"}}
                        tabs={tabs}
                        useOnPan={false}
                        onChange={(tab, index) => { console.log('onChange', index, tab); }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                    </Tabs>
                    <div className="page-login-WingBlank-diy" size="lg" style={{ "padding":"3rem 2rem 0" }}>
                        <Flex>
                            <Flex.Item><ShortcutBtn index="0" text="后备箱" imgURL={imgUrl[0]} onActive={this.onActive}  /></Flex.Item>
                            <Flex.Item><ShortcutBtn index="1" text="车锁" imgURL={imgUrl[1]} onActive={this.onActive}  /></Flex.Item>                            
                            <Flex.Item><ShortcutBtn index="2" text="车窗" imgURL={imgUrl[9]} onActive={this.onActive}  /></Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item><ShortcutBtn index="3" text="电机加锁" imgURL={imgUrl[2]} onActive={this.onActive}  /></Flex.Item>
                            <Flex.Item><ShortcutBtn index="4" text="闪灯鸣笛" imgURL={imgUrl[10]} onActive={this.onActive}  /></Flex.Item>                            
                            <Flex.Item><ShortcutBtn index="5" text="车灯" imgURL={imgUrl[4]} onActive={this.onActive}  /></Flex.Item>
                        </Flex>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}

PageRemoteControl.contextTypes = {
    router: React.PropTypes.object
};