var t = getApp(),ad = t.globalData.cycadd,videoAd;

Page({
    data: {
        touming_bg: t.pics.touming_bg,
        touchPos: -1,
        showSelectSaveTypeDialog: !1
    },
    jump2Pay: function() {
        wx.navigateTo({
            url: "../pay/pay"
        });
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
                t.updateFreeUse(e, "qushuiyin");
            });
        });
    },
    paySave: function(t) {
        this.setData({
            showSelectSaveTypeDialog: !1
        }), this.jump2Pay();
    },
    saveResult: function(e) {
        var a = this, i = this.data.orgPic;
        void 0 !== i && null != i && "" != i.trim() ? t.getAbility2Save(function() {
            a.doSaveResult(null);
        }, function() {
            t.getTokenStored(function(e) {
                null != e && t.getFreeUseState(e, function(t) {
                    1 == t.qushuiyin ? a.setData({
                        showSelectSaveTypeDialog: !0
                    }) : a.jump2Pay();
                });
            });
        }) : wx.showToast({
            title: "请上传一张图片",
            icon: "error"
        });
    },
    doSaveResult: function(e) {
        var a = this.data.orgPic;
        t.authWritePhotoAlbum(function() {
            t.showLoading("保存中"), wx.saveImageToPhotosAlbum({
                filePath: a,
                success: function(a) {
                    t.hideLoading(), t.showModal("保存成功！"), null != e && e();
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
    absPosTranslate: function(t) {
        var e = this.data.canvas.width / 600;
        return wx.getSystemInfoSync().pixelRatio * t / e;
    },
    posInRect: function(t, e, a) {
        return null != a && (t > a.left && t < a.left + a.width && e > a.top && e < a.top + a.height);
    },
    onCanvasTouchEnd: function(e) {
        console.log("onCanvasTouchEnd");
        var a = this.data.orgPic;
        if (console.log(a), void 0 !== a && null != a && "" != a.trim()) {
            var i = this, o = this.data.rectangle;
            if (void 0 !== o && null != o && o.width > 0 && o.height > 0) {
                var n = this.data.picInfo, s = this.data.picArea, h = n.width / s.width, c = o.left * h, l = o.top * h, r = o.width * h, d = o.height * h, u = s.left * h, g = s.top * h;
                c -= u, l -= g;
                var f = wx.getFileSystemManager();
                t.showLoading("处理中"), f.readFile({
                    filePath: a,
                    encoding: "base64",
                    success: function(e) {
                        var a = e.data;
                        wx.request({
                            url: "https://picupapi.tukeli.net/api/v1/imageFix",
                            method: "POST",
                            data: {
                                base64: a,
                                rectangles: [ {
                                    width: Math.floor(r),
                                    height: Math.floor(d),
                                    x: Math.floor(c),
                                    y: Math.floor(l)
                                } ]
                            },
                            header: {
                                "content-type": "application/json",
                                APIKEY: t.globalData.PKAPIKEY
                            },
                            success: function(e) {
                                var a = e.data.data.imageUrl;
                                t.showLoading("文件下载"), wx.downloadFile({
                                    url: a,
                                    success: function(e) {
                                        if (t.hideLoading(), 200 === e.statusCode) {
                                            var a = e.tempFilePath;
                                            i.setData({
                                                orgPic: a,
                                                rectangle: null
                                            }), i.draOrgPic();
                                        }
                                    },
                                    fail: function(e) {
                                        t.hideLoading(), wx.showToast({
                                            title: "下载失败",
                                            icon: "error"
                                        });
                                    }
                                });
                            },
                            fail: function(t) {
                                wx.showToast({
                                    title: "处理失败",
                                    icon: "error"
                                });
                            }
                        });
                    },
                    fail: function(e) {
                        t.hideLoading(), wx.showToast({
                            title: "处理失败",
                            icon: "error"
                        });
                    }
                });
            }
        }
    },
    onCanvasTouchStart: function(t) {
        var e = this.data.picArea;
        if (void 0 !== e) {
            this.setData({
                rectangle: null
            });
            var a = t.touches[0], i = a.x, o = a.y;
            i = this.absPosTranslate(i), o = this.absPosTranslate(o);
            this.posInRect(i, o, e) && (this.setData({
                touchPos: 0,
                xWhenDown: i,
                yWhenDown: o
            }), this.refresh());
        }
    },
    onCanvasTouchMove: function(t) {
        if (-1 != this.data.touchPos) {
            var e = t.touches[0], a = e.x, i = e.y, o = (a = this.absPosTranslate(a), i = this.absPosTranslate(i), 
            this.data.xWhenDown), n = this.data.yWhenDown, s = this.data.picArea;
            a > s.left + s.width && (a = s.left + s.width), i > s.top + s.height && (i = s.top + s.height);
            var h = {
                left: a < o ? a : o,
                top: i < n ? i : n,
                width: Math.abs(a - o),
                height: Math.abs(i - n)
            };
            this.setData({
                rectangle: h
            }), this.refresh();
        }
    },
    uploadPic: function(t) {
        var e = this;
        this.showSelectPicDialog(function(t) {
            e.setData({
                orgPic: t
            }), e.draOrgPic();
        });
    },
    draOrgPic: function() {
        var t = this.data.orgPic;
        if (void 0 !== t) {
            this.setData({
                bgColor: ""
            });
            var e = this;
            wx.getImageInfo({
                src: t,
                success: function(t) {
                    e.drawCanvas(t);
                }
            });
        } else wx.showToast({
            title: "请上传一张图片",
            icon: "error"
        });
    },
    drawCanvas: function(t) {
        var e = t.path, a = t.width, i = t.height;
        console.log(t.orientation), "left" != t.orientation && "right" != t.orientation || (a = t.height, 
        i = t.width);
        var o = this;
        wx.createSelectorQuery().select("#cropCanvasId").fields({
            node: !0,
            size: !0
        }).exec(function(t) {
            var n = t[0].node, s = n.getContext("2d"), h = wx.getSystemInfoSync().pixelRatio;
            n.width = t[0].width * h, n.height = t[0].height * h;
            var c = {
                width: 600,
                height: 600 * n.height / n.width
            };
            o.setData({
                canvasInfo: c,
                _canvas: n
            });
            n.height, n.width;
            var l = 600, r = l * i / a;
            r > c.height && (l = (r = c.height) * a / i);
            var d = {
                left: (c.width - l) / 2,
                top: (c.height - r) / 2,
                width: l,
                height: r
            }, u = {
                width: a,
                height: i
            };
            o.setData({
                picArea: d,
                picInfo: u
            });
            var g = n.createImage();
            g.onload = function() {
                o.setData({
                    canvas: n,
                    ctx: s,
                    img: g
                }), o.render(n, s, d, g);
            }, g.src = e;
        });
    },
    refresh: function() {
        this.render(this.data.canvas, this.data.ctx, this.data.picArea, this.data.img);
    },
    render: function(t, e, a, i) {
        e.save();
        var o = t.width / 600;
        e.scale(o, o), e.clearRect(0, 0, 600, 600 * t.height / t.width), e.drawImage(i, a.left, a.top, a.width, a.height);
        var n = this.data.rectangle;
        void 0 !== n && null != n && n.width > 0 && n.height > 0 && (e.lineWidth = 3, e.globalAlpha = 1, 
        e.strokeStyle = "#FD4274", e.beginPath(), e.rect(n.left, n.top, n.width, n.height), 
        e.stroke()), e.restore();
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
    selectFromLocal: function(t) {
        var e = this.data.callbackAfterSelectPic;
        this.hideSelectPicDialog(t), wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "album" ],
            success: function(t) {
                var a = t.tempFilePaths;
                e(a[0]);
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
                var a = t.tempFilePaths;
                e(a[0]);
            }
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
            title: '图片框选去水印，图片去水印工具免费',
        }
    },
    onShareTimeline() {
        console.log('分享朋友圈')
        return {
            title: '图片框选去水印，图片去水印工具免费',
        }
    },
    onAddToFavorites() {
        return {
            title: '图片框选去水印，图片去水印工具免费',
        }
    },
});