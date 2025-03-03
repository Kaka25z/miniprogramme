import Message from 'tdesign-miniprogram/message/index';

App({

    data: {
        API_Key: 'Cfs7oRiqKjHGoAuhCr9vzwMI',
        Secret_Key: 'sayt8CHfGfp02G8YuxqGvbo98HftUa3q',
    },

    onLaunch() {
        this.getAccessToken()
    },

    getAccessToken() {
        wx.request({
            url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + this.data.API_Key + '&client_secret=' + this.data.Secret_Key,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            success: (res) => {
                this.globalData.accessToken = res.data.access_token
            }
        })
    },

    service(type, base64, context, fun){
        wx.showLoading({
            title: '正在处理...',
            mask: true,
        })

        let url = this.globalData.serverUrl + type + '?access_token=' + this.globalData.accessToken
        wx.request({
            url: url,
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                'image': base64
            },
            success: (res) => {
                console.log(res)
                if (res.data.result) {

                    const processedResult = res.data.result.map(item => ({
                        ...item,
                        score: (parseFloat(item.score) * 100).toFixed(2),
                    }))

                    if ( typeof fun == 'function') {
                        fun(processedResult)
                    }
                }
            },
            fail: (res) => {
                console.log(res)
                this.showFailMessage(context, '出现了一些问题，请稍后再试')
            },
            complete: (res) => {
                wx.hideLoading()
            }
        })
    },

    showSuccessMessage(context, msg) {
        Message.success({
            context: context,
            offset: [5, 32],
            duration: 2000,
            content: msg,
            single: false,
        })
    },

    showFailMessage(context, msg) {
        Message.error({
            context: context,
            offset: [5, 32],
            duration: 2000,
            content: msg,
        })
    },

    showWarnMessage(context, msg) {
        Message.warning({
            context: context,
            offset: [5, 32],
            duration: 2000,
            content: msg,
        })
    },

    checkSize(file, context) {
        if (file.size > 1024 * 1024 * 2) {
            this.showFailMessage(context, '图片过大，请重新选择')
            return false
        }

        this.showSuccessMessage(context, '选择图片成功')
        return true
    },

    toBase64(file, fun) {
        wx.getFileSystemManager().readFile({
            filePath: file.url,
            encoding: 'base64',
            success: (res) => {
                if ( typeof fun == 'function') {
                    fun(res)
                }
            },
        });
    },

    globalData: {
        sizeLimit: {
            size: 2,
            unit: 'MB',
            message: '图片大小不能超过{sizeLimit}MB'
        },

        gridConfig: {
            column: 1,
            width: 600,
            height: 420,
        },

        uploadConfig: {
            image: {
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
            }
        },

        accessToken: '',

        faceToken: '24.1ceca3ab9098f5419a86b071a12e26a7.2592000.1732694565.282335-116026231',

        serverUrl: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/',
    }
})