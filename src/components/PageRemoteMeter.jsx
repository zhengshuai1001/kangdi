import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon, Flex } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { runPromise } from '../common/promise';

import MeterG2 from "./MeterG2";

const imgUrl = {
    trunk: require('../images/shortcut-btn-trunk.png'),
    lock: require('../images/shortcut-btn-lock.png'),
    engine: require('../images/shortcut-btn-engine.png'),
    door: require('../images/shortcut-btn-door.png'),
    doorLF: require('../images/shortcut-btn-doorLF.png'),
    doorRF: require('../images/shortcut-btn-doorRF.png'),
    doorLR: require('../images/shortcut-btn-doorLR.png'),
    doorRR: require('../images/shortcut-btn-doorRR.png'),
    lamp: require('../images/shortcut-btn-lamp.png'),
    switch: require('../images/shortcut-btn-switch.png'),
    trunkActive: require('../images/shortcut-btn-trunk-active.png'), //以下是活动状态的图标
    lockActive: require('../images/shortcut-btn-lock-active.png'),
    engineActive: require('../images/shortcut-btn-engine-active.png'),
    doorActive: require('../images/shortcut-btn-door-active.png'),
    lampActive: require('../images/shortcut-btn-lamp-active.png'),
    switchActive: require('../images/shortcut-btn-switch-active.png')
}

const MyCarBtn = (props) => (
    <div
        className={props.active ? "shortcut-box-out active" : "shortcut-box-out"}
    >
    {
            props.text == "车门" ? <div style={{ "position": "relative"}} className={props.doorAllClassName}><img className="bg" src={imgUrl.door} /><img className="lf" src={imgUrl.doorLF} /><img className="rf" src={imgUrl.doorRF} /><img className="lr" src={imgUrl.doorLR} /><img className="rr" src={imgUrl.doorRR} /></div> : <div className="shortcut-box"><img src={props.imgURL} /></div>
    }
        {/* <div className="shortcut-box">
            <img src={props.imgURL} />
        </div> */}
        <span className="shortcut-text">{props.text}</span>
    </div>
)

export default class PageRemoteMeter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            trunk: 0, //后备箱
            lock: 0,  //车锁
            engine: 0, //电机加锁
            door: 0, //车门
            lamp: 0, //车灯
            AirConditioner: 0, //空调
            soc: 0, //电量
            Mileage: 0, //仪表里程
            ReMileage: 0, //剩余里程
            TotalV: 0, //总压
            TotalA: 0, //本来要显示最低单体电压，现在用总电流代替
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
                    door: data.BcmData.LFDoor,  //左前门,假装整个车门的状态
                    doorLF: data.BcmData.LFDoor,  //左前门
                    doorRF: data.BcmData.RFDoor,  //右前门
                    doorLR: data.BcmData.LRDoor,  //左后门
                    doorRR: data.BcmData.RRDoor,  //右后门
                    lamp: data.BcmData.Headlight, //大灯
                    AirConditioner: data.EasData.AirConditione,
                    soc: data.CarData.SOC,
                    Mileage: data.KDData.Mileage, 
                    ReMileage: data.KDData.ReMileage, 
                    TotalV: data.CarData.TotalV, 
                    TotalA: data.CarData.TotalA //本来要显示最低单体电压，现在用总电流代替
                });
                //绘制仪表盘
                MeterG2(this.state.Mileage, this.state.ReMileage, this.state.soc);
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.carStatus)   
        let token = setTimeout(()=>{
            //绘制仪表盘,这是特例
            // MeterG2(nextProps.carStatus.Mileage, nextProps.carStatus.ReMileage, nextProps.carStatus.soc);
            // this.state.updateMeterG2(nextProps.carStatus.Mileage, nextProps.carStatus.ReMileage, nextProps.carStatus.soc)
            if (this.state.destroyMeterG2) {
                this.state.destroyMeterG2(); //销毁图层
            }
            //绘制仪表盘,这是特例
            let destroyMeterG2 = MeterG2(nextProps.carStatus.Mileage, nextProps.carStatus.ReMileage, nextProps.carStatus.soc)
            this.setState({
                destroyMeterG2: destroyMeterG2
            })
        },0)   
        this.setState({token: token})
    }
    componentDidMount() {
        //发送ajax获取车辆运行数据
        // runPromise("queryCarStatus", {}, this.handleQueryCarStatus, true, true);

        // setTimeout(()=>{
        //     //绘制仪表盘,这是特例
        //     let updateMeterG2 = MeterG2(this.state.Mileage, this.state.ReMileage, this.state.soc);
        //     this.setState({
        //         updateMeterG2: updateMeterG2
        //     })
        // },0)
        //重新向后端获取车辆运行数据
        this.props.queryCarStatus();
    }
    componentWillUnmount() {
        clearTimeout(this.state.token);
    }
    render(){
        const doorAllClassName = `shortcut-box tabs-one door ${this.state.doorLF ? "lf" : ""} ${this.state.doorRF ? "rf" : ""} ${this.state.doorLR ? "lr" : ""} ${this.state.doorRR ? "rr" : ""}`;
        return (
            <QueueAnim
                type="right"
                duration="500"
                ease="easeOutBack"
            >
                <div key="1" className="page-login  page-remote-instrument">
                    <NavBar
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                    >远程仪表</NavBar>
                    <div id="backgroud">
                        <div id="mountNode"></div>
                        <div id="mountNode2"></div>
                        <img id="dashboardCenter" src={require('../images/dashboard-Center.png')} />
                    </div>
                    <div id="mountNode3" className="am-flexbox am-flexbox-align-center am-flexbox-justify-center">
                        <div className="am-flexbox-item" style={{"display":"none"}}>
                            <p className="bar-title">{this.state.TotalA}v</p>
                            <div className={this.state.TotalA == 0 ? "bar empty" : (this.state.TotalA == 5 ? "bar full" : "bar")}>
                                <span className="bar-left bar-head"></span>
                                <span className="bar-unfill">
                                    <span className="bar-fill-width">
                                        <span className="bar-fill" style={{
                                            "width": (this.state.TotalA/5).toFixed(2)*100 + "%"
                                        }}></span>
                                    </span>
                                </span>
                                <span className="bar-right bar-head"></span>
                            </div>
                            <p className="bar-bottom">
                                <span className="bar-bottom-left">0v</span>
                                <p className="bar-bottom-text">最低单体电压</p>
                                <p className="bar-bottom-right">5v</p>
                            </p>
                        </div>
                        <div className="am-flexbox-item" style={{ "display": this.state.TotalV == 0 ? "block" : "block" }}>
                            <p className="bar-title">{this.state.TotalV}v</p>
                            <div className={this.state.TotalV == 0 ? "bar empty" : (this.state.TotalV == 500 ? "bar full" : "bar") }>
                                <span className="bar-left bar-head"></span>
                                <span className="bar-unfill">
                                    <span className="bar-fill-width">
                                        <span className="bar-fill" style={{
                                            "width": ((this.state.TotalV > 500 ? 500 : this.state.TotalV) / 500).toFixed(2) * 100 + "%"
                                        }}></span>
                                    </span>
                                </span>
                                <span className="bar-right bar-head"></span>
                            </div>
                            <p className="bar-bottom">
                                <span className="bar-bottom-left">0v</span>
                                <p className="bar-bottom-text">总压</p>
                                <p className="bar-bottom-right">500v</p>
                            </p>
                        </div>
                    </div>
                    <p className="mileage bar-center-text">当前电量{this.state.soc}%，大约可行驶{this.state.ReMileage}KM！</p>
                    {/* <p className="voltage bar-center-text">总电压 {this.state.TotalV}V，最低单体电压 {this.state.TotalA}V</p> */}
                    <p className="voltage bar-center-text">总电压 {this.state.TotalV}V</p>
                    <div className="shortcut-WingBlank" size="lg" style={{ "padding": "1rem 2rem 0 2rem" }}>
                        <Flex justify="center" className="shortcut-flex">
                            <Flex.Item>
                                {/* <div className="shortcut-box"><img src={require('../images/shortcut-btn-trunk.png')} /></div>
                                <span className="shortcut-text">后备箱</span> */}
                                <MyCarBtn active={this.state.trunk ? 1 : 0} text="后备箱" imgURL={this.state.trunk ? imgUrl.trunkActive : imgUrl.trunk} />
                            </Flex.Item>
                            <Flex.Item>
                                {/* <div className="shortcut-box"><img src={require('../images/shortcut-btn-lock.png')} /></div>
                                <span className="shortcut-text">车锁</span> */}
                                <MyCarBtn active={this.state.lock ? 1 : 0} text="车锁" imgURL={this.state.lock ? imgUrl.lockActive : imgUrl.lock} />
                            </Flex.Item>
                            <Flex.Item>
                                {/* <div className="shortcut-box"><img src={require('../images/shortcut-btn-lamp.png')} /></div>
                                <span className="shortcut-text">车灯</span> */}
                                <MyCarBtn active={this.state.lamp ? 1 : 0} text="车灯" imgURL={this.state.lamp ? imgUrl.lampActive : imgUrl.lamp} />
                            </Flex.Item>
                            <Flex.Item>
                                {/* <div className="shortcut-box"><img src={require('../images/shortcut-btn-door.png')} /></div>
                                <span className="shortcut-text">车门</span> */}
                                <MyCarBtn doorAllClassName={doorAllClassName} active={this.state.door ? 1 : 0} text="车门" imgURL={this.state.door ? imgUrl.doorActive : imgUrl.door} />
                            </Flex.Item>
                            <Flex.Item>
                                {/* <div className="shortcut-box"><img src={require('../images/shortcut-btn-switch.png')} /></div>
                                <span className="shortcut-text">空调</span> */}
                                <MyCarBtn active={this.state.AirConditioner ? 1 : 0} text="空调" imgURL={this.state.AirConditioner ? imgUrl.switchActive : imgUrl.switch} />
                            </Flex.Item>
                            {/* <Flex.Item>
                                <MyCarBtn active={this.state.engine ? 1 : 0} text="电机加锁" imgURL={this.state.engine ? imgUrl.engineActive : imgUrl.engine} />
                            </Flex.Item> */}
                        </Flex>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}

PageRemoteMeter.contextTypes = {
    router: React.PropTypes.object
};