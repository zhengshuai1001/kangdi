import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon, Flex, Tabs, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { runPromise } from '../common/promise';

// const imgUrl = [require('../images/shortcut-btn-trunk.png'),
//     require('../images/shortcut-btn-lock.png'),
//     require('../images/shortcut-btn-engine.png'),
//     require('../images/shortcut-btn-door.png'),
//     require('../images/shortcut-btn-lamp.png'),
//     require('../images/shortcut-btn-switch.png'),
//     require('../images/shortcut-btn-refrigeration.png'),
//     require('../images/shortcut-btn-heating.png'),
//     require('../images/shortcut-btn-defrost.png'),
//     require('../images/big-btn-meter.png'),
//     require('../images/big-btn-code.png'),
//     require('../images/big-btn-control.png'),
//     require('../images/switch-key-icon.png')
// ];
const imgUrl ={
    trunk : require('../images/shortcut-btn-trunk.png'),
    lock : require('../images/shortcut-btn-lock.png'),
    engine : require('../images/shortcut-btn-engine.png'),
    door : require('../images/shortcut-btn-door.png'),
    lamp : require('../images/shortcut-btn-lamp.png'),
    switch : require('../images/shortcut-btn-switch.png'),
    refrigeration : require('../images/shortcut-btn-refrigeration.png'),
    heating : require('../images/shortcut-btn-heating.png'),
    defrost : require('../images/shortcut-btn-defrost.png'),
    meter : require('../images/big-btn-meter.png'),
    code : require('../images/big-btn-code.png'),
    control : require('../images/big-btn-control.png'),
    icon : require('../images/switch-key-icon.png'),
    trunkActive: require('../images/shortcut-btn-trunk-active.png'), //以下是活动状态的图标
    lockActive: require('../images/shortcut-btn-lock-active.png'),
    engineActive: require('../images/shortcut-btn-engine-active.png'),
    doorActive: require('../images/shortcut-btn-door-active.png'),
    lampActive: require('../images/shortcut-btn-lamp-active.png'),
    switchActive: require('../images/shortcut-btn-switch-active.png'),
    refrigerationActive: require('../images/shortcut-btn-refrigeration-active.png'),
    heatingActive: require('../images/shortcut-btn-heating-active.png'),
    defrostActive: require('../images/shortcut-btn-defrost-active.png'),

}
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
        this.state ={
            trunk: 1, //后备箱
            lock: 1,  //车锁
            engine: 1, //电机加锁
            door: 1, //车门
            lamp: 1, //车灯
            AirConditioner: 1, //空调
            ac: 1, // AC降温
            ptc: 1, // PTC加热
            defrost: 1, // 除雾除霜
            acc: 0, // 自适应巡航
            soc: 0, //电量
            temperature: 0 //室内温度
        }
        //发送完后车辆运行数据查询后的处理函数
        this.handleQueryCarStatus = (req) => {
            let res = req.result;
            // console.log(res);
            if (res.code == 1000) {
                let data = res.data;
                //获取车辆运行数据后保存
                this.setState({
                    trunk: data.BcmData.Trunk, 
                    lock: data.BcmData.CentralLock,  
                    engine: data.BcmData.BatteryDoor, //假的
                    door: data.BcmData.LFDoor,  //昨前门
                    lamp: data.BcmData.Headlight, //大灯
                    AirConditioner: data.EasData.AirConditione, 
                    ac: data.EasData.AC,
                    ptc: data.EasData.PTC,
                    defrost: data.EasData.WindDirection,
                    acc: data.KDData.ACC,
                    soc: data.CarData.SOC,
                    temperature: 0 //室内温度不知道
                });
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
    }
    onActive = (index) => {
        console.log(index);
        var path = "/";
        index == 0 ? path = "/remoteMeter" : "";
        index == 1 ? path = "/modifyControlCodeFirst" : "";
        index == 2 ? path = "/remoteControl" : "";
        console.log(path)
        hashHistory.push({
            pathname: path
        }); 
    }
    componentDidMount() {
        //发送ajax获取车辆运行数据
        // runPromise("queryCarStatus", {}, this.handleQueryCarStatus,true, true);
    }
    render() {
        const tabs = [
            { title: <div className="tabs-one"><img src={ this.state.trunk ? imgUrl.trunkActive : imgUrl.trunk} /><span>后备箱</span></div> },
            { title: <div className="tabs-one"><img src={ this.state.lock ? imgUrl.lockActive : imgUrl.lock} /><span>车锁</span></div> },
            { title: <div className="tabs-one"><img src={ this.state.engine ? imgUrl.engineActive : imgUrl.engine} /><span>电机加锁</span></div> },
            { title: <div className="tabs-one"><img src={ this.state.door ? imgUrl.doorActive : imgUrl.door} /><span>车门</span></div> },
            { title: <div className="tabs-one"><img src={ this.state.lamp ? imgUrl.lampActive : imgUrl.lamp} /><span>车灯</span></div> },
            { title: <div className="tabs-one"><img src={ this.state.AirConditioner ? imgUrl.switchActive : imgUrl.switch} /><span>空调</span></div> },
            { title: <div className="tabs-one"><img src={ this.state.ac ? imgUrl.refrigerationActive : imgUrl.refrigeration} /><span>AC</span></div> },
            { title: <div className="tabs-one"><img src={ this.state.ptc ? imgUrl.heatingActive : imgUrl.heating} /><span>PTC</span></div> },
            { title: <div className="tabs-one"><img src={ this.state.defrost ? imgUrl.defrostActive : imgUrl.defrost} /><span>除雾除霜</span></div> }
        ];
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
                            <span className="txt">{this.state.soc}%</span>
                        </div>
                        <div className="my-car-annular-box"></div>
                        <div className="my-car-temperature-box">
                            <span className="temperature">{this.state.temperature}℃</span>
                            <span className="txt">车内温度</span>
                        </div>
                        <div className="my-car-switchKey-box">
                            <img src={imgUrl.icon}/>
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
                            <Flex.Item><MyCarBtn index="0" text="远程仪表" imgURL={imgUrl.meter} onActive={this.onActive} /></Flex.Item>
                            <Flex.Item><MyCarBtn index="1" text="控制码修改" imgURL={imgUrl.code} onActive={this.onActive} /></Flex.Item>
                            <Flex.Item><MyCarBtn index="2" text="远程控制" imgURL={imgUrl.control} onActive={this.onActive} /></Flex.Item>
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