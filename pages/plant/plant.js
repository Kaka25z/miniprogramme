const app = getApp()

const that = this

Page({
    data: {
        gridConfig: {},
        uploadConfig: {},
        fileList: [],
        base64Img: null,
        visible: false,
        result: [],
        highest: [],
        others: [],
        isShow: true,
    },

    onLoad() {
        wx.setNavigationBarTitle({
            title: '植物识别',
        })

        const app = getApp()
        this.setData({
            uploadConfig: app.globalData.uploadConfig,
            gridConfig: app.globalData.gridConfig,
        })
    },

    handleAdd(e) {
        const fileList = this.data.fileList
        const {
            files
        } = e.detail

        if (app.checkSize(files[0], that)) {
            this.setData({
                fileList: [...fileList, ...files],
            });
            console.log(files)

            app.toBase64(files[0], res => {
                this.setData({
                    base64Img: res.data
                })
            })
        }

        return
    },

    handleRemove(e) {
        const {
            index
        } = e.detail
        const fileList = this.data.fileList

        fileList.splice(index, 1);
        this.setData({
            fileList,
            base64Img: null,
            isShow: true,
        });
    },



    identify() {
        if (this.data.base64Img == null) {
            app.showFailMessage(that, '请先选择图片')
            return
        }

        //执行后端操作
        this.setData({
            visible: true
        })

        app.service('plant', this.data.base64Img, that, res => {
            this.setData({
                highest: res[0],
                others: res.slice(1),
                isShow: false,
                visible: false,
            })

            app.showSuccessMessage(that, '识别成功')
        })
    },
})