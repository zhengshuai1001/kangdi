import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, Flex, NavBar, Icon, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { runPromise } from '../common/promise';

// import Cropper from 'cropperjs';
import PhotoClip from 'photoclip'
/**
 * 先剪裁后上传图片
 * 
 * @author ZhengGuoQing
 * @export
 * @param {any} element   上传input的DOM对象
 * @param {any} width     宽度
 * @param {any} height    高度
 */
function cropperToUpload2 (element, width, height) {
    let self = this;
    FileAPI.event.on(element, 'change', function (evt) {
        let files = FileAPI.getFiles(evt); // Retrieve file list
        FileAPI.filterFiles(files, function (file, info) {
            if (!/^image/.test(file.type)) {
                Toast.fail('请选择正确格式的图片！', 2);
                return false;
            } else if (file.size > 2 * FileAPI.MB) {
                Toast.fail('图片必须小于2M！', 2);
                return false;
            } else if (info.width < width || info.height < height) {
                Toast.fail('图片宽度要大于' + width + '像素，高度要大于' + height + '像素！', 2);
                return false;
            } else {
                return true;
            }
        }, function (files, rejected){
            if (files.length) {
                var file = files[0];
                var img0 = FileAPI.Image(file);
                var img1 = FileAPI.Image(file);
                // console.log("cropperToUpload::", self);
                img0.get(function (err, img) {
                    // img 原图
                    // img1 需要切割的图
                    //跳转到裁切图片页
                    // console.log(img);
                    self.context.router.push({
                        pathname: '/uploadAvatar',
                        state: {
                            img: img,
                            img1: img1,
                            width: width,
                            height: height
                        }
                    });
                });
            }
        });
        FileAPI.reset(evt.currentTarget);
    });
}

class PageUploadAvatar2 extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     img1: {}
        // }
        this.convertCanvasToImage = function (canvas) {
            //新Image对象，可以理解为DOM  
            let image = new Image();
            // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持  
            // 指定格式 PNG  
            image.src = canvas.toDataURL("image/png");
            return image.src;
        }
        //发送上传图片完成后的处理函数
        this.handleUploadAvatar = (req) => {
            let res = req.result;
            // console.log(res);
            if (res.code == 1000) {
                //上传图片成功，退回到个人中心页
                Toast.success("上传头像成功", 1, ()=>{
                    hashHistory.goBack();
                });
            } else {
                Toast.fail(ERRMSG[res.errmsg], 2);
            }
        } 
    }
    // onClickUpload = () => {
    //     //发送ajax上传图片
    //     runPromise("appuserChangeimg", {
    //         "header_img": (this.convertCanvasToImage(this.state.img2)).split("base64,")[1]
    //     }, this.handleUploadAvatar);
    // }
    componentWillMount () {
        this.setState(this.props.location.query);
    }
    componentDidMount2 () {
        let { img, img1, width, height } = this.state;
        // console.log(img1);
        setTimeout(() => {            
            let AvatarBoxDOM = ReactDOM.findDOMNode(this.refs.img2);
            // let AvatarBoxDOM = document.getElementById("img2");
            // AvatarBoxDOM.style.height = document.body.clientHeight - 45 + "px";
            AvatarBoxDOM.innerHTML = "";
            AvatarBoxDOM.appendChild(img);
            let imageCanvas = document.querySelector("#img2 > canvas");
            let self = this;
            let cropper = new Cropper(imageCanvas, {
                aspectRatio: width / height,
                strict: true,
                background: false,
                dragCrop: false,
                viewMode: 1,
                dragMode: 'move',
                cropBoxMovable: false,
                cropBoxResizable: false,
                guides: false,
                crop: function (e) {
                    img1.matrix.sx = e.detail.x;
                    img1.matrix.sy = e.detail.y;
                    img1.matrix.sw = e.detail.width;
                    img1.matrix.sh = e.detail.height;
                    img1.matrix.dw = width;
                    img1.matrix.dh = height;
                    img1.get(function (err, img) {
                        // img 原图
                        // img1 需要切割的图
                        //跳转到裁切图片页
                        // console.log(img);
                        self.setState({
                            img2: img
                        })  
                    });
                }
            });
        }, 0);
    }
    componentDidMount () {
        let self = this;
        let { img } = this.state;
        // setTimeout(() => {
            // let uploadBtn = document.querySelector(".uploadButton");
            let AvatarBoxDOM = ReactDOM.findDOMNode(this.refs.img2);
            // console.log(AvatarBoxDOM);
            // let AvatarBoxDOM = document.getElementById("img2");
            AvatarBoxDOM.style.height = document.body.clientHeight - 45 + "px";
            let pc = new PhotoClip(AvatarBoxDOM,{
                size: [250, 250],
                outputSize: [500, 500],
                style: {
                    maskColor: "rgba(0,0,0,.3)",
                    maskBorder: "1px dashed #ddd"
                }
            });
            pc.load(img);
            this.setState({
                pc:pc
            })
        // }, 0);
    }
    onClickUpload = () => {
        let { pc } = this.state;
        // console.log(pc);
        let dataURL = pc.clip();
        //发送ajax上传图片
        runPromise("appuserChangeimg", {
            "header_img": dataURL.split("base64,")[1]
        }, this.handleUploadAvatar);
    }
    render() {
        return (
            // <QueueAnim
            //     type="right"
            //     duration="500"
            //     ease="easeOutBack"
            // >
                <div key="1" className="page-register page-login">
                    <NavBar
                        style={{ "background-color": "#000" }}
                        mode="light"
                        icon={<Icon type="left" size="lg" style={{ "color": "#fff" }} />}
                        onLeftClick={() => hashHistory.goBack()}
                        rightContent={<Button className="uploadButton" onClick={this.onClickUpload}>使用</Button>}
                    ></NavBar>
                    <div id="img2" ref="img2" className="cropperAvatarBox"></div>
                </div>
            // </QueueAnim>
        )
    }
}
PageUploadAvatar2.contextTypes = {
    router: React.PropTypes.object
};

export { cropperToUpload2, PageUploadAvatar2 };