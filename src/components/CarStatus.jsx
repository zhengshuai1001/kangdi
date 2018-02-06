import React from 'react';
import { Toast } from 'antd-mobile';
import { runPromise } from '../common/promise';

export default class CarStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendAjax: true,
            carStatus: {},
            queryCarStatus: this.startQueryCarStatus
        }
        //发送完车辆运行数据查询后的处理函数
        this.handleQueryCarStatus = (req) => {
            let res = req.result;
            // console.log(res);
            if (res.code == 1000) {
                let data = res.data;
                //获取车辆运行数据后保存
                this.setState({
                    carStatus: {
                        trunk: data.BcmData.Trunk,  //后备箱
                        lock: data.BcmData.CentralLock, //车锁
                        engine: data.BcmData.BatteryDoor, //电机加锁，现在用不了
                        door: (data.BcmData.LFDoor || data.BcmData.RFDoor || data.BcmData.LRDoor || data.BcmData.RRDoor) ? 1 : 0,  //门,综合属性
                        doorLF: data.BcmData.LFDoor,  //左前门
                        doorRF: data.BcmData.RFDoor,  //右前门
                        doorLR: data.BcmData.LRDoor,  //左后门
                        doorRR: data.BcmData.RRDoor,  //右后门
                        lamp: (data.BcmData.Headlight == 1 || data.BcmData.Headlight == 2 ? 1 :0), //大灯
                        AirConditioner: data.EasData.AirConditioner,  //
                        ac: data.EasData.AC,  //
                        ptc: data.EasData.PTC,  //
                        defrost: !!(data.EasData.WindDirection) ? 1 : 0, //
                        acc: data.KDData.ACC, //
                        soc: data.CarData.SOC, //
                        temperature: 0, //室内温度不知道
                        Mileage: parseInt(data.KDData.ReMileage * 0.1), //
                        ReMileage: parseInt(data.KDData.ReMileage * 0.1), //
                        TotalV: parseInt(data.CarData.TotalV * 0.1), //
                        TotalA: data.CarData.TotalA //本来要显示最低单体电压，现在用总电流代替
                    }
                });
                let pathname = this.props.location.pathname;
                if (pathname != "/MyCar" && pathname != "/remoteMeter" && pathname != "/remoteControl" || !this.state.sendAjax ) {
                    return;
                }
                // console.log(pathname);
                let token = setTimeout(() => {
                    //发送ajax获取车辆运行数据,成功返回后间隔5秒发送一次
                    runPromise("queryCarStatus", {}, this.handleQueryCarStatus, true, true);
                }, 3000);
                this.setState({
                    tokenSetTimeout: token
                });
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        this.handleRefreshWakeup = (req) => {
            let res = req.result;
            if (res.code == 1000) {
                Toast.success("车辆状态已更新", 1);
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }

        }
    }
    getChildContext() {
        return { carStatus: this.state.carStatus }
    }
    componentDidMount() {
        // let a = 0;
        // setInterval(() => {
        //     a++;
        //     this.setState({
        //         bb: a
        //     })
        // }, 1000)
        // console.log("car status componentDidMount");
        // //发送ajax获取车辆运行数据,第一次加载页面就执行一次
        // runPromise("queryCarStatus", {}, this.handleQueryCarStatus,true, true);

        // setInterval(() => {
        //     //发送ajax获取车辆运行数据
        //     runPromise("queryCarStatus", {}, this.handleQueryCarStatus,true, true);
        // }, 5000);
        let then = this;
        api.addEventListener({
            name: 'pause'
        }, function (ret, err) {
            then.setState({
                sendAjax: false
            })
        });
        api.addEventListener({
            name: 'resume'
        }, function (ret, err) {
            then.setState({
                sendAjax: true
            });
            then.startQueryCarStatus();
        });

    }
    startQueryCarStatus = () => {
        clearTimeout(this.state.tokenSetTimeout);
        //发送ajax获取车辆运行数据,子组件通知父组件，开始查询车辆运行数据啦。
        runPromise("queryCarStatus", {}, this.handleQueryCarStatus, true, true);
    }
    //车辆唤醒，查询接口
    refreshWakeup = () =>{
        //发送ajax唤醒车辆。
        runPromise("controlWakeup", {}, this.handleRefreshWakeup, true, true);
    }
    render() {
        return (
            <div className="car-status-box" >
                {this.props.children && React.cloneElement(this.props.children, { carStatus: this.state.carStatus, queryCarStatus: this.state.queryCarStatus, refreshWakeup: this.refreshWakeup})}
            </div>
        )
    }
}

CarStatus.childContextTypes = {
    carStatus: React.PropTypes.object
};