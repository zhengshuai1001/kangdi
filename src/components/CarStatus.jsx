import React from 'react';
import { Toast } from 'antd-mobile';
import { runPromise } from '../common/promise';

export default class CarStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carStatus: {}
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
                        trunk: data.BcmData.Trunk,
                        lock: data.BcmData.CentralLock,
                        engine: data.BcmData.BatteryDoor, //假的
                        door: data.BcmData.LFDoor,  //左前门,先用左前门代替车门
                        doorLF: data.BcmData.LFDoor,  //左前门
                        doorRF: data.BcmData.RFDoor,  //右前门
                        doorLR: data.BcmData.LRDoor,  //左后门
                        doorRR: data.BcmData.RRDoor,  //右后门
                        lamp: data.BcmData.Headlight, //大灯
                        AirConditioner: data.EasData.AirConditioner,
                        ac: data.EasData.AC,
                        ptc: data.EasData.PTC,
                        defrost: data.EasData.WindDirection == 3 ? 1 : 0,
                        acc: data.KDData.ACC,
                        soc: data.CarData.SOC,
                        temperature: 0, //室内温度不知道
                        Mileage: data.KDData.Mileage, 
                        ReMileage: data.KDData.ReMileage, 
                        TotalV: data.CarData.TotalV, 
                        TotalA: data.CarData.TotalA //本来要显示最低单体电压，现在用总电流代替
                    }
                });
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

        //发送ajax获取车辆运行数据,第一次加载页面就执行一次
        runPromise("queryCarStatus", {}, this.handleQueryCarStatus,true, true);

        setInterval(() => {
            //发送ajax获取车辆运行数据
            // runPromise("queryCarStatus", {}, this.handleQueryCarStatus,true, true);
        }, 1000);

    }
    render() {
        return (
            <div className="car-status-box" >
                {this.props.children && React.cloneElement(this.props.children, this.state)}
            </div>
        )
    }
}

CarStatus.childContextTypes = {
    carStatus: React.PropTypes.object
};