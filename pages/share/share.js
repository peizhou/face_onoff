var e = getApp();

Page({
    data: {
        zhuli_list: [ {
            header: "../image/nobody_header.png",
            state: 0
        }, {
            header: "../image/nobody_header.png",
            state: 0
        }, {
            header: "../image/nobody_header.png",
            state: 0
        } ],
        isSelf: !1,
        shareId: 0,
        videoReady: !1,
        videoUrl: "",
        hasFinished: !1
    },
    onLoad: function(a) {
        var o = a.shareId;
        this.setData({
            shareId: o
        });
        var t = this;
        e.getTokenStored(function(e) {
            t.getShareInfo(e);
        });
    },
    doSameVideo: function(e) {
        wx.switchTab({
            url: "../main/main"
        });
    },
    zhuli: function(a) {
        if (this.data.videoReady) {
            for (var o = this.data.zhuli_list, t = !0, n = 0; n < o.length; n++) 0 == o[n].state && (t = !1);
            if (t) wx.showToast({
                title: "已经助力成功"
            }); else {
                var s = this;
                e.getToken(function(a) {
                    e.showLoading("助力中"), wx.request({
                        url: "https://www.slimeraso.com/share/zhuli",
                        method: "POST",
                        data: {
                            packageName: e.globalData.packageName,
                            id: s.data.shareId
                        },
                        header: {
                            "content-type": "application/json",
                            "X-Auth-Token": a
                        },
                        success: function(o) {
                            console.log(o), e.hideLoading();
                            var t = o.data;
                            if (0 == t.code) {
                                n = t.message;
                                wx.showModal({
                                    content: n,
                                    showCancel: !1,
                                    confirmColor: "#FD4274",
                                    success: function(e) {}
                                }), s.getShareInfo(a);
                            } else {
                                var n = t.message;
                                wx.showModal({
                                    content: n,
                                    showCancel: !1,
                                    confirmColor: "#FD4274",
                                    success: function(e) {}
                                });
                            }
                        }
                    });
                });
            }
        }
    },
    saveResult: function() {
        var a = this, o = this.data.videoUrl;
        "https" != o.substring(0, 5) && (o = o.replace("http", "https")), e.authWritePhotoAlbum(function() {
            e.showLoading("文件下载"), wx.downloadFile({
                url: o,
                success: function(a) {
                    if (200 === a.statusCode) {
                        var o = a.tempFilePath;
                        wx.saveVideoToPhotosAlbum({
                            filePath: o,
                            success: function(a) {
                                e.hideLoading(), e.showModal("保存成功！");
                            },
                            fail: function(a) {
                                console.log(a), e.hideLoading(), wx.showToast({
                                    title: "保存失败",
                                    icon: "error"
                                });
                            }
                        });
                    }
                },
                fail: function(e) {
                    console.log(e), a.hideLoading(), wx.showToast({
                        title: "下载失败",
                        icon: "error"
                    });
                }
            });
        });
    },
    getShareInfo: function(a) {
        var o = this;
        wx.request({
            url: "https://www.slimeraso.com/share/getInfo",
            method: "POST",
            data: {
                packageName: e.globalData.packageName,
                id: o.data.shareId
            },
            header: {
                "content-type": "application/json",
                "X-Auth-Token": a
            },
            success: function(a) {
                console.log(a);
                var t = a.data;
                if (0 == t.code) {
                    for (var n = t.data, s = n.headimgurl, i = [ {
                        header: "../image/nobody_header.png",
                        state: 0
                    }, {
                        header: "../image/nobody_header.png",
                        state: 0
                    }, {
                        header: "../image/nobody_header.png",
                        state: 0
                    } ], h = 0; h < s.length; h++) h < 3 && (i[h] = {
                        header: s[h],
                        state: 1
                    });
                    o.setData({
                        zhuli_list: i,
                        videoReady: !0,
                        videoUrl: n.url,
                        isSelf: n.isSelf,
                        hasFinished: n.hasFinished
                    });
                } else {
                    var d = t.message;
                    e.showModal(d);
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        if (this.data.videoReady) return {
            from: "button",
            title: "我被自己的换脸视频美到了，快来帮我解锁吧",
            path: "pages/share/share?shareId=" + this.data.shareId
        };
    }
});