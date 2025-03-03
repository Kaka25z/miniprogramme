import Message from 'tdesign-miniprogram/message/index';

const app = getApp()

const that = this

Page({
    data: {
        gridConfig: {
            column: 1,
            width: 600,
            height: 320,
        },
        uploadConfig: {},
        image_1: [],
        image_2: [],
        base64Img_1: null,
        base64Img_2: null,
        visible: false,
        result: [],
        isShow: true,
    },

    onLoad() {
        wx.setNavigationBarTitle({
            title: '人脸对比',
        })

        this.setData({
            uploadConfig: app.globalData.uploadConfig,
            access_token: app.globalData.faceToken,
        })
    },

    handleAdd_1(e) {
        const fileList = this.data.image_1
        const {
            files
        } = e.detail

        if (app.checkSize(files[0], that)) {
            this.setData({
                image_1: [...fileList, ...files],
            });
            console.log(files)
            app.toBase64(files[0], res => {
                this.setData({
                    base64Img_1: res.data
                })
            })
        }

        return
    },

    handleAdd_2(e) {
        const fileList = this.data.image_2
        const {
            files
        } = e.detail

        if (app.checkSize(files[0], that)) {
            this.setData({
                image_2: [...fileList, ...files],
            });
            console.log(files)
            app.toBase64(files[0], res => {
                this.setData({
                    base64Img_2: res.data
                })
            })
        }

        return
    },

    handleRemove_1(e) {
        const {
            index
        } = e.detail
        const fileList = this.data.image_1

        fileList.splice(index, 1);
        this.setData({
            image_1: [],
            base64Img_1: null,
            isShow: true,
        });
    },

    handleRemove_2(e) {
        const {
            index
        } = e.detail
        const fileList = this.data.image_2

        fileList.splice(index, 1);
        this.setData({
            image_2: [],
            base64Img_2: null,
            isShow: true,
        });
    },

    showFailMessage(msg) {
        Message.error({
            context: this,
            offset: [5, 32],
            duration: 2000,
            content: msg,
        })
    },

    identify() {
        if (this.data.base64Img_1 == null || this.data.base64Img_2 == null) {
            this.showFailMessage('请先选择图片')
            return
        }

        //执行后端操作
        this.setData({
            visible: true
        })

        wx.showLoading({
            title: '正在处理...',
            mask: true,
        })

        var app = getApp()

        let url = 'https://aip.baidubce.com/rest/2.0/face/v3/match?access_token=' + app.globalData.faceToken

        let jsonBase64 = [{
                'image': this.data.base64Img_1,
                'image_type': 'BASE64'
            },
            {
                'image': this.data.base64Img_2,
                'image_type': 'BASE64'
            }
        ]

        console.log(jsonBase64)

        wx.request({
            url: url,
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: jsonBase64,
            success: (res) => {
                if (res.data.result) {

                    let score = res.data.result.score.toFixed(2)

                    this.setData({
                        result: score,
                        isShow: false,
                    })

                    app.showSuccessMessage(that, '识别成功')

                    console.log(res)
                }
            },
            fail: (res) => {
                console.log(res)
                app.showFailMessage(that, '操作失败，请稍后再试')
            },
            complete: (res) => {
                wx.hideLoading()
                this.setData({
                    visible: false,
                })
            }
        })
    },
})