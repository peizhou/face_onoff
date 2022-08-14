var o = getApp();

Page({
    data: {},
    activeCdKey: function(e) {
        var t = this.data.cdkey;
        void 0 !== t && null != t && "" != t.trim() ? (o.showLoading("激活中"), o.getTokenStored(function(e) {
            null != e && wx.request({
                url: "https://www.slimeraso.com/cdkey/check",
                method: "POST",
                data: {
                    packageName: o.globalData.packageName,
                    cdkey: t
                },
                header: {
                    "content-type": "application/json",
                    "X-Auth-Token": e
                },
                success: function(e) {
                    o.hideLoading();
                    var t = e.data;
                    0 == t.code ? (wx.setStorage({
                        key: "folkNeedUpdate",
                        data: 1
                    }), wx.navigateBack({})) : wx.showToast({
                        title: t.message,
                        icon: "error"
                    });
                }
            });
        })) : wx.showToast({
            title: "请输入激活码",
            icon: "error"
        });
    },
    onCdkeyInput: function(o) {
        var e = o.detail.value;
        this.setData({
            cdkey: e
        }), console.log(e);
    },
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});