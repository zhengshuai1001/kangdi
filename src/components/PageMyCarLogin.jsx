import React from 'react';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, Flex, NavBar, Toast } from 'antd-mobile';
import { runPromise } from '../common/promise';

const DropDownList = (props) => (
    <ul
        className="drop-down-list-box"
        style={{ "display": props.show ? "block" : "none" }}
    >
        {   
            props.list.map((val,index) => { 
                return (
                    <li
                        onTouchStart={() => { props.onActive(index) }}
                    >{val}</li> 
                )
            } ) 
        }
    </ul>
)

export default class PageMyCarLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carType: '',
            frameCode: '',
            controlCode: localStorage.getItem("controlCode") || "",
            rememberControlCode: false,
            showControlCode: true,
            data:[],
            data_car_model_list: [],
            data_car_model_selected:"",
            data_vincode_list: [],
            data_vincode_selected: "",
            car_no:"",
            show_car_model_list: false,
            show_vincode_list: false,
            focusScrollInput: false, //判断页面下半部分的输入框是否focus，如果是，页面要大变。

        }
        //发送完后车辆查询后的处理函数
        this.handleChangePassword = (req) => {
            let res = req.result;
            if (res.code == 1000) {
                //获取车辆信息后保存
                this.setState({ 
                    data: res.data,
                    data_car_model_list: this.getCarModelList(res.data)
                });
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
        //点击下一步，车主登录后的处理函数
        this.handleMyCarLogin = (req) => {
            let res = req.result;
            // console.log(res);
            if (res.code == 1000) {
                //跳转到首页,MyCar
                hashHistory.push({
                    pathname: '/MyCar'
                }); 
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        }
    }
    handleRememberControlCode = () => {
        this.setState({
            rememberControlCode: !this.state.rememberControlCode
        });
        if (this.state.rememberControlCode) {
            this.refs.checkMarkImg.style.visibility = "hidden";
        } else {
            this.refs.checkMarkImg.style.visibility = "visible";
        }
    }
    componentDidMount() {
        //发送ajax获取车辆信息
        runPromise("carOwner", {}, this.handleChangePassword); 
        Toast.hide();
    }
    //处理得到的车辆信息对象数组，提取出车型的数组
    getCarModelList(data) {
        let carModelList = new Set();
        data.map((value) => {
            // carModelList.add(value.car_model);
            //康迪测试更改
            carModelList.add(value.car_tail);
            
        });
        return Array.from(carModelList);
    }
    //处理得到的车型，提取出该车型下的vincode数组
    getVincodeList(data) {
        let res = this.state.data; 
        let vincodeList = [];
        res.map((value) => {
            // value.car_model == data ? vincodeList.push(value.vincode) : ""
            //康迪测试更改
            value.car_tail == data ? vincodeList.push(value.vincode) : ""
        });
        return vincodeList;
    }
    //点击下拉列表的某一列
    onActiveCarModel = (index) => {
        let car_model = this.state.data_car_model_list[index];
        // console.log(car_model)
        this.setState({
            data_car_model_selected: car_model,
            data_vincode_list: this.getVincodeList(car_model),
            show_car_model_list: false
        });
    }
    //点击下拉列表的某一列
    onActiveVincode = (index) => {
        let vincode = this.state.data_vincode_list[index];
        let car_no = "";
        let car_tail = "";
        let data = this.state.data;
        data.map((value) => {
            value.vincode == vincode ? car_no = value.car_no : "";
            value.vincode == vincode ? car_tail = value.car_tail : "";
        });
        this.setState({ 
            data_vincode_selected: vincode,
            car_no: car_no,
            car_tail: car_tail,
            show_vincode_list: false 
        });
    }
    test_car_model_selected(val) {
        let value = val.replace(" ", "");
        if (!(/^.{1,20}$/.test(value))) {
            Toast.info("请选择车型", 1);
            return false;
        } else {
            return true;
        }
    }
    test_vincode_selected(val) {
        let value = val.replace(" ", "");
        if (!(/^.{1,20}$/.test(value))) {
            Toast.info("请选择车架码", 1);
            return false;
        } else {
            return true;
        }
    }
    test_controlCode(val) {
        let value = val.replace(" ", "");
        if (!(/^.{6}$/.test(value))) {
            Toast.info("请输入正确车辆控制码", 1);
            return false;
        } else {
            return true;
        }
    }
    onClickNext = () => {
        let { data_car_model_selected, data_vincode_selected, car_no, car_tail, controlCode } = this.state;
        if (this.test_car_model_selected(data_car_model_selected) && this.test_vincode_selected(data_vincode_selected) && this.test_controlCode(controlCode)) {
            if (this.state.rememberControlCode) {
                localStorage.setItem("controlCode", controlCode);
            } else {
                localStorage.removeItem("controlCode");
            }
            localStorage.setItem("vincode", data_vincode_selected);
            localStorage.setItem("car_no", car_no); //保存车牌号码
            localStorage.setItem("car_tail", car_tail); //保存车辆型号
            // hashHistory.push({
            //     pathname: '/MyCar',
            //     state: this.state
            // });    
            //发送ajax,车主登录
            runPromise("accountLogin", {
                "psd": this.state.controlCode,
                "vincode": data_vincode_selected,
                "logintype": 2
            }, this.handleMyCarLogin, true);     
        }
    }
    handleClickModel() {
        if (this.state.data_car_model_list.length > 0) {
            this.setState({ show_car_model_list: !this.state.show_car_model_list });
        } else {
            Toast.info("该账号未绑定车辆", 1)
        }
    }
    clickControl = () => {
        hashHistory.push({
            pathname: '/useHelpDetail',
            query: { form: 'pageMyCarLogin' },
            state:{
                name: "车辆控制码",
                doc_url: ""
            }
        });
    }
    onClickInputEye = (state) => {
        this.setState({ [state]: !this.state[state] })
        // this.refs[state].focus();
        let oldPassword = this.state.controlCode;
        this.setState({ controlCode: '' }, () => {
            this.refs[state].focus();
            this.setState({ controlCode: oldPassword })
        });
        Toast.hide();
    }
    focusScrollInput = () => {
        this.setState({ focusScrollInput: true});

        let token = setTimeout(() => {
            if (window.innerHeight < 470) { }
            document.body.style.overflow = "hidden";
            document.body.style.height = window.innerHeight + "px";

            document.documentElement.style.overflow = "hidden";
            document.documentElement.style.height = window.innerHeight + "px";

            document.getElementById("example").style.overflow = "hidden";
            document.getElementById("example").style.height = window.innerHeight + "px";

            document.querySelector(".scrollIntoViewDOM").scrollIntoView(false);
            
            clearTimeout(token);
        }, 500);
    }
    setHeightAuto = () => {
        this.setState({ focusScrollInput: false });

        document.body.style.overflow = "auto";
        document.body.style.height = "100%";

        document.documentElement.style.overflow = "auto";
        document.documentElement.style.height = "100%";

        document.getElementById("example").style.overflow = "auto";
        document.getElementById("example").style.height = "100%";
    }
    handleTouchPage = () => {
        if (this.state.focusScrollInput) {
            // this.refs["showControlCode"].blur();
            document.querySelector(".scrollIntoViewDOM input").blur();
        }
    }
    render() {
        return (
            <div key="1" className="page-login"
                onTouchStart={this.handleTouchPage}
            >
                <NavBar
                    className="fixed-NavBar"
                    style={{ "background-color": "#000" }}
                    mode="light"
                >我的车辆</NavBar>
                <div className="backgroud-fixed-NavBar"></div>
                <div className="page-login-bg-div" style={{"height":"15rem"}}>
                    <img style={{ "padding-top": "10%" }} className="page-login-bg-img" src={require('../images/backgroundLogin.png')} />
                </div>
                <WingBlank className="page-login-WingBlank" size="lg">
                    <InputItem
                        type="string"
                        placeholder="请选择车型"
                        maxLength="20"
                        editable={false}
                        value={this.state.data_car_model_selected}
                        onChange={(val) => { this.setState({ data_car_model_selected: val }) }}
                        onClick={() => { this.handleClickModel() }}
                        onBlur={() => { this.setState({ show_car_model_list: false })}}
                        extra={<div className="triangle-down-icon"></div>}
                        onExtraClick={() => { this.handleClickModel() }}
                    >
                        <img className="page-login-account-img" src={require('../images/page-myCar-arrow.png')} />
                    </InputItem>
                    <DropDownList show={this.state.show_car_model_list} list={this.state.data_car_model_list} onActive={this.onActiveCarModel}/>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        type="string"
                        placeholder="请选择车架码"
                        maxLength="20"
                        editable={false}
                        value={this.state.data_vincode_selected}
                        onChange={(val) => { this.setState({ data_vincode_selected: val }) }}
                        onClick={() => { this.state.data_vincode_list.length > 0 ? this.setState({ show_vincode_list: !this.state.show_vincode_list }) : Toast.info("请先选择车型", 1) }}
                        onBlur={() => { this.setState({ show_vincode_list: false }) }}
                        extra={<div className="triangle-down-icon"></div>}
                        onExtraClick={() => { this.state.data_vincode_list.length > 0 ? this.setState({ show_vincode_list: !this.state.show_vincode_list }) : Toast.info("请先选择车型", 1) }}
                    >
                        <img className="page-login-password-img" src={require('../images/page-myCar-car.png')} />
                    </InputItem>
                    <DropDownList show={this.state.show_vincode_list} list={this.state.data_vincode_list} onActive={this.onActiveVincode} />
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <InputItem
                        ref="showControlCode"
                        type={this.state.showControlCode ? "tel" : "password"}
                        pattern="[0-9]*"
                        placeholder="请输入车辆控制码"
                        maxLength="6"
                        value={this.state.controlCode}
                        onChange={(val) => { val = val.trim(); isNaN(val) ? "" : this.setState({ controlCode: val }) }}
                        onBlur={(val) => { this.test_controlCode(val), this.setHeightAuto() }}
                        // extra={<img className="password-visible-icon" src={require('../images/password-visible-icon.png')} />}
                        // onExtraClick={() => { this.setState({ showControlCode: !this.state.showControlCode }) }}
                        extra={<img onClick={() => { this.onClickInputEye("showControlCode") }} className="password-visible-icon" src={require('../images/password-visible-icon.png')} />}                        
                        onFocus={this.focusScrollInput}
                        className="scrollIntoViewDOM"
                    >
                        <img style={{"width":"26px"}} className="page-login-password-img" src={require('../images/page-myCar-lock.png')} />
                    </InputItem>
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <Flex style={{ "margin-top": "0rem" }}>
                        <Flex.Item onClick={this.handleRememberControlCode} style={{ "textAlign": "left", "paddingLeft": "1rem", "color": "#b3aeae", "font-size": "1.4rem", "visibility":"hidden" }}><span className="check-mark-span"><img style={{ "visibility": "hidden"}} ref="checkMarkImg" src={require('../images/check-mark-icon.png')}/></span>记住车辆控制码</Flex.Item>
                        <Flex.Item style={{ "textAlign": "right", "paddingRight": "0rem" }}><Link style={{ "color": "#b3aeae" }} to={{ pathname: "/forgetPassword", query: { form: 'myCarLogin' } }}>忘记控制码？</Link></Flex.Item>
                    </Flex>  
                    <WhiteSpace className="page-login-WhiteSpace" size="xs" />
                    <Button onClick={this.onClickNext} className="page-login-bottom">下一步</Button>
                    <p className="what-is-control-code" onClick={this.clickControl} >什么是车辆控制码？</p>
                </WingBlank>
            </div>
        )
    }
}

PageMyCarLogin.contextTypes = {
    router: React.PropTypes.object
};