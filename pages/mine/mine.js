var i = getApp();

Page({
    data: {
        vipPic: i.pics.vip_1,
        head_ico: i.pics.head_ico,
        setting_yonghuxieyi_ico: i.pics.setting_yonghuxieyi_ico,
        lis_open_arrow_ico_nor: i.pics.lis_open_arrow_ico_nor,
        setting_service_ico: i.pics.setting_service_ico
    },
    onLoad: function(e) {
        this.setData({
            QQ: i.globalData.QQ,
            appName: i.globalData.appName
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        "function" == typeof this.getTabBar && this.getTabBar() && i.getFaceFusionState(function(i) {
            1 == i ? e.getTabBar().setData({
                selected: 2
            }) : e.getTabBar().setData({
                selected: 1
            });
        }), i.getNewestFolk(function(i) {
            e.refreshUi(i);
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    gotoMyProduct: function(i) {
        wx.navigateTo({
            url: "../myProduct/myProduct"
        });
    },
    getVipLevelName: function(e) {
        return e == i.globalData.VIP_LEVEL_FOREVER ? "永久会员" : e == i.globalData.VIP_LEVEL_PAY ? "高级会员" : "普通会员";
    },
    refreshUi: function(e) {
        if (null != e) {
            var t = e.expireTime, a = i.pics.vip_1;
            e.vipLevel == i.globalData.VIP_LEVEL_UN_PAY ? (t = "", a = i.pics.vip_1) : e.vipLevel == i.globalData.VIP_LEVEL_FOREVER ? (t = "", 
            a = i.pics.vip_3) : e.vipLevel == i.globalData.VIP_LEVEL_PAY && (e.hasExpired ? (t = "已过期", 
            a = i.pics.vip_2) : (t += "到期", a = i.pics.vip_3)), this.setData({
                folk: e,
                hasUserInfo: !0,
                vipLevelName: this.getVipLevelName(e.vipLevel),
                expireTime: t,
                vipPic: a
            });
        }
    },
    login: function(e) {
        var t = this;
        i.login(function(i, e) {
            t.refreshUi(e);
        });
    },
    jump2Pay: function() {
        i.isVipUser(this.data.folk) ? i.showModal("您已经是会员，不需要重复充值！") : wx.navigateTo({
            url: "../pay/pay"
        });
    }
});