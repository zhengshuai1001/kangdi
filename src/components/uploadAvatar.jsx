import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, Flex, NavBar, Icon, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { runPromise } from '../common/promise';

import Cropper from 'cropperjs';
/**
 * 先剪裁后上传图片
 * 
 * @author ZhengGuoQing
 * @export
 * @param {any} element   上传input的DOM对象
 * @param {any} width     宽度
 * @param {any} height    高度
 */
function cropperToUpload (element, width, height) {
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

class PageUploadAvatar extends React.Component {
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
            console.log(res);
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
    onClickUpload = () => {
        //这里写上传图片的代码   
        // FileAPI.upload({
        //     url: 'http://kd.hetaoyun.com/api/appuser/changeimg',
        //     headers: { 'Content-Type': 'application/json' },
        //     data: {
        //         "timestamp": Date.parse(new Date()) / 1000, 
        //         "token": localStorage.getItem("token"), 
        //         "kangdid": localStorage.getItem("kangdid"),
        //         "header_img": this.convertCanvasToImage(this.state.img2)
        //     },
        //     // files: { header_img: this.convertCanvasToImage(this.state.img2) },
        //     // files: { header_img: this.convertCanvasToImage(this.state.img2) },
        //     progress: function (evt) { /* ... */ },
        //     complete: function (err, xhr) { /* ... */
        //         //保存图片地址
        //         var upfileFilePath = (JSON.parse(xhr.responseText)).data.file_path;
        //         //var url = CONFIG.getUrl() + upfileFilePath;
        //         //相对路径就好了
        //         if (upfileFilePath) {
        //             hashHistory.goBack();
        //         }
        //     }
        // });
        //发送ajax上传图片
        runPromise("appuserChangeimg", {
            "header_img": (this.convertCanvasToImage(this.state.img2)).split("base64,")[1]
        }, this.handleUploadAvatar);
    }
    componentWillMount () {
        this.setState(this.props.location.state);
    }
    componentDidMount () {
        let { img, img1, width, height } = this.state;
        // console.log(img1);
        setTimeout(() => {            
            // let AvatarBoxDOM = ReactDOM.findDOMNode(this.refs.img2);
            let AvatarBoxDOM = document.getElementById("img2");
            AvatarBoxDOM.style.height = document.body.clientHeight - 45 + "px";
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
    render() {
        return (
            <QueueAnim
                type="right"
                duration="500"
                ease="easeOutBack"
            >
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
            </QueueAnim>
        )
    }
}
PageUploadAvatar.contextTypes = {
    router: React.PropTypes.object
};

export { cropperToUpload, PageUploadAvatar };

// let toBinaryTable = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
//     52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
//     15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
//     41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
// ]; 
// let base64Pad = '=';   
// function base64ToString(data) {
//     var result = '';
//     var leftbits = 0; // number of bits decoded, but yet to be appended    
//     var leftdata = 0; // bits decoded, but yet to be appended   

//     // Convert one by one.                                                                               
//     for (var i = 0; i < data.length; i++) {
//         var c = toBinaryTable[data.charCodeAt(i) & 0x7f];
//         var padding = (data.charCodeAt(i) == base64Pad.charCodeAt(0));
//         // Skip illegal characters and whitespace    
//         if (c == -1) continue;

//         // Collect data into leftdata, update bitcount    
//         leftdata = (leftdata << 6) | c;
//         leftbits += 6;

//         // If we have 8 or more bits, append 8 bits to the result   
//         if (leftbits >= 8) {
//             leftbits -= 8;
//             // Append if not padding.   
//             if (!padding)
//                 result += String.fromCharCode((leftdata >> leftbits) & 0xff);
//             leftdata &= (1 << leftbits) - 1;
//         }

//     }



//     // If there are any bits left, the base64 string was corrupted                                        

//     if (leftbits)
//         throw Components.Exception('Corrupted base64 string');
//     return result;
// }  