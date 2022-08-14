var e = getApp(),ad = e.globalData.cycadd,videoAd;

Page({
    data: {
        touming_bg: e.pics.touming_bg,
        showSelectSaveTypeDialog: !1
    },
    jump2Pay: function() {
        wx.navigateTo({
            url: "../pay/pay"
        });
    },
    hideSelectSaveTypeDialog: function(e) {
        this.setData({
            showSelectSaveTypeDialog: !1
        });
    },
    freeSave: function(t) {
        this.setData({
            showSelectSaveTypeDialog: !1
        }), this.doSaveResult(function() {
            e.getTokenStored(function(t) {
                e.updateFreeUse(t, "dongman");
            });
        });
    },
    paySave: function(e) {
        this.setData({
            showSelectSaveTypeDialog: !1
        }), this.jump2Pay();
    },
    saveResult: function(t) {
        if (this.data.hasDownload) e.showModal("已下载成功，请到相册里查看！"); else {
            var o = this, a = this.data.dongManResultPicPath;
            void 0 !== a && null != a && "" != a.trim() ? e.getAbility2Save(function() {
                o.doSaveResult(null);
            }, function() {
                e.getTokenStored(function(t) {
                    null != t && e.getFreeUseState(t, function(e) {
                        1 == e.dongman ? o.setData({
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
    doSaveResult: function(t) {
        var o = this, a = this.data.dongManResultPicPath;
        e.authWritePhotoAlbum(function() {
            e.showLoading("保存中"), wx.saveImageToPhotosAlbum({
                filePath: a,
                success: function(a) {
                    e.hideLoading(), o.setData({
                        hasDownload: !0
                    }), e.showModal("保存成功！"), null != t && t();
                },
                fail: function(t) {
                    console.log(t), e.hideLoading(), wx.showToast({
                        title: "保存失败",
                        icon: "error"
                    });
                }
            });
        });
    },
    selectFromLocal: function(e) {
        var t = this.data.callbackAfterSelectPic;
        this.hideSelectPicDialog(e), wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "album" ],
            success: function(e) {
                var o = e.tempFilePaths;
                t(o[0]);
            }
        });
    },
    selectFromCamera: function(e) {
        var t = this.data.callbackAfterSelectPic;
        this.hideSelectPicDialog(e), wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "camera" ],
            success: function(e) {
                var o = e.tempFilePaths;
                t(o[0]);
            }
        });
    },
    uploadPic: function(t) {
        var o = this;
        this.showSelectPicDialog(function(t) {
            o.setData({
                orgPic: t
            }), e.pikaProcess(t, "动漫", function(e) {
                console.log(e), o.setData({
                    dongManResultPicPath: e
                });
            });
        });
    },
    showSelectPicDialog: function(e) {
        this.setData({
            showSelectPicDialog: !0,
            callbackAfterSelectPic: e
        });
    },
    hideSelectPicDialog: function(e) {
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
    onLoad: function(e) {
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
        e.getNewestFolk(function(e) {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage(e) {
        return {
            title: '人脸动漫化神器，抖音特效动漫人脸免费'
        }
    },
    onShareTimeline() {
        console.log('分享朋友圈')
        return {
            title: '人脸动漫化神器，抖音特效动漫人脸免费'
        }
    },
    onAddToFavorites() {
        return {
            title: '人脸动漫化神器，抖音特效动漫人脸免费'
        }
    },
});