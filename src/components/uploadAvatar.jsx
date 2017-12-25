import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Link } from 'react-router';
import { WhiteSpace, Button, WingBlank, InputItem, Flex, NavBar, Icon, Toast } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

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
                console.log("cropperToUpload::", self);
                img0.get(function (err, img) {
                    // img 原图
                    // img1 需要切割的图
                    //跳转到裁切图片页
                    console.log(img);
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
    }
    onClickUpload = () => {
        //这里写上传图片的代码   
        FileAPI.upload({
            url: 'https://www.huakewang.com/upload/upload_images_for_mobile',
            files: { Filedata: this.state.img1 },
            progress: function (evt) { /* ... */ },
            complete: function (err, xhr) { /* ... */
                //保存图片地址
                var upfileFilePath = (JSON.parse(xhr.responseText)).data.file_path;
                //var url = CONFIG.getUrl() + upfileFilePath;
                //相对路径就好了
                if (upfileFilePath) {
                    hashHistory.goBack();
                }
            }
        });
    }
    componentWillMount () {
        this.setState(this.props.location.state);
    }
    componentDidMount () {
        let { img, img1, width, height } = this.state;
        console.log(img1);
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
                    self.setState({
                        img1: img1
                    })
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