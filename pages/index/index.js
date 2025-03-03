Page({
    data: {
        swiperList : [
            {
                value : '/assets/img/D97D7E82D17545A58F12B9754A6FCD53.jpg',
                ariaLabel: '图片1',
                page : '/pages/animal/animal'
            },
            {
                value : '/assets/img/20231228120110381.jpg',
                ariaLabel: '图片2',
                page : '/pages/car/car'
            },
            {
                value : '/assets/img/1667898892855577_compressed.jpg',
                ariaLabel: '图片3',
                page : '/pages/plant/plant'
            },
            {
                value : '/assets/img/1-200521092314N8.jpg',
                ariaLabel: '图片4',
                page : '/pages/face/face'
            },
        ],
        value : '/pages/index/index',
        list : [
            { value: '/pages/index/index', icon: 'home', ariaLabel: '首页' },
            { value: '/pages/user/user', icon: 'user', ariaLabel: '我的' },
        ],
        description : "单次识别收费0.3元",
    },

    onTap(e) {
        const { index } = e.detail
        const list = this.data.swiperList

        const targetPage = list[index].page

        if(targetPage) {
            wx.navigateTo({
              url: targetPage,
            })
        }
    },

    onChange(e){
        if ( this.data.value == e.detail.value) {
            return
        }

        wx.redirectTo({
          url: e.detail.value,
        })
    }

})