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
    doorLF: require('../images/shortcut-btn-doorLF.png'),
    doorRF: require('../images/shortcut-btn-doorRF.png'),
    doorLR: require('../images/shortcut-btn-doorLR.png'),
    doorRR: require('../images/shortcut-btn-doorRR.png'),
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

const transformParam = {
    trunk0: "18",
    trunk1: "17",
    lock0: "8",
    lock1: "7",
    engine0: "24",
    engine1: "23",
    door0: "2",
    door1: "1",
    lamp0: "16",
    lamp1: "15",
    AirConditioner0: "2", //空调
    AirConditioner1: "1", //空调
    ac0: "4", // AC降温
    ac1: "3", // AC降温
    ptc0: "6", // PTC加热
    ptc1: "5", // PTC加热
    defrost0: "9", // 除雾除霜
    defrost1: "12", // 除雾除霜
}

export default class PageMyCar extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
            trunk: 0, //后备箱
            lock: 0,  //车锁
            engine: 0, //电机加锁
            door: 0, //车门
            lamp: 0, //车灯
            AirConditioner: 0, //空调
            ac: 0, // AC降温
            ptc: 0, // PTC加热
            defrost: 0, // 除雾除霜
            acc: 0, // 自适应巡航
            soc: 0, //电量
            temperature: 0, //室内温度
            onClickTabName: "" //点击tab的state名字
        }
        //发送完车辆运行数据查询后的处理函数
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
                    door: data.BcmData.LFDoor,  //左前门,先用左前门代替车门
                    doorLF: data.BcmData.LFDoor,  //左前门
                    doorRF: data.BcmData.RFDoor,  //右前门
                    doorLR: data.BcmData.LRDoor,  //左后门
                    doorRR: data.BcmData.RRDoor,  //右后门
                    lamp: data.BcmData.Headlight, //大灯
                    AirConditioner: data.EasData.AirConditione, 
                    ac: data.EasData.AC,
                    ptc: data.EasData.PTC,
                    defrost: data.EasData.WindDirection == 3 ? 1 : 0,
                    acc: data.KDData.ACC,
                    soc: data.CarData.SOC,
                    temperature: 0 //室内温度不知道
                });
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        //发送完后车身控制后的处理函数
        this.handleControlCar = (req) => {
            let res = req.result;
            // console.log(res);
            if (res.code == 1000) {
                let data = res.data;
                //将相应的state取反操作
                this.setState({
                    [this.state.onClickTabName]: this.state[this.state.onClickTabName] == 1 ? 0 : 1
                });
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        //发送完车身控制的空调部分的处理函数
        this.handleControlCarAir = (req) => {
            let res = req.result;
            // console.log(res);
            if (res.code == 1000) {
                let data = res.data;
                //将相应的state取反操作
                this.setState({
                    [this.state.onClickTabName]: this.state[this.state.onClickTabName] == 1 ? 0 : 1
                });

                //空调操作后做的应该是重新获取空调的数据。
                //发送ajax获取车辆运行数据
                runPromise("queryCarStatus", {}, this.handleQueryCarStatus,true, true);
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
    }
    onActive = (index) => {
        // console.log(index);
        var path = "/";
        index == 0 ? path = "/remoteMeter" : "";
        index == 1 ? path = "/modifyControlCodeFirst" : "";
        index == 2 ? path = "/remoteControl" : "";
        // console.log(path)
        hashHistory.push({
            pathname: path
        }); 
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.carStatus)
    }
    componentDidMount() {
        //发送ajax获取车辆运行数据
        // runPromise("queryCarStatus", {}, this.handleQueryCarStatus,true, true);
        //重新向后端获取车辆运行数据
        this.props.queryCarStatus();
    }
    componentWillMount() {
        let vincode = localStorage.getItem("vincode");
        if (!vincode) {
            //车辆没有没登录，跳转到我的车辆页，输入车辆验证码
            hashHistory.push({
                pathname: '/MyCarLogin',
                query: { form: 'promise' }
            });
            return;
        }
        this.setState(this.props.carStatus)
    }
    onClickTab = (tab, index) => {
        let state = tab.title.props.state;
        if (state == "door") {
            // Toast.offline('不能操作车门', 1);
            return;
        }
        this.setState({onClickTabName: state});
        let suffix = this.state[state] == 1 ? "0" : "1" ;
        let param = state + suffix;
        //不能是空调控制
        if (state != "AirConditioner" && state != "ac" && state != "ptc" && state != "defrost") {
            //发送ajax设置车身控制
            // runPromise("controlCar", {
            //     contrlpara: { "part": transformParam[param], "para": "" }
            // }, this.handleControlCar, true, true);
        } else {
            //发送ajax设置车身控制 ,空调
            // runPromise("controlAc", {
            //     contrlpara: { "part": transformParam[param], "para": "" }
            // }, this.handleControlCarAir, true, true);
        } 
    }
    render() {
        const doorAllClassName = `tabs-one door ${this.state.doorLF ? "lf" : ""} ${this.state.doorRF ? "rf" : ""} ${this.state.doorLR ? "lr" : ""} ${this.state.doorRR ? "rr" : ""}`;
        const tabs = [
            { title: <div state="trunk" className={this.state.trunk ? "tabs-one active" : "tabs-one"}><img src={ this.state.trunk ? imgUrl.trunkActive : imgUrl.trunk} /><span>后备箱</span></div> },
            { title: <div state="lock" className={this.state.lock ? "tabs-one active" : "tabs-one"}><img src={ this.state.lock ? imgUrl.lockActive : imgUrl.lock} /><span>车锁</span></div> },
            // { title: <div state="engine" className={this.state.engine ? "tabs-one active" : "tabs-one"}><img src={ this.state.engine ? imgUrl.engineActive : imgUrl.engine} /><span>电机加锁</span></div> },
            // { title: <div state="door" className={this.state.door ? "tabs-one active" : "tabs-one"}><img src={ this.state.door ? imgUrl.doorActive : imgUrl.door} /><span>车门</span></div> },
            { title: <div state="door" className={doorAllClassName}><img className="bg" src={imgUrl.door} /><img className="lf" src={imgUrl.doorLF} /><img className="rf" src={imgUrl.doorRF} /><img className="lr" src={imgUrl.doorLR} /><img className="rr" src={imgUrl.doorRR} /><span>车门</span></div> },
            { title: <div state="lamp" className={this.state.lamp ? "tabs-one active" : "tabs-one"}><img src={ this.state.lamp ? imgUrl.lampActive : imgUrl.lamp} /><span>车灯</span></div> },
            { title: <div state="AirConditioner" className={this.state.AirConditioner ? "tabs-one active" : "tabs-one"}><img src={ this.state.AirConditioner ? imgUrl.switchActive : imgUrl.switch} /><span>空调</span></div> },
            { title: <div state="ac" className={this.state.ac ? "tabs-one active" : "tabs-one"}><img src={ this.state.ac ? imgUrl.refrigerationActive : imgUrl.refrigeration} /><span>AC</span></div> },
            { title: <div state="ptc" className={this.state.ptc ? "tabs-one active" : "tabs-one"}><img src={ this.state.ptc ? imgUrl.heatingActive : imgUrl.heating} /><span>PTC</span></div> },
            { title: <div state="defrost" className={this.state.defrost ? "tabs-one active" : "tabs-one"}><img src={ this.state.defrost ? imgUrl.defrostActive : imgUrl.defrost} /><span>除雾除霜</span></div> }
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
                        <div className="my-car-img-box">
                            <span className="car-no-span">{localStorage.getItem("car_no") ? localStorage.getItem("car_no"): ""}</span>
                        </div>
                        <div className="my-car-soc-box">
                            <span className="soc">SOC</span>
                            <span className="txt">{this.state.soc}%</span>
                        </div>
                        <div className="my-car-annular-box"></div>
                        <div className="my-car-temperature-box" style={{ "display": "none" }}>
                            <span className="temperature">{this.state.temperature}℃</span>
                            <span className="txt">车内温度</span>
                        </div>
                        <div className="my-car-switchKey-box">
                            <img src={imgUrl.icon}/>
                            <div>
                                {/* <span className={ this.state.acc == 0 ? "off active" : "off" }>OFF</span>
                                <span className={this.state.acc == 1 ? "acc active" : "acc"}>ACC</span>
                                <span className={this.state.acc == 2 ? "on active" : "on"}>ON</span> */}
                                <span className="icon" style={{ "display": this.state.acc == 0 ? "block" : "none" }}>OFF</span>
                                <span className="icon" style={{ "display": this.state.acc == 1 ? "block" : "none" }}>ACC</span>
                                <span className="icon" style={{ "display": this.state.acc == 2 ? "block" : "none" }}>ON</span>
                            </div>
                        </div>
                        <Tabs
                            prefixCls="my-car-tabs"
                            tabBarBackgroundColor="transparent"
                            tabBarUnderlineStyle={{ "display": "none" }}
                            tabs={tabs}
                            initialPage={0}
                            animated={false}
                            usePaged={false}
                            swipeable={false}
                            useOnPan={false}
                            // onChange={(tab, index) => { console.log('onChange', index, tab); }}
                            onTabClick={this.onClickTab}
                        >
                        </Tabs>
                    </div>
                    <div className="page-my-car-WingBlank" size="lg" style={{ "margin": "3rem 2rem 0", "height": "calc(100% - 50rem)", "position": "relative" }}>
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
    router: React.PropTypes.object,
    carStatus: React.PropTypes.object
};