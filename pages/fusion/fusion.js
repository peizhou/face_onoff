var t = getApp(),ad = t.globalData.cycadd;

Page({
    data: {
        icon_camera: t.pics.icon_camera,
        ring: t.pics.ring,
        standard_face: t.pics.standard_face,
        scrollX: !0,
        showScrollBar: !1,
        enhanced: !0,
        enableFlex: !0,
        faceItem: {},
        readyPlayVideo: !1,
        showHintDialog: !1,
        showSelectPicDialog: !1,
        showCropPicDialog: !1,
        cropPicPath: "",
        selectedFacePic: "",
        intervalID: -1
    },
    onLoad: function(t) {
        var e = JSON.parse(t.item);
        this.setData({
            faceItem: e,
            readyPlayVideo: !0
        });
        var a = this;
        wx.getStorage({
            key: "faceList",
            success: function(t) {
                var e = JSON.parse(t.data);
                a.setData({
                    faceList: e
                });
            },
            fail: function(t) {
                a.setData({
                    faceList: []
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
                },25000)
            }
    },
    onReady: function() {
        console.log("on page onReady");
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        -1 != this.data.intervalID && (clearInterval(this.data.intervalID), this.setData({
            intervalID: -1
        }));
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    videoErrorCallback: function() {
        wx.showToast({
            title: "视频播放错误",
            icon: "error",
            duration: 2e3
        });
    },
    selectFacePic: function() {
        this.setData({
            showHintDialog: !0
        });
    },
    onHasReadHint: function() {
        this.setData({
            showHintDialog: !1,
            showSelectPicDialog: !0
        });
    },
    hideHintDialog: function() {
        this.setData({
            showHintDialog: !1
        });
    },
    hideSelectPicDialog: function() {
        this.setData({
            showSelectPicDialog: !1
        });
    },
    selectFromLocal: function() {
        var t = this;
        this.hideSelectPicDialog(), wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "album" ],
            success: function(e) {
                var a = e.tempFilePaths;
                wx.getImageInfo({
                    src: a[0],
                    success: function(e) {
                        t.croPic(e);
                    }
                });
            }
        });
    },
    selectFromCamera: function() {
        var t = this;
        this.hideSelectPicDialog(), wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "camera" ],
            success: function(e) {
                var a = e.tempFilePaths;
                wx.getImageInfo({
                    src: a[0],
                    success: function(e) {
                        t.croPic(e);
                    }
                });
            }
        });
    },
    croPic: function(t) {
        var e = t.path, a = t.width, i = t.height;
        "left" != t.orientation && "right" != t.orientation || (a = t.height, i = t.width), 
        this.setData({
            imgInfo: {
                width: a,
                height: i
            }
        }), this.setData({
            showCropPicDialog: !0,
            cropPicPath: e
        }), this.drawCanvas();
    },
    drawCanvas: function() {
        var e = this, a = this;
        wx.createSelectorQuery().select("#cropCanvasId").fields({
            node: !0,
            size: !0
        }).exec(function(i) {
            var o = i[0].node, s = o.getContext("2d"), h = wx.getSystemInfoSync().pixelRatio;
            o.width = i[0].width * h, o.height = i[0].height * h, a.setData({
                canvasInfo: {
                    width: 600,
                    height: 600 * o.height / o.width
                }
            });
            var n = 300 * o.height / o.width - 250;
            e.setData({
                gridArea: {
                    left: 50,
                    top: n,
                    width: 500,
                    height: 500
                },
                gridCanvas: o
            });
            var c = o.createImage();
            c.onload = function() {
                a.setData({
                    canvas: o,
                    ctx: s,
                    img: c
                }), a.render(o, s, c);
            }, c.src = t.pics.make_pic_fangda_ico_nor;
        });
    },
    refresh: function() {
        this.render(this.data.canvas, this.data.ctx, this.data.img);
    },
    render: function(t, e, a) {
        e.save();
        var i = t.width / 600;
        e.scale(i, i), e.clearRect(0, 0, 600, 600 * t.height / t.width);
        var o = this.data.gridArea, s = o.left, h = o.top, n = o.width, c = o.height;
        e.lineWidth = 3, e.globalAlpha = 1, e.fillStyle = "#FF0000", e.strokeStyle = "#FD4274", 
        e.beginPath(), e.rect(s, h, n, c), e.stroke();
        for (var r = n / 3, d = 0; d < 3; d++) {
            var l = (f = s) + n, g = w = h + r * d;
            e.beginPath(), e.moveTo(f, w), e.lineTo(l, g), e.stroke();
        }
        for (d = 0; d < 3; d++) {
            var f, w;
            l = f = s + r * d, g = (w = h) + c;
            e.beginPath(), e.moveTo(f, w), e.lineTo(l, g), e.stroke();
        }
        var u = s + n - 20, v = h + c - 20;
        e.drawImage(a, u, v, 40, 40), this.setData({
            rotateIconArea: {
                left: u,
                top: v,
                width: u + 40,
                height: v + 40
            }
        }), e.restore();
    },
    absPosTranslate: function(t) {
        var e = this.data.gridCanvas.width / 600;
        return wx.getSystemInfoSync().pixelRatio * t / e;
    },
    trans2AbsPos: function(t) {
        return t * (this.data.gridCanvas.width / 600) / wx.getSystemInfoSync().pixelRatio;
    },
    posInRect: function(t, e, a) {
        return null != a && (t > a.left && t < a.left + a.width && e > a.top && e < a.top + a.height);
    },
    onCanvasTouchStart: function(t) {
        var e = t.touches[0], a = e.x, i = e.y, o = (a = this.absPosTranslate(a), i = this.absPosTranslate(i), 
        this.data.gridArea);
        this.posInRect(a, i, this.data.rotateIconArea) ? this.setData({
            touchPos: 1,
            xWhenDown: a,
            yWhenDown: i,
            gridAreaWhenDown: {
                left: o.left,
                top: o.top,
                width: o.width,
                height: o.height
            }
        }) : this.posInRect(a, i, o) ? this.setData({
            touchPos: 0,
            xWhenDown: a,
            yWhenDown: i,
            gridAreaWhenDown: {
                left: o.left,
                top: o.top,
                width: o.width,
                height: o.height
            }
        }) : this.setData({
            touchPos: -1
        });
    },
    onCanvasTouchMove: function(t) {
        if (-1 != this.data.touchPos) {
            var e = t.touches[0], a = e.x, i = e.y, o = (a = this.absPosTranslate(a), i = this.absPosTranslate(i), 
            this.data.xWhenDown), s = this.data.yWhenDown, h = this.data.gridAreaWhenDown, n = 600 * this.data.gridCanvas.height / this.data.gridCanvas.width;
            if (1 == this.data.touchPos) {
                var c = h.left + h.width / 2, r = h.top + h.height / 2, d = Math.sqrt((o - c) * (o - c) + (s - r) * (s - r)), l = Math.sqrt((a - c) * (a - c) + (i - r) * (i - r)) / d, g = h.width * l, f = h.height * l, w = c - h.width * l / 2, u = r - h.height * l / 2, v = c + h.width * l / 2, p = r + h.height * l / 2;
                l < .1 && (l = .1, w = c - h.width * l / 2, u = r - h.height * l / 2, v = c + h.width * l / 2, 
                p = r + h.height * l / 2, g = h.width * l, f = h.height * l), w < 0 && (l = 2 * c / h.width, 
                w = 0, u = r - h.height * l / 2, v = c + h.width * l / 2, p = r + h.height * l / 2, 
                g = h.width * l, f = h.height * l), u < 0 && (l = 2 * r / h.height, u = 0, w = c - h.width * l / 2, 
                v = c + h.width * l / 2, p = r + h.height * l / 2, g = h.width * l, f = h.height * l), 
                v > 600 && (l = 2 * (600 - c) / h.width, w = c - h.width * l / 2, u = r - h.height * l / 2, 
                p = r + h.height * l / 2, g = h.width * l, f = h.height * l), p > n && (l = 2 * (n - r) / h.height, 
                w = c - h.width * l / 2, u = r - h.height * l / 2, v = c + h.width * l / 2, g = h.width * l, 
                f = h.height * l), this.setData({
                    gridArea: {
                        left: w,
                        top: u,
                        width: g,
                        height: f
                    }
                });
            } else if (0 == this.data.touchPos) {
                var D = a - o, P = i - s;
                (w = h.left + D) < 0 && (w = 0), (u = h.top + P) < 0 && (u = 0), w + (g = h.width) > 600 && (w = 600 - g), 
                u + (f = h.height) > n && (u = n - f), this.setData({
                    gridArea: {
                        left: w,
                        top: u,
                        width: g,
                        height: f
                    }
                });
            }
            this.refresh();
        }
    },
    onCanvasTouchEnd: function(t) {
        this.setData({
            touchPos: -1
        });
    },
    onCanvasTouchCancel: function(t) {
        this.setData({
            touchPos: -1
        });
    },
    showCropResult: function(t) {
        var e = this, a = this, i = this.data.gridArea, o = this.data.imgInfo, s = this.data.canvasInfo, h = 600, n = h * o.height / o.width;
        n > s.height && (n = s.height, h = n * o.width / o.height);
        var c = (s.width - h) / 2, r = (s.height - n) / 2, d = -c + i.left, l = -r + i.top;
        this.setData({
            showCropPicDialog: !1,
            showCropResultDialog: !0
        }), wx.createSelectorQuery().select("#cropResultCanvasId").fields({
            node: !0,
            size: !0
        }).exec(function(t) {
            var s = t[0].node, n = s.getContext("2d"), c = wx.getSystemInfoSync().pixelRatio;
            s.width = t[0].width * c, s.height = t[0].height * c;
            var r = s.createImage();
            console.log(r)
            r.onload = function() {
                console.log(777)
                var t = d * o.width / h, c = l * o.width / h, g = i.width * o.width / h, f = i.height * o.width / h;
                n.drawImage(r, t, c, g, f, 0, 0, s.width, s.height), wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: Math.floor(s.width),
                    height: Math.floor(s.height),
                    destWidth: 200,
                    destHeight: 200,
                    canvas: s,
                    success: function(t) {
                        
                        a.setData({
                            newFacePic: t.tempFilePath
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                }, e);
            }, r.src = a.data.cropPicPath;
        });
    },
    confirmUse: function(t) {
        var e = this, a = this.data.newFacePic;
        wx.getStorage({
            key: "faceList",
            success: function(t) {
                var i = JSON.parse(t.data);
                i.unshift(a), wx.setStorage({
                    key: "faceList",
                    data: JSON.stringify(i)
                }), e.setData({
                    showCropResultDialog: !1,
                    faceList: i,
                    selectedFacePic: a
                });
            },
            fail: function(t) {
                var i = [];
                i.push(a), wx.setStorage({
                    key: "faceList",
                    data: JSON.stringify(i)
                }), e.setData({
                    showCropResultDialog: !1,
                    faceList: i,
                    selectedFacePic: a
                });
            }
        });
    },
    onSelectFacePic: function(t) {
        this.setData({
            selectedFacePic: t.currentTarget.dataset.item
        });
    },
    onDeleteFacePic: function(t) {
        var e = this, a = t.currentTarget.dataset.item, i = this.data.selectedFacePic, o = this.data.faceList;
        wx.showModal({
            title: "提示",
            content: "确定要删除人脸照片吗？",
            success: function(t) {
                if (t.confirm) {
                    i == a && e.setData({
                        selectedFacePic: ""
                    });
                    var s = o.indexOf(a);
                    o.splice(s, 1), wx.setStorage({
                        key: "faceList",
                        data: JSON.stringify(o)
                    }), e.setData({
                        faceList: o
                    });
                } else t.cancel;
            }
        });
    },
    showLoading: function(t) {
        wx.showLoading({
            title: t,
            mask: !0
        });
    },
    hideLoading: function() {
        wx.hideLoading();
    },
    jump2Pay: function() {
        wx.navigateTo({
            url: "../pay/pay"
        });
    },
    makeFuceFusion: function() {
        var e = this;
        t.getAbility2Save(function() {
            e.doMakeFuceFusion();
        }, function() {
            e.doMakeFuceFusion();
        });
    },
    doMakeFuceFusion: function() {
        var e = this, a = this.data.selectedFacePic;
       
        null != a && void 0 !== a && "" != a.trim() ? (e.showLoading("换装中，请稍后"), wx.getFileSystemManager().readFile({
            filePath: a,
            encoding: "base64",
            success: function(a) {

                var i = a.data, o = e.data.faceItem;
                console.log(o.id);
                wx.request({
                    url: "https://www.slimeraso.com/face/huan",
                    method: "POST",
                    data: {
                        packageName: t.globalData.packageName,
                        appName: t.globalData.appName,
                        //packageName: '换脸换装视频',
                        faceId: o.id,
                        Image: i
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(a) {
                        var i = a.data;
                        console.log(i);
                        var o = i.taskId;
                        if (o <= 0) {
                            e.hideLoading();
                            var s = i.message;
                            t.showModal(s);
                        } else e.queryTaskResult(o);
                    },
                    fail: function(t) {
                        e.hideLoading();
                    }
                });
            }
        })) : wx.showToast({
            title: "请选择一张人脸照片",
            icon: "error",
            duration: 2e3
        });
    },
    queryTaskResult: function(t) {
        var e = 0, a = this, i = function() {
            a.hideLoading(), clearInterval(a.data.intervalID), a.setData({
                intervalID: -1
            });
        };
        a.showLoading("换装中，请稍后");
        var o = setInterval(function() {
            if (++e % 5 > 0) {
                var o = 40 - e;
                return o <= 0 && (o = 1), void a.showLoading("剩余" + o + "秒");
            }
            wx.request({
                url: "https://www.slimeraso.com/face/getResult",
                data: {
                    taskId: t
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    var e = t.data.data, a = e.state;
                    if (0 == a) {
                        var o = e.videoUrl;
                        console.log(o), i(), wx.navigateTo({
                            url: "../preview/preview?videoUrl=" + o
                        });
                    } else if (1 == a) ; else if (2 == a) {
                        i();
                        var s = e.message;
                        wx.showToast({
                            title: s + ",人脸不完整，请换一张人脸照片",
                            icon: "error",
                            duration: 2e3
                        });
                    }
                    console.log(t);
                },
                fail: function(t) {
                    i();
                }
            });
        }, 1e3);
        this.setData({
            intervalID: o
        });
    },
    onShareAppMessage(e) {
        return {
            title: ad.sharetitle,
            imageUrl: ad.shareimg,
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