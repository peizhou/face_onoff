var e = require("../../@babel/runtime/helpers/typeof"), t = getApp(),ad = t.globalData.cycadd,videoAd;

Page({
    data: {
        videoUrlInputContent: "",
        defaltInputContent: "",
        readyPlayVideo: !1,
        resultVideo: "",
        showSelectSaveTypeDialog: !1,
        cadid:ad.cmid
    },
    deleteVideoOss: function(e) {
        wx.request({
            url: "https://www.slimeraso.com/face/deleteVideoOss",
            method: "POST",
            data: {
                object: e
            },
            header: {
                "content-type": "application/json"
            }
        });
    },
    saveVideo2Oss: function(e, o) {
        t.showLoading("文件下载中"), wx.request({
            url: "https://www.slimeraso.com/face/saveVideo2Oss",
            method: "POST",
            data: {
                videoUrl: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log(e);
                var a = e.data.data.videoUrl, n = e.data.data.object;
                o(a, n), t.hideLoading();
            },
            fail: function(e) {
                t.hideLoading(), wx.showToast({
                    title: "文件下载失败",
                    icon: "error"
                });
            }
        });
    },
    onShow:function(){
        
    },
    hideSelectSaveTypeDialog: function(e) {
        this.setData({
            showSelectSaveTypeDialog: !1
        });
    },
    freeSave: function(e) {
        this.setData({
            showSelectSaveTypeDialog: !1
        }), this.doSaveResult(function() {
            t.getTokenStored(function(e) {
                t.updateFreeUse(e, "video_extract");
            });
        });
    },
    jump2Pay: function() {
        wx.navigateTo({
            url: "../pay/pay"
        });
    },
    paySave: function(e) {
        this.setData({
            showSelectSaveTypeDialog: !1
        }), this.jump2Pay();
    },
    showad:function(){
        var that = this;
        let time = false;
        if(wx.getStorageSync('vadtime')){
            if(ad.gettime() - wx.getStorageSync('vadtime')>ad.vad.vtime*60*60){
                wx.removeStorageSync('vadtime')
                time = false;
            }
            else{
                time=true;
            }
        }
        if(videoAd&&!time){
            wx.showModal({
                content:ad.vad.vshow,
                confirmText: "确定",
                success: function(a) {
                    if(a.confirm){
                    videoAd.show().catch(() => {
                        videoAd.load()
                            .then(() => videoAd.show())
                            .catch(err => {
                                console.log('激励视频 广告显示失败')
                        wx.showToast({
                            icon: 'none',
                            title: "暂时无广告,请稍后重试"
                        })
                    })
            })
        }
    }
    })
        }
        else{
            that.saveResult()
        }
       
        
        
    },
    saveResult: function(e) {
        var o = this;
        t.getAbility2Save(function() {
            o.doSaveResult(null);
        }, function() {
            t.getTokenStored(function(e) {
                null != e && t.getFreeUseState(e, function(e) {
                    1 == e.video_extract ? o.setData({
                        showSelectSaveTypeDialog: !0
                    }) : o.jump2Pay();
                });
            });
        });
    },
    doSaveResult: function(e) {
        var o = this, a = this.data.resultVideo;
        this.saveVideo2Oss(a, function(a, n) {
            "https" != a.substring(0, 5) && (a = a.replace("http", "https")), t.showLoading("文件下载中"), 
            wx.downloadFile({
                url: a,
                success: function(a) {
                    if (200 === a.statusCode) {
                        var i = a.tempFilePath;
                        wx.saveVideoToPhotosAlbum({
                            filePath: i,
                            success: function(a) {
                                t.hideLoading(), o.deleteVideoOss(n), null != e && e();
                            },
                            fail: function(e) {
                                t.hideLoading(), wx.showToast({
                                    title: "保存失败",
                                    icon: "error"
                                });
                            }
                        });
                    }
                },
                fail: function(e) {
                    t.hideLoading(), wx.showToast({
                        title: "下载失败",
                        icon: "error"
                    });
                }
            });
        });
    },
    videoExtract: function(o) {
        var a = this.data.videoUrlInputContent;
        if (console.log(a), null != a && void 0 !== a && "" != a.trim()) {
            var n = new RegExp("(http|https)://[^\\s]*", "g").exec(a);
            if (null != n && "object" == e(n) && void 0 !== n[0]) {
                var i = this, s = n[0];
                t.showLoading("视频提取中"), wx.request({
                    url: "https://vss.easyfeng.net/api/v1/watermark/default",
                    method: "GET",
                    data: {
                        url: s
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        console.log(e), t.hideLoading();
                        var o = e.data.data.video_url;
                        console.log(o), i.setData({
                            resultVideo: o,
                            readyPlayVideo: !0
                        });
                    },
                    fail: function(e) {
                        t.hideLoading(), wx.showToast({
                            title: "视频提取失败",
                            icon: "error"
                        });
                    }
                });
            } else t.showModal("提取地址无法识别");
        } else t.showModal("提取地址不能为空");
    },
    onVideoUrlInput: function(e) {
        console.log(e.detail.value), this.setData({
            videoUrlInputContent: e.detail.value,
            resultVideo: "",
            readyPlayVideo: !1
        });
    },
    onLoad: function(e) {
        var t = this;
        wx.getClipboardData({
            success: function(e) {
                var o = e.data;
                t.setData({
                    defaltInputContent: o,
                    videoUrlInputContent: o
                }), "" != o.trim() && wx.showToast({
                    title: "内容已复制",
                    icon: "success"
                });
            }
        });
        if(ad.inid){
            var insetad = wx.createInterstitialAd({
                adUnitId: ad.inid,
              });
              insetad.load()
                .then(() => {
                  setInterval(function(){
                    console.log('检测插屏')
                    insetad.show().then(() => {
                      console.log("插屏广告展示成功");
                    });
                  },ad.intime*1000)
                })
                .catch((err) => {
                  console.log('无插屏')
                  console.log(err);
                });
        }
        if (wx.createRewardedVideoAd&&ad.vid) {
            videoAd = wx.createRewardedVideoAd({
                adUnitId: ad.vid
            })
            videoAd.onLoad(() => {	
            })
            videoAd.offClose();
            videoAd.offError();
            videoAd.onClose((res) => {
                if (res && res.isEnded) {
                    wx.setStorageSync('vadtime', ad.gettime())
                    t.saveResult();
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: "中途关闭广告，无法保存视频！"
                    })
                }
            })
            videoAd.onError((err) => {
                wx.showToast({
                    icon: 'none',
                    title: "暂时无广告，请稍后再试"
                })
            })
        }
        else{
}
    },
    onReady: function() {},
    onShow: function() {
        t.getNewestFolk(function(e) {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage(e) {
        return {
            title: '短视频去水印神器，一键去水印免费',
        }
    },
    onShareTimeline() {
        console.log('分享朋友圈')
        return {
            title: '短视频去水印神器，一键去水印免费',
        }
    },
    onAddToFavorites() {
        return {
            title: '短视频去水印神器，一键去水印免费',
        }
    },
});