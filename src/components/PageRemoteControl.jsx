import React from 'react';
import { hashHistory, Link } from 'react-router';
import { NavBar, Icon, Flex, Tabs, Toast, Modal } from 'antd-mobile';
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
//     require('../images/shortcut-btn-window.png'),
//     require('../images/shortcut-btn-horn.png')
// ];
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
    horn0: "11", //关闭双跳
    horn1: "10", //打开双跳
}

const carStatusImg = {
    K12: {
        trunk0: require('../images/K12/k12_main_car_setting_effect_car_houbei_lock.png'),
        trunk1: require('../images/K12/k12_main_car_setting_effect_car_houbei_unlock.png'),
        lock0: require('../images/K12/k12_main_car_setting_effect_car_door_unlock.png'),
        lock1: require('../images/K12/k12_main_car_setting_effect_car_door_lock.png'),
        horn1: require('../images/K12/k12_main_car_setting_effect_alert_light.png'),
        lamp0: require('../images/K12/k12_main_car_setting_effect_far_light.png'),
        lamp1: require('../images/K12/k12_main_car_setting_effect_far_light.png'),
        Window0: require('../images/K12/k12_main_car_setting_left_window_icon_up.png'),
        Window1: require('../images/K12/k12_main_car_setting_right_window_icon_down.png')
    },
    K17: {
        trunk0: require('../images/K17/main_car_setting_effect_car_houbei_lock.png'),
        trunk1: require('../images/K17/main_car_setting_effect_car_houbei_unlock.png'),
        lock0: require('../images/K17/main_car_setting_effect_car_door_unlock.png'),
        lock1: require('../images/K17/main_car_setting_effect_car_door_lock.png'),
        horn1: require('../images/K17/main_car_setting_effect_alert_light.png'),
        lamp0: require('../images/K17/main_car_setting_effect_near_light.png'),
        lamp1: require('../images/K17/main_car_setting_effect_far_light.png'),
        Window0: require('../images/K17/main_car_setting_left_window_icon_up.png'),
        Window1: require('../images/K17/main_car_setting_left_window_icon_down.png')
    }
}

const imgUrl = {
    trunk: require('../images/shortcut-btn-trunk.png'),
    lock: require('../images/shortcut-btn-lock.png'),
    engine: require('../images/shortcut-btn-engine.png'),
    door: require('../images/shortcut-btn-door.png'),
    doorLF: require('../images/shortcut-btn-doorLF.png'),
    doorRF: require('../images/shortcut-btn-doorRF.png'),
    doorLR: require('../images/shortcut-btn-doorLR.png'),
    doorRR: require('../images/shortcut-btn-doorRR.png'),
    doorActive: require('../images/shortcut-btn-door-active.png'),
    doorLFActive: require('../images/shortcut-btn-doorLF-active.png'),
    doorRFActive: require('../images/shortcut-btn-doorRF-active.png'),
    doorLRActive: require('../images/shortcut-btn-doorLR-active.png'),
    doorRRActive: require('../images/shortcut-btn-doorRR-active.png'),
    lamp: require('../images/shortcut-btn-lamp.png'),
    switch: require('../images/shortcut-btn-switch.png'),
    refrigeration: require('../images/shortcut-btn-refrigeration.png'),
    heating: require('../images/shortcut-btn-heating.png'),
    defrost: require('../images/shortcut-btn-defrost.png'),
    meter: require('../images/big-btn-meter.png'),
    code: require('../images/big-btn-code.png'),
    control: require('../images/big-btn-control.png'),
    window: require('../images/shortcut-btn-window.png'),
    openWindow: require('../images/open-window-icon.png'),
    closeWindow: require('../images/close-window-icon.png'),
    horn: require('../images/shortcut-btn-horn.png'),
    rideIcon: require('../images/ride-icon.png'),
    icon: require('../images/switch-key-icon.png'),
    trunkActive: require('../images/shortcut-btn-trunk-active.png'), //以下是活动状态的图标
    lockActive: require('../images/shortcut-btn-lock-active.png'),
    engineActive: require('../images/shortcut-btn-engine-active.png'),
    // doorActive: require('../images/shortcut-btn-door-active.png'),
    lampActive: require('../images/shortcut-btn-lamp-active.png'),
    switchActive: require('../images/shortcut-btn-switch-active.png'),
    refrigerationActive: require('../images/shortcut-btn-refrigeration-active.png'),
    heatingActive: require('../images/shortcut-btn-heating-active.png'),
    defrostActive: require('../images/shortcut-btn-defrost-active.png'),
    btnBgBlack: require('../images/btn-bg-black.png'),
    btnBgRed: require('../images/btn-bg-red.png'),
}
// const tabs = [
//     { title: <div className="tabs-one"><img src={imgUrl[0]} /><span>后备箱</span></div> },
//     { title: <div className="tabs-one"><img src={imgUrl[1]} /><span>车锁</span></div> },
//     { title: <div className="tabs-one"><img src={imgUrl[2]} /><span>电机加锁</span></div> },
//     { title: <div className="tabs-one"><img src={imgUrl[3]} /><span>车门</span></div> },
//     { title: <div className="tabs-one"><img src={imgUrl[4]} /><span>车灯</span></div> },
//     { title: <div className="tabs-one"><img src={imgUrl[5]} /><span>空调</span></div> },
//     { title: <div className="tabs-one"><img src={imgUrl[6]} /><span>AC</span></div> },
//     { title: <div className="tabs-one"><img src={imgUrl[7]} /><span>PTC</span></div> },
//     { title: <div className="tabs-one"><img src={imgUrl[8]} /><span>除雾除霜</span></div> }
// ];

const ShortcutBtn = (props) => (
    <div className="shortcut-btn-box">
        <div 
            onTouchStart={() => { props.onActive(props.state) }}
            className="shortcut-btn-img-box"
        >
            <img src={props.imgURL} />
        </div>
        <span>{props.text}</span>
    </div>    
)
//单独的空调按钮
const ShortAirBtn = (props) => (
    <span 
        onTouchStart={() => { props.onActive(props.state) }}
        className={props.active ? "temperature-img-box active" : "temperature-img-box"}
    >
        <img src={props.imgURL} />
    </span>
)

export default class PageRemoteControl extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            trunk: 0, //后备箱
            lock: 0,  //车锁
            engine: 0, //电机加锁
            door: 0, //车门
            lamp: 0, //车灯
            window: 0, //车窗
            horn: 0, //闪灯鸣笛
            AirConditioner: 0, //空调
            ac: 0, // AC降温
            ptc: 0, // PTC加热
            defrost: 0, // 除雾除霜
            acc: 0, // 自适应巡航
            soc: 0, //电量
            temperature: 0, //室内温度
            onClickTabName: "", //点击tab的state名字
            car_tail: localStorage.getItem("car_tail") || "", //车辆型号
            enabledList: { // 存储按钮是否可点击的状态，按钮在点击后必须隔5秒才能再次点击
                trunk: true, 
                lock: true,  
                horn: true,
                lamp:true,
                plusEngine: true,
                reduceEngine: true,
                openWindow: true,
                closeWindow: true,
                AirConditioner: true,
                ac: true,
                ptc: true,
                defrost: true
            },
            initialPage: 0,
            carStatusImgURL: "", //汽车状态改变图片闪烁的URL
            carStatusImgShow: false, //汽车状态改变图片闪烁是否显示
            carStatusImgClassName: "car-status-img" //汽车状态改变图片闪烁的className

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
                    door: data.BcmData.LFDoor,  //门,用左前门代替
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
                    temperature: 0, //室内温度不知道
                    showWindow: true //显示窗户的弹窗
                });
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        //发送完车身控制后的处理函数
        this.handleControlCar = (req) => {
            let res = req.result;
            // console.log(res);
            if (res.code == 1000) {
                let data = res.data;
                //将相应的state取反操作
                // this.setState({
                //     [this.state.onClickTabName]: this.state[this.state.onClickTabName] == 1 ? 0 : 1
                // });
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        //康迪改，发送完车身控制后的处理函数，弹窗提示一秒后，车型图片闪烁相应的状态改变
        this.handleControlCarMore = (req, handleParam) => {
            let res = req.result;
            // console.log(res);
            if (res.code == 1000) {
                if (handleParam == "trunkStepTwo") {
                    Toast.success("请注意，车辆已解防", 2, () => { this.changeCarImgStatus("trunk1") });
                    return;
                }
                if (handleParam) {
                    Toast.success("指令下达成功", 1, () => { this.changeCarImgStatus(handleParam) });
                }
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        //发送完车身控制的单个开关后的处理函数，展示没有处理，因为不能展示状态
        this.handleControlCarOne = (req, handleParam) => {
            let res = req.result;
            // console.log(res);
            if (res.code == 1000) {
                if (handleParam) {
                    // Toast.success(handleParam, 1);
                    Toast.success("指令下达成功", 1);
                }
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        //发送完车身控制的空调部分的处理函数
        this.handleControlCarAir = (req) => {
            console.log("handleControlCarAir");
            let res = req.result;
            // console.log(res);
            if (res.code == 1000) {
                let data = res.data;
                Toast.success("指令下达成功", 1);
                //将相应的state取反操作
                // this.setState({
                //     [this.state.onClickTabName]: this.state[this.state.onClickTabName] == 1 ? 0 : 1
                // });

                //空调操作后做的应该是重新获取空调的数据。
                //发送ajax获取车辆运行数据
                // runPromise("queryCarStatus", {}, this.handleQueryCarStatus,true, true);
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        //发送完车身控制的空调部分的处理函数,按康迪的要求修改
        this.handleControlCarAir2 = (req, handleParam) => {
            console.log("handleControlCarAir2");
            let res = req.result;
            // console.log(res);
            if (res.code == 1000) {
                let data = res.data;
                //将相应的state取反操作
                // this.setState({
                //     [this.state.onClickTabName]: this.state[this.state.onClickTabName] == 1 ? 0 : 1
                // });

                //空调操作后做的应该是重新获取空调的数据。
                //发送ajax获取车辆运行数据
                // runPromise("queryCarStatus", {}, this.handleQueryCarStatus,true, true);
                if (handleParam != "ptc") {
                    this.onActiveAir(handleParam, false); //加false,是不想出发操作太频繁的动作
                } else {
                    //发送空调，打开温度设置成26
                    runPromise("controlAc", {
                        contrlpara: { "part": "15", "para": "26" }
                    }, this.handleControlCarAir2PTC, true, true, handleParam);
                }
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        this.handleControlCarAir2PTC = (req, handleParam) => {
            let res = req.result;
            if (res.code == 1000) {
                let data = res.data;
                this.onActiveAir(handleParam, false); //加false,是不想出发操作太频繁的动作
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        //打开后备箱，按康迪的改
        this.handleControlCarTrunk = (req, handleParam) => {
            let res = req.result;
            // console.log(res);
            if (res.code == 1000) {
                this.onActive("trunkStepTwo", false); //加false,是不想出发操作太频繁的动作
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
    }
    //点击按钮下达指令一秒后，修改汽车图片，显示一个闪烁的图片，显示一秒后消失
    changeCarImgStatus(handleParam) {
        let car_tail = !!~(this.state.car_tail.indexOf("K17A"))  ? "K17" : "K12" ;
        let carStatusImgURL = carStatusImg[car_tail][handleParam];
        let carStatusImgClassName = `car-status-img ${handleParam}`;
        let carStatusImgShow = true;
        let num = 0;

        this.setState({
            carStatusImgURL: carStatusImgURL,
            carStatusImgShow: carStatusImgShow,
            carStatusImgClassName: carStatusImgClassName
        })

        let token = setInterval(() => {
            this.setState({
                carStatusImgURL: carStatusImgURL,
                carStatusImgShow: carStatusImgShow,
                carStatusImgClassName: carStatusImgClassName
            })
            num++;
            carStatusImgShow = !carStatusImgShow;
            if (num > 5) {
                clearInterval(token);
            }
        },150)
    }
    onActive = (state, handleControlCarAir2 = true ) => {
        //康迪测试修改，如果用户点击的是第一页的按钮，中间的状态栏跳到第一页（页面下部的按钮只有调到首页，没有跳到第二页）
        if (state == "trunk" || state == "lock" || state == "lamp" || state == "trunkStepTwo") {
            this.setState({ initialPage: 0 });
        }
        this.setState({ onClickTabName: state });
        if (!this.state.enabledList[state]) {
            if (handleControlCarAir2) {
                Toast.offline("操作太频繁", 1);
                return;
            } 
        } else {
            let enabledListMixin = this.state.enabledList;

            Object.assign(enabledListMixin, { [state]: false });
            this.setState({
                enabledList: enabledListMixin
            })

            let token = setTimeout(() => {
                Object.assign(enabledListMixin, { [state]: true });
                this.setState({
                    enabledList: enabledListMixin
                })
                clearTimeout(token);
            }, 3000);
        }
        //打开后备箱要先解防
        if (state == "trunk" && this.state[state] == "0" ) {
            let suffix = this.state[state] == 1 ? "0" : "1";
            let param = state + suffix;
            //发送ajax设置车身控制
            runPromise("controlCar", {
                contrlpara: { "part": "26", "para": "" }
            }, this.handleControlCarTrunk, true, true, transformParam[param]);
            return ;
        }
        if (state == "trunkStepTwo") {
            //发送ajax设置车身控制
            runPromise("controlCar", {
                contrlpara: { "part": "17", "para": "" }
            }, this.handleControlCarMore, true, true, "trunkStepTwo");
            return;
        }
        if (state == "trunk" || state == "lock" || state == "lamp") {
            let suffix = this.state[state] == 1 ? "0" : "1";
            let param = state + suffix;
            //发送ajax设置车身控制
            runPromise("controlCar", {
                contrlpara: { "part": transformParam[param], "para": "" }
            }, this.handleControlCarMore, true, true, param);
            return;
        }
        if (state != "horn" &&state != "plusEngine" && state != "reduceEngine" && state != "openWindow" && state != "closeWindow") {
            let suffix = this.state[state] == 1 ? "0" : "1";
            let param = state + suffix;
            //发送ajax设置车身控制
            runPromise("controlCar", {
                contrlpara: { "part": transformParam[param], "para": "" }
            }, this.handleControlCar, true, true);
        }
        //闪灯鸣笛
        if (state == "horn") {
            //发送ajax设置车身控制 ,鸣笛
            runPromise("controlCar", {
                contrlpara: { "part": "9", "para": "" }
            }, this.handleControlCarMore, true, true, "horn1");
            //发送ajax设置车身控制 ,闪灯
            runPromise("controlCar", {
                contrlpara: { "part": "10", "para": "" }
            }, this.handleControlCarOne, true, true);
            //3秒后发送ajax设置车身控制 ,关闭闪光
            let token = setTimeout(() => {
                runPromise("controlCar", {
                    contrlpara: { "part": "11", "para": "" }
                }, this.handleControlCarOne, true, true);
                clearTimeout(token);
            }, 3000);
        }
        //电机加锁
        if (state == "plusEngine") {
            //发送ajax设置车身控制 ,电机加锁
            runPromise("controlCar", {
                contrlpara: { "part": "23", "para": "" }
            }, this.handleControlCarOne, true, true, "电机加锁成功");
        }
        //电机解锁
        if (state == "reduceEngine") {
            //发送ajax设置车身控制 ,电机解锁
            runPromise("controlCar", {
                contrlpara: { "part": "24", "para": "" }
            }, this.handleControlCarOne, true, true, "电机解锁成功");
        }
        //开窗
        if (state == "openWindow") {
            //发送ajax设置车身控制 ,开窗
            runPromise("controlCar", {
                contrlpara: { "part": "3", "para": "" }
            }, this.handleControlCarMore, true, true, "Window1");
        }
        //关窗
        if (state == "closeWindow") {
            //发送ajax设置车身控制 ,关窗
            runPromise("controlCar", {
                contrlpara: { "part": "4", "para": "" }
            }, this.handleControlCarMore, true, true, "Window0");
        }
    }
    onActiveAir = (state, handleControlCarAir2 = true ) => {
        //康迪测试修改
        if (state == "ac" || state == "ptc" || state == "defrost" || state == "AirConditioner") {
            this.setState({ initialPage: 7 });
        }
        this.setState({ onClickTabName: state });
        if (!this.state.enabledList[state]) {
            if (handleControlCarAir2) {
                Toast.offline("操作太频繁", 1);
                return;
            } 
        } else {
            let enabledListMixin = this.state.enabledList;

            Object.assign(enabledListMixin, { [state]: false });
            this.setState({
                enabledList: enabledListMixin
            })

            let token = setTimeout(() => {
                Object.assign(enabledListMixin, { [state]: true });
                this.setState({
                    enabledList: enabledListMixin
                })
                clearTimeout(token);
            }, 3000);
        }
        let suffix = this.state[state] == 1 ? "0" : "1";
        let param = state + suffix;
        //发送ajax设置车身控制 ,空调
        runPromise("controlAc", {
            contrlpara: { "part": transformParam[param], "para": "" }
        }, this.handleControlCarAir, true, true);

    }
    onActiveAir2 = (state) => {
        //康迪测试修改
        if (state == "ac" || state == "ptc" || state == "defrost" || state == "AirConditioner") {
            this.setState({ initialPage: 7 });
        }
        this.setState({ onClickTabName: state });
        if (!this.state.enabledList[state]) {
            Toast.offline("操作太频繁", 1);
            return;
        } else {
            let enabledListMixin = this.state.enabledList;

            Object.assign(enabledListMixin, { [state]: false });
            this.setState({
                enabledList: enabledListMixin
            })

            let token = setTimeout(() => {
                Object.assign(enabledListMixin, { [state]: true });
                this.setState({
                    enabledList: enabledListMixin
                })
                clearTimeout(token);
            }, 3000);
        }
        let suffix = this.state[state] == 1 ? "0" : "1";
        let param = state + suffix;
        //先打开空调
        if (state == "AirConditioner" || this.state[state] == 1) {
            //发送ajax设置车身控制 ,空调
            runPromise("controlAc", {
                contrlpara: { "part": transformParam[param], "para": "" }
            }, this.handleControlCarAir, true, true);
        } else {
            runPromise("controlAc", {
                contrlpara: { "part": "1", "para": "" }
            }, this.handleControlCarAir2, true, true, state);
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.carStatus)
    }
    componentDidMount() {
        //发送ajax获取车辆运行数据
        // runPromise("queryCarStatus", {}, this.handleQueryCarStatus, true, true);
        //重新向后端获取车辆运行数据
        this.props.queryCarStatus();
    }
    onClickTab = (tab, index) => {
        let state = tab.title.props.state;
        if (state == "door") {
            // Toast.offline('不能操作车门', 1);
            return ;
        }
        this.setState({ onClickTabName: state });
        let suffix = this.state[state] == 1 ? "0" : "1";
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
    //开始开关窗的操作，即用户刚开始点击窗户的操作，先判断是开窗还是关窗
    handleStartWindow(val) {
        let param = val == "close" ? 4 : 3;
        //发送ajax设置车身控制 ,控制开关窗
        runPromise("controlCar", {
            contrlpara: { "part": param, "para": "" }
        }, this.handleControlCarWindow, true, true);
    }
    render() {
        const doorAllClassName = `tabs-one ${this.state.door ? "active" : ""} door ${this.state.doorLF ? "lf" : ""} ${this.state.doorRF ? "rf" : ""} ${this.state.doorLR ? "lr" : ""} ${this.state.doorRR ? "rr" : ""}`;
        const tabs = [
            { title: <div onTouchEnd={() => { this.setState({initialPage: 0}) }} state="trunk" className={this.state.trunk ? "tabs-one active" : "tabs-one"}><img src={this.state.trunk ? imgUrl.trunkActive : imgUrl.trunk} /><span>后备箱</span></div> },
            { title: <div onTouchEnd={() => { this.setState({ initialPage: 0 }) }} state="lock" className={this.state.lock ? "tabs-one active" : "tabs-one"}><img src={this.state.lock ? imgUrl.lockActive : imgUrl.lock} /><span>车锁</span></div> },
            // { title: <div state="engine" className={this.state.engine ? "tabs-one active" : "tabs-one"}><img src={this.state.engine ? imgUrl.engineActive : imgUrl.engine} /><span>电机加锁</span></div> },
            // { title: <div state="door" className={doorAllClassName}><img className="bg" src={imgUrl.door} /><img className="lf" src={imgUrl.doorLF} /><img className="rf" src={imgUrl.doorRF} /><img className="lr" src={imgUrl.doorLR} /><img className="rr" src={imgUrl.doorRR} /><span>车门</span></div> },
            { title: <div onTouchEnd={() => { this.setState({ initialPage: 0 }) }} state="door" className={doorAllClassName}><img className="bg" src={!this.state.door ? imgUrl.door : imgUrl.doorActive} /><img className="lf" src={!this.state.door ? imgUrl.doorLF : imgUrl.doorLFActive} /><img className="rf" src={!this.state.door ? imgUrl.doorRF : imgUrl.doorRFActive} /><img className="lr" src={!this.state.door ? imgUrl.doorLR : imgUrl.doorLRActive} /><img className="rr" src={!this.state.door ? imgUrl.doorRR : imgUrl.doorRRActive} /><span>车门</span></div> },
            { title: <div onTouchEnd={() => { this.setState({ initialPage: 0 }) }} state="lamp" className={this.state.lamp ? "tabs-one active" : "tabs-one"}><img src={this.state.lamp ? imgUrl.lampActive : imgUrl.lamp} /><span>车灯</span></div> },
            { title: <div onTouchEnd={() => { this.setState({ initialPage: 7 }) }} state="AirConditioner" className={this.state.AirConditioner ? "tabs-one active" : "tabs-one"}><img src={this.state.AirConditioner ? imgUrl.switchActive : imgUrl.switch} /><span>空调</span></div> },
            { title: <div onTouchEnd={() => { this.setState({ initialPage: 7 }) }} state="ac" className={this.state.ac ? "tabs-one active" : "tabs-one"}><img src={this.state.ac ? imgUrl.refrigerationActive : imgUrl.refrigeration} /><span>AC</span></div> },
            { title: <div onTouchEnd={() => { this.setState({ initialPage: 7 }) }} state="ptc" className={this.state.ptc ? "tabs-one active" : "tabs-one"}><img src={this.state.ptc ? imgUrl.heatingActive : imgUrl.heating} /><span>PTC</span></div> },
            { title: <div onTouchEnd={() => { this.setState({ initialPage: 7 }) }} state="defrost" className={this.state.defrost ? "tabs-one active" : "tabs-one"}><img src={this.state.defrost ? imgUrl.defrostActive : imgUrl.defrost} /><span>除雾除霜</span></div> }
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
                        {/* <Flex>
                            <Flex.Item className="temperature-flex-item"><span style={{"display":"none"}} className="temperature">{this.state.temperature}℃</span></Flex.Item>
                            <Flex.Item><ShortAirBtn active={this.state.ac ? 1 : 0} state="ac" imgURL={this.state.ac ? imgUrl.refrigerationActive : imgUrl.refrigeration} onActive={this.onActiveAir} /></Flex.Item>
                            <Flex.Item><ShortAirBtn active={this.state.ptc ? 1 : 0} state="ptc" imgURL={this.state.ptc ? imgUrl.heatingActive : imgUrl.heating} onActive={this.onActiveAir} /></Flex.Item>
                            <Flex.Item><ShortAirBtn active={this.state.defrost ? 1 : 0} state="defrost" imgURL={this.state.defrost ? imgUrl.defrostActive : imgUrl.defrost} onActive={this.onActiveAir} /></Flex.Item>
                            <Flex.Item><ShortAirBtn active={this.state.AirConditioner ? 1 : 0} state="AirConditioner" imgURL={this.state.AirConditioner ? imgUrl.switchActive : imgUrl.switch} onActive={this.onActiveAir} /></Flex.Item>
                        </Flex> */}
                        <Flex>
                            <Flex.Item><ShortcutBtn state="ac" text="AC" imgURL={imgUrl.refrigeration} onActive={this.onActiveAir2} /></Flex.Item>
                            <Flex.Item><ShortcutBtn state="ptc" text="PTC" imgURL={imgUrl.heating} onActive={this.onActiveAir2} /></Flex.Item>
                            <Flex.Item><ShortcutBtn state="defrost" text="除雾除霜" imgURL={imgUrl.defrost} onActive={this.onActiveAir2} /></Flex.Item>
                            <Flex.Item><ShortcutBtn state="AirConditioner" text="空调" imgURL={imgUrl.switch} onActive={this.onActiveAir} /></Flex.Item>
                        </Flex>
                    </div>
                    <div className={!!~(this.state.car_tail.indexOf("K17A")) ? "my-car-img-box K17A" : "my-car-img-box"}>
                        <img 
                            style={{"display": this.state.carStatusImgShow ? "block" : "none" }}
                            className={this.state.carStatusImgClassName} 
                            src={this.state.carStatusImgURL}
                        />
                        <span className="car-no-span">{localStorage.getItem("car_no") ? localStorage.getItem("car_no") : ""}</span>
                    </div>
                    <div className="my-car-click-mask-out">
                        <Tabs
                            prefixCls="my-car-tabs"
                            tabBarBackgroundColor="transparent"
                            tabBarUnderlineStyle={{"display":"none"}}
                            tabs={tabs}
                            page={this.state.initialPage}
                            swipeable={false}
                            // onChange={(tab, index) => { console.log('onChange', index); }}
                            onTabClick={this.onClickTab}
                            // onTabClick={(tab, index) => { console.log('onTabClick', index); }}
                        >
                        </Tabs>
                        {/* 按康迪测试的要求更改 */}
                        <div className="my-car-click-mask">
                            <span onTouchStart={() => { this.setState({ initialPage: 0 }) }} className="left"></span>
                            <span onTouchStart={() => { this.setState({ initialPage: 7 }) }} className="right"></span>
                        </div>
                    </div>
                    <div className="page-login-WingBlank-diy" size="lg" style={{ "padding":"3rem 1rem 0" }}>
                        <Flex>
                            <Flex.Item><ShortcutBtn state="trunk" text="后备箱" imgURL={imgUrl.trunk} onActive={this.onActive}  /></Flex.Item>
                            <Flex.Item><ShortcutBtn state="lock" text="车锁" imgURL={imgUrl.lock} onActive={this.onActive}  /></Flex.Item>  
                            <Flex.Item><ShortcutBtn state="horn" text="闪灯鸣笛" imgURL={imgUrl.horn} onActive={this.onActive} /></Flex.Item>
                            <Flex.Item><ShortcutBtn state="lamp" text="车灯" imgURL={imgUrl.lamp} onActive={this.onActive} /></Flex.Item>                          
                        </Flex>
                        <Flex>
                            <Flex.Item><ShortcutBtn state="plusEngine" text="电机加锁" imgURL={imgUrl.engine} onActive={this.onActive} /></Flex.Item>
                            <Flex.Item><ShortcutBtn state="reduceEngine" text="电机解锁" imgURL={imgUrl.engine} onActive={this.onActive}  /></Flex.Item>
                            <Flex.Item><ShortcutBtn state="openWindow" text="开窗" imgURL={imgUrl.openWindow} onActive={this.onActive} /></Flex.Item>
                            <Flex.Item><ShortcutBtn state="closeWindow" text="关窗" imgURL={imgUrl.closeWindow} onActive={this.onActive}  /></Flex.Item> 
                        </Flex>
                    </div>
                    {/* <Modal
                        className="successModalPopUp"
                        visible={this.state.showWindow}
                        maskClosable={false}
                        transparent
                    >
                        <div className="window-popUp-box">
                            <div className="top-icon-box">
                                <div onTouchStart={() => { this.handleStartWindow("close") }} ><img src={imgUrl.openWindow}/><span>升</span></div>
                                <div onTouchStart={() => { this.handleStartWindow("open") }} ><img src={imgUrl.closeWindow}/><span>降</span></div>
                            </div>
                            <img src={imgUrl.rideIcon} className="bottom-close"/>
                        </div>
                    </Modal> */}
                </div>
            </QueueAnim>
        )
    }
}

PageRemoteControl.contextTypes = {
    router: React.PropTypes.object
};