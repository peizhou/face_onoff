var e = getApp();

Page({
    data: {
        payItemBorderColorNormal: "#D9DDE6",
        payItemBorderColorSelected: "#FD4274",
        payItemBgColorNormal: "white",
        payItemBgColorSelected: "#FFDAB9",
        cdkeyItemId: 0,
        payItemsReady: !1,
        payItemSelectedId: -1,
        TAG_NONE: -1,
        TAG_NEW: 0,
        TAG_HOT: 1,
        TAG_RECOMMEND: 2,
        TAG_BEST_VALUE: 3,
        TAG_NEW_IMG: e.pics.vip_new,
        TAG_HOT_IMG: e.pics.vip_hot,
        TAG_RECOMMEND_IMG: e.pics.vip_recommend,
        TAG_BEST_VALUE_IMG: e.pics.vip_best_value,
        pay_card: e.pics.pay_card,
        cdkey: e.pics.cdkey,
        vip_tag_cdkey: e.pics.vip_tag_cdkey,
        enable_pay: !1
    },
    onLoad: function(t) {
        var a = this;
        e.getPayStateFromServer(function(e) {
            console.log(e), 1 == e ? a.setData({
                enable_pay: !0
            }) : a.setData({
                enable_pay: !1
            });
        });
    },
    onReady: function() {
        var t = this;
        wx.request({
            url: "https://www.slimeraso.com/plan/getServicePlanList",
            method: "POST",
            data: {
                packageName: e.globalData.packageName
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var a = e.data.data, o = a[0].id;
                t.setData({
                    payItems: a,
                    payItemsReady: !0,
                    payItemSelectedId: o
                });
            }
        }), wx.getStorage({
            key: "token",
            success: function(e) {
                var a = e.data;
                t.setData({
                    token: a
                });
            }
        });
    },
    onSelectPayItem: function(e) {
        var t = e.currentTarget.dataset.item;
        this.setData({
            payItemSelectedId: t
        });
    },
    doPayRequest: function(t, a) {
        wx.request({
            url: "https://www.slimeraso.com/pay/wxPay",
            method: "POST",
            data: {
                packageName: e.globalData.packageName,
                servicePlanId: a
            },
            header: {
                "content-type": "application/json",
                "X-Auth-Token": t
            },
            success: function(e) {
                var t = e.data;
                if (0 == t.code) {
                    var a = t.data;
                    console.log(t), wx.requestPayment({
                        timeStamp: a.timestamp + "",
                        nonceStr: a.noncestr,
                        package: "prepay_id=" + a.prepayid,
                        signType: "MD5",
                        paySign: a.sign,
                        success: function(e) {
                            console.log(e), wx.setStorage({
                                key: "folkNeedUpdate",
                                data: 1
                            }), wx.navigateBack({});
                        },
                        fail: function(e) {
                            console.log(e);
                        }
                    });
                } else {
                    var o = t.message;
                    wx.showToast({
                        title: o,
                        icon: "error"
                    });
                }
            }
        });
    },
    buyService: function() {
        var t = this, a = this.data.payItemSelectedId;
        if (-1 != a) {
            var o = this.data.token;
            a != this.data.cdkeyItemId ? null != o && void 0 !== o && "" != o.trim() ? t.doPayRequest(o, a) : e.login(function(e, o) {
                t.setData({
                    token: e
                }), t.doPayRequest(e, a);
            }) : null == o || void 0 === o || "" == o.trim() ? e.login(function(e, t) {
                wx.navigateTo({
                    url: "../cdkey/cdkey"
                });
            }) : wx.navigateTo({
                url: "../cdkey/cdkey"
            });
        } else wx.showToast({
            title: "请选择一个服务",
            icon: "error"
        });
    },
    onShow: function() {
        e.getNewestFolk(function(e) {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});