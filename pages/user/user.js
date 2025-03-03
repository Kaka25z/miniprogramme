const app = getApp()

import {
    Authing
} from '@authing/miniapp-wx'

const authing = new Authing({
    appId: '67225a2d359333684c94b971',

    host: 'https://kaka25zai.authing.cn',

    // 用户池 ID
    userPoolId: '67225a2d359333684c94b971',
})


Page({

    data: {
        value: '/pages/user/user',
        list: [{
                value: '/pages/index/index',
                icon: 'home',
                ariaLabel: '首页'
            },
            {
                value: '/pages/user/user',
                icon: 'user',
                ariaLabel: '我的'
            },
        ],
    },

    onShow() {
        wx.hideHomeButton()
    },

    onChange(e) {
        if (this.data.value == e.detail.value) {
            return
        }

        wx.redirectTo({
            url: e.detail.value,
        })
    },

    async login() {
        // app.showWarnMessage(this, '敬请期待')

        const {
            encryptedData,
            iv
        } = await wx.getUserProfile({
            desc: 'getUserProfile'
        })

        const [error, res] = await authing.loginByCode({
            // 你的小程序身份源唯一标识
            extIdpConnidentifier: 'kaka',
            wechatMiniProgramCodePayload: {
                encryptedData,
                iv
            },
            options: {
                scope: 'openid profile offline_access'
            },
        })
        this.getUserInfo()
    },

    async getUserInfo() {
        const [error, res] = await authing.getUserInfo()

        console.log(error)
        console.log(res)
    }

})