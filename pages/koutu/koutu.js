var t = getApp(),ad = t.globalData.cycadd,videoAd;

Page({
    data: {
        showSelectPicDialog: !1,
        showSelectColorDialog: !1,
        showSelectBgPicDialog: !1,
        touming_bg: t.pics.touming_bg,
        color_list: [ "#FEE231", "#EF262B", "#840CC7", "#FFFFFF", "#000000", "#1594FF", "#E7E7E7", "#C6C6C6", "#FF8913", "#0BB056", "#7ED321", "#427505", "#13CFD3", "#5113FF", "#DF009B", "#F5A622", "#F8E71C", "#8B572A", "#C989FF", "#C1CBD5", "#AFB0B2", "#939391", "#8596A6", "#9CA8B9", "#E9E9E7", "#FFFAF4", "#E7CDA0", "#A47C7F", "#B1A191", "#EABBDC", "#D196AA", "#CCC2C3", "#D9D0D5", "#CBD7F4", "#D4CDEC", "#F9E5CD", "#E9E8CF", "#D1D0BC", "#AF9E87", "#E9ECE2", "#FFEAE2", "#F6E2E0", "#F4C5C1", "#C49F98", "#893737", "#E0E5E1", "#B7C4B4", "#97A48B", "#7D8C6F", "#CAC0D3", "#B1A3C0", "#CAC4BD", "#C9B8A1" ],
        bg_pic_category_list: [ "风景背景", "纹路背景", "天空背景", "水墨背景", "水果背景", "多彩渐变", "纯色渐变", "手绘背景", "热背景", "聊天风景背景", "卡通背景", "怀旧背景", "简约", "黑金背景", "金色", "网格背景" ],
        bg_pic_category_id_list: [ "item0", "item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10", "item11", "item12", "item13", "item14", "item15" ],
        currentCategory: "风景背景",
        picListMap: {},
        pageIndex: 0,
        menuItemId: "item0",
        selectedBgPicUrl: "",
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
                t.updateFreeUse(e, "koutu");
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
        console.log(videoAd)
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
    saveResult: function(e) {
        var i = this;
        void 0 !== this.data.kouTuResultPicPath ? t.getAbility2Save(function() {
            i.doSaveResult(null);
        }, function() {
            t.getTokenStored(function(e) {
                null != e && t.getFreeUseState(e, function(t) {
                    1 == t.koutu ? i.setData({
                        showSelectSaveTypeDialog: !0
                    }) : i.jump2Pay();
                });
            });
        }) : wx.showToast({
            title: "请上传一张图片",
            icon: "error"
        });
    },
    doSaveResult: function(e) {
        t.showLoading("保存中");
        var i = this.data._canvas, a = this.data.picInfo, o = this.data.picArea, c = wx.getSystemInfoSync().pixelRatio, n = i.width / 600, s = Math.floor(o.left * n / c), h = Math.floor(o.top * n / c), l = Math.floor(o.width * n / c), r = Math.floor(o.height * n / c);
        wx.canvasToTempFilePath({
            x: s,
            y: h,
            width: l,
            height: r,
            destWidth: a.width,
            destHeight: a.height,
            canvas: i,
            success: function(i) {
                var a = i.tempFilePath;
                t.authWritePhotoAlbum(function() {
                    wx.saveImageToPhotosAlbum({
                        filePath: a,
                        success: function(i) {
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
            fail: function(e) {
                t.hideLoading(), wx.showToast({
                    title: "保存失败",
                    icon: "error"
                });
            }
        }, this);
    },
    selectBgPic: function(t) {
        void 0 !== this.data.kouTuResultPicPath ? this.showSelectBgPicDialog() : wx.showToast({
            title: "请上传一张图片",
            icon: "error"
        });
    },
    confirmSelectBgPic: function(t) {
        this.hideSelectBgPicDialog();
    },
    showSelectBgPicDialog: function() {
        this.setData({
            showSelectBgPicDialog: !0
        });
    },
    hideSelectBgPicDialog: function() {
        this.setData({
            showSelectBgPicDialog: !1
        });
    },
    onSelectPic: function(e) {
        var i = this, a = e.currentTarget.dataset.item;
        this.setData({
            selectedBgPicUrl: a.url
        }), t.downlodFile(a.url, function(t) {
            i.setBgPic(t);
        });
    },
    setBgPic: function(t) {
        this.setData({
            bgPicPath: t
        }), this.drawKouTuPic();
    },
    selectBgPicFromLocal: function(t) {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "album" ],
            success: function(t) {
                var i = t.tempFilePaths;
                e.setBgPic(i[0]);
            }
        });
    },
    onPageChange: function(t) {
        var e = this.data.bg_pic_category_list, i = t.detail.current;
        this.setData({
            currentCategory: e[i],
            menuItemId: "item" + i
        });
        var a = this.data.currentCategory;
        this.getBgPicList(a, function() {});
    },
    getBgPicList: function(t, e) {
        var i = this.data.picListMap[t];
        if (!(null != i && void 0 !== i && i.length > 0)) {
            var a = this;
            wx.request({
                url: "https://www.slimeraso.com/bgPic/getList",
                method: "POST",
                data: {
                    category: t,
                    page: 0,
                    pageSize: 100
                },
                header: {
                    "content-type": "application/json"
                },
                success: function(i) {
                    var o = i.data.data, c = a.data.picListMap;
                    c[t] = o, a.setData({
                        picListMap: c
                    }), e();
                }
            });
        }
    },
    selectPicCategory: function(t) {
        var e = t.currentTarget.dataset.item, i = this.getPageIndex(e);
        this.setData({
            currentCategory: e,
            pageIndex: i
        });
    },
    getPageIndex: function(t) {
        for (var e = this.data.bg_pic_category_list, i = 0; i < e.length; i++) if (e[i] == t) return i;
        return -1;
    },
    selectBgColorDrawPic: function(t) {
        void 0 !== this.data.orgPic ? this.showSelectColorDialog() : wx.showToast({
            title: "请上传一张图片",
            icon: "error"
        });
    },
    selectColor: function(t) {
        var e = t.currentTarget.dataset.item;
        this.setData({
            bgColor: e,
            bgPicPath: ""
        }), this.drawKouTuPic();
    },
    confirmSelectColor: function(t) {
        this.hideSelectColorDialog();
    },
    showSelectColorDialog: function() {
        this.setData({
            showSelectColorDialog: !0
        });
    },
    hideSelectColorDialog: function() {
        this.setData({
            showSelectColorDialog: !1
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
    uploadPic: function(e) {
        var i = this;
        this.showSelectPicDialog(function(e) {
            i.setData({
                orgPic: e
            }), t.pikaProcess(e, "抠图", function(t) {
                i.setData({
                    kouTuResultPicPath: t
                }), wx.getImageInfo({
                    src: t,
                    success: function(t) {
                        i.drawCanvas(t);
                    }
                });
            });
        });
    },
    draOrgPic: function(t) {
        var e = this.data.orgPic;
        if (void 0 !== e) {
            this.setData({
                bgColor: ""
            });
            var i = this;
            wx.getImageInfo({
                src: e,
                success: function(t) {
                    i.drawCanvas(t);
                }
            });
        } else wx.showToast({
            title: "请上传一张图片",
            icon: "error"
        });
    },
    drawOpacityPic: function(t) {
        this.setData({
            bgColor: "",
            bgPicPath: ""
        }), this.drawKouTuPic();
    },
    drawKouTuPic: function() {
        var t = this.data.kouTuResultPicPath;
        if (void 0 !== t) {
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
        var e = t.path, i = t.width, a = t.height;
        console.log(t.orientation), "left" != t.orientation && "right" != t.orientation || (i = t.height, 
        a = t.width);
        var o = this;
        wx.createSelectorQuery().select("#cropCanvasId").fields({
            node: !0,
            size: !0
        }).exec(function(t) {
            var c = t[0].node, n = c.getContext("2d"), s = wx.getSystemInfoSync().pixelRatio;
            c.width = t[0].width * s, c.height = t[0].height * s;
            var h = {
                width: 600,
                height: 600 * c.height / c.width
            };
            o.setData({
                canvasInfo: h,
                _canvas: c
            });
            c.height, c.width;
            var l = 600, r = l * a / i;
            r > h.height && (l = (r = h.height) * i / a);
            var g = {
                left: (h.width - l) / 2,
                top: (h.height - r) / 2,
                width: l,
                height: r
            }, u = {
                width: i,
                height: a
            };
            o.setData({
                picArea: g,
                picInfo: u
            });
            var d = o.data.bgPicPath, f = c.createImage();
            f.onload = function() {
                if (null != d && void 0 !== d && "" != d.trim()) {
                    var t = c.createImage();
                    t.onload = function() {
                        wx.getImageInfo({
                            src: d,
                            success: function(e) {
                                var i = g.width, a = i * e.height / e.width;
                                a < g.height && (i = (a = g.height) * e.width / e.height);
                                var s = {
                                    left: g.left + g.width / 2 - i / 2,
                                    top: g.top + g.height / 2 - a / 2,
                                    width: i,
                                    height: a
                                };
                                o.render(c, n, g, f, s, t);
                            }
                        });
                    }, t.src = d;
                } else o.render(c, n, g, f, null, null);
            }, f.src = e;
        });
    },
    
    render: function(t, e, i, a, o, c) {
        e.save();
        var n = t.width / 600;
        e.scale(n, n), e.clearRect(0, 0, 600, 600 * t.height / t.width);
        var s = this.data.bgColor;
        void 0 !== s && "" != s && (e.fillStyle = s, e.beginPath(), e.rect(i.left, i.top, i.width, i.height), 
        e.fill()), null != c && e.drawImage(c, o.left, o.top, o.width, o.height), e.drawImage(a, i.left, i.top, i.width, i.height), 
        e.restore();
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
    selectFromLocal: function(t) {
        var e = this.data.callbackAfterSelectPic;
        this.hideSelectPicDialog(t), wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "album" ],
            success: function(t) {
                var i = t.tempFilePaths;
                e(i[0]);
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
                var i = t.tempFilePaths;
                e(i[0]);
            }
        });
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
    onReady: function() {
        var t = this.data.currentCategory;
        this.getBgPicList(t, function() {});
    },
    onShow: function() {
        t.getNewestFolk(function(t) {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage(e) {
        return {
            title: 'AI智能抠图，一键抠图工具，永久免费',
        }
    },
    onShareTimeline() {
        console.log('分享朋友圈')
        return {
            title: 'AI智能抠图，一键抠图工具，永久免费',
        }
    },
    onAddToFavorites() {
        return {
            title: 'AI智能抠图，一键抠图工具，永久免费',
        }
    },
});