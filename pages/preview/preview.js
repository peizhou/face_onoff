var e = getApp(),ad = e.globalData.cycadd,videoAd;

Page({
    data: {
        bg_tip: e.pics.bg_tip,
        save_times_out: e.pics.save_times_out,
        tip: e.pics.tip,
        title_save_one: e.pics.title_save_one,
        vip_icon: e.pics.vip_icon,
        readyPlayVideo: !1,
        videoUrl: "",
        showSelectPayOrShareDialog: !1,
        water:ad.vwater
    },
    onLoad: function(e) {
        let that = this;
        var t = e.videoUrl;
        this.setData({
            videoUrl: t,
            readyPlayVideo: !0
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
        console.log()
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
    showLoading: function(e) {
        wx.showLoading({
            title: e,
            mask: !0
        });
    },
    hideLoading: function() {
        wx.hideLoading();
    },
    freeSave: function(t) {
        this.doSaveResult(function() {
            e.getTokenStored(function(t) {
                e.updateFreeUse(t, "face_fusion");
            });
        });
    },
    hideSelectPayOrShareDialog: function() {
        this.setData({
            showSelectPayOrShareDialog: !1
        });
    },
    onShow:function(){
        var a = null;
            if (wx.createInterstitialAd) {
                (a = wx.createInterstitialAd({
                    adUnitId: 'adunit-0503f034a0dfb6c6'
                })).onLoad(function() {
                    console.log("onLoad event emit");
                }), a.onError(function(a) {
                    console.log("onError event emit", a);
                }), a.onClose(function(a) {
                    console.log("onClose event emit", a);
                });
                setInterval(function(){
                    a.show().catch(function(a) {
                        console.error(a);
                    });
                },20000)
            }
    },
    jump2Pay: function() {
        wx.navigateTo({
            url: "../pay/pay"
        });
    },
    paySave: function(e) {
        this.jump2Pay();
    },
    shareSave: function(e) {
        const pages = getCurrentPages();
		if (pages.length === 2) {
			wx.navigateBack({
					delta: 1
			});
			} else if (pages.length === 1) {
				wx.switchTab({
					url: '/pages/main/main',
				})
			} else {
				wx.navigateBack({
						delta: 1
				});
			}
    },
    createShare: function(t) {
        var o = this;
        e.getTokenStored(function(a) {
            wx.request({
                url: "https://www.slimeraso.com/share/add",
                method: "POST",
                data: {
                    friends: JSON.stringify([]),
                    url: o.data.videoUrl,
                    packageName: e.globalData.packageName
                },
                header: {
                    "content-type": "application/json",
                    "X-Auth-Token": a
                },
                success: function(e) {
                    var o = e.data;
                    if (0 == o.code) {
                        var a = o.data;
                        t(a);
                    } else {
                        var i = o.message;
                        wx.showToast({
                            title: i,
                            icon: "error"
                        });
                    }
                }
            });
        });
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
    saveResult: function(t) {
       
        if (this.data.hasDownload) e.showModal("已下载成功，请到相册里查看！"); else {
            var o = this;
            e.getAbility2Save(function() {
                o.doSaveResult(null);
            }, function() {
                e.getTokenStored(function(t) {
                    null != t && e.getFreeUseState(t, function(e) {
                        1 == e.face_fusion ? o.freeSave(null) : o.setData({
                            showSelectPayOrShareDialog: !0
                        });
                    });
                });
            });
        }
    },
    doSaveResult: function(t) {
        var o = this, a = this.data.videoUrl;
        "https" != a.substring(0, 5) && (a = a.replace("http", "https")), e.authWritePhotoAlbum(function() {
            o.showLoading("文件下载"), wx.downloadFile({
                url: a,
                success: function(a) {
                    if (200 === a.statusCode) {
                        var i = a.tempFilePath;
                        wx.saveVideoToPhotosAlbum({
                            filePath: i,
                            success: function(a) {
                                o.hideLoading(), o.setData({
                                    hasDownload: !0
                                }), e.showModal("保存成功！"), null != t && t();
                            },
                            fail: function(e) {
                                console.log(e), o.hideLoading(), wx.showToast({
                                    title: "保存失败",
                                    icon: "error"
                                });
                            }
                        });
                    }
                },
                fail: function(e) {
                    console.log(e), o.hideLoading(), wx.showToast({
                        title: "下载失败",
                        icon: "error"
                    });
                }
            });
        });
    },
    onShareAppMessage(e) {
        return {
            title: ad.sharetitle,
            imageUrl: ad.shareimg,
            path:'/pages/main/main'
        }
    },
    onShareTimeline() {
        console.log('分享朋友圈')
        return {
            title: ad.sharetitle,
            imageUrl: ad.shareimg,
        }
    },
    onAddToFavorites() {
        return {
            title: ad.sharetitle,
            imageUrl: ad.shareimg,
        }
    },
});