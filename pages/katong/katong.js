var t = getApp(),ad = t.globalData.cycadd,videoAd;

Page({
    data: {
        touming_bg: t.pics.touming_bg,
        showSelectSaveTypeDialog: !1
    },
    hideSelectSaveTypeDialog: function(t) {
        this.setData({
            showSelectSaveTypeDialog: !1
        });
    },
    freeSave: function(e) {
        this.setData({
            showSelectSaveTypeDialog: !1
        }), this.doSaveResult(function() {
            t.getTokenStored(function(e) {
                t.updateFreeUse(e, "katong");
            });
        });
    },
    jump2Pay: function() {
        wx.navigateTo({
            url: "../pay/pay"
        });
    },
    paySave: function(t) {
        this.setData({
            showSelectSaveTypeDialog: !1
        }), this.jump2Pay();
    },
    saveResult: function(e) {
        if (this.data.hasDownload) t.showModal("已下载成功，请到相册里查看！"); else {
            var o = this, a = this.data.resultPicPath;
            void 0 !== a && null != a && "" != a.trim() ? t.getAbility2Save(function() {
                o.doSaveResult(null);
            }, function() {
                t.getTokenStored(function(e) {
                    null != e && t.getFreeUseState(e, function(t) {
                        1 == t.katong ? o.setData({
                            showSelectSaveTypeDialog: !0
                        }) : o.jump2Pay();
                    });
                });
            }) : wx.showToast({
                title: "请上传一张图片",
                icon: "error"
            });
        }
    },
    doSaveResult: function(e) {
        var o = this, a = this.data.resultPicPath;
        t.authWritePhotoAlbum(function() {
            t.showLoading("保存中"), wx.saveImageToPhotosAlbum({
                filePath: a,
                success: function(a) {
                    t.hideLoading(), o.setData({
                        hasDownload: !0
                    }), t.showModal("保存成功！"), null != e && e();
                },
                fail: function(e) {
                    t.hideLoading(), wx.showToast({
                        title: "保存失败",
                        icon: "error"
                    });
                }
            });
        });
    },
    selectFromLocal: function(t) {
        var e = this.data.callbackAfterSelectPic;
        this.hideSelectPicDialog(t), wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "album" ],
            success: function(t) {
                var o = t.tempFilePaths;
                e(o[0]);
            }
        });
    },
    selectFromCamera: function(t) {
        var e = this.data.callbackAfterSelectPic;
        this.hideSelectPicDialog(t), wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "camera" ],
            success: function(t) {
                var o = t.tempFilePaths;
                e(o[0]);
            }
        });
    },
    uploadPic: function(e) {
        var o = this;
        this.showSelectPicDialog(function(e) {
            o.setData({
                orgPic: e
            }), t.pikaProcess(e, "卡通", function(t) {
                console.log(t), o.setData({
                    resultPicPath: t
                });
            });
        });
    },
    showSelectPicDialog: function(t) {
        this.setData({
            showSelectPicDialog: !0,
            callbackAfterSelectPic: t
        });
    },
    hideSelectPicDialog: function(t) {
        this.setData({
            showSelectPicDialog: !1
        });
    },
    showad:function(){
        var that = this;
        let time = false;
        if(wx.getStorageSync('padtime')){
            if(ad.gettime() - wx.getStorageSync('padtime')>ad.pad.vtime*60*60){
                wx.removeStorageSync('padtime')
                time = false;
            }
            else{
                time=true;
            }
        }
        if(videoAd&&!time){
            wx.showModal({
                content:ad.pad.vshow,
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
    onLoad: function(t) {
        var that = this;
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
                    wx.setStorageSync('padtime', ad.gettime())
                    that.saveResult();
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
        t.getNewestFolk(function(t) {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage(e) {
        return {
            title: '卡通头像生成，一键定制你的专属头像'
        }
    },
    onShareTimeline() {
        console.log('分享朋友圈')
        return {
            title: '卡通头像生成，一键定制你的专属头像'
        }
    },
    onAddToFavorites() {
        return {
            title: '卡通头像生成，一键定制你的专属头像'
        }
    },
});