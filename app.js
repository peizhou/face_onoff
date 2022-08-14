


var t = "https://jsstatic.easyfeng.net/xiaochengxu_";

App({
    onLaunch: function() {
        var t = this;
        this.getTokenStored(function(e) {
            null != e && t.getUserInfo(e, function(t) {
                wx.setStorage({
                    key: "folk",
                    data: t
                });
            });
        }), wx.setStorage({
            key: "faceFusion",
            data: -1
        });
        var n = wx.getUpdateManager();
        n.onCheckForUpdate(function (n) {
          // console.log(n.hasUpdate);
        }), n.onUpdateReady(function () {
          wx.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启应用？",
            success: function (o) {
              o.confirm && n.applyUpdate();
            }
          });
        }), n.onUpdateFailed(function () {
          wx.showModal({
            title: "更新提示",
            content: "新版本下载失败",
            showCancel: !1
          });
        });
    },
   
    globalData: {
        cycadd:{
            // 插屏广告id
            inid:'adunit-b60bfe4c7facf966',
            // 插屏广告频率
            intime:18,//秒
            // 原生广告id
            cmid:'adunit-4d5ac86446b1c6a6',
            // 激励广告id
            vid:'adunit-aae2aca6be4e698b',

            // 视频换装与去水印
                vad:{
                    // 看一次广告可免费使用时长
                    vtime:12,//小时
                    // 广告前提醒
                    vshow:'看一次广告，即可在12小时内无限保存视频',
                },
            // 抠图，动漫化等等图片类
            pad:{
                // 看一次广告可免费使用时长
                vtime:6,//小时
                // 广告前提醒
                vshow:'看一次广告，即可在6小时内无限保存图片',
            },
            // 分享标题
            sharetitle:'一键短视频换脸神器，永久免费',
            // 分享封面
            shareimg:'https://cycphoto.oss-cn-guangzhou.aliyuncs.com/upload/20220120/d6a822e6c952931aea761e89ae15ca81.png',

           




            // 防录屏水印
            vwater:'微信搜小程序：木异阁',

            // 公共函数，不要动
            gettime: function(){
                return  Date.parse(new Date())/1000;
            },   
        },
        versionCode: 103,
        userInfo: null,
        packageName: "com.xishuai.facefusionmicro",
        appName: "换脸换装视频",
        VIP_LEVEL_UN_PAY: 0,
        VIP_LEVEL_PAY: 1,
        VIP_LEVEL_FOREVER: 2,
        QQ: "807090044",
        PKAPIKEY: "f06542fbc2c045f283d89a08db0b2036",
        pic_url_pre: "https://jsstatic.easyfeng.net/xiaochengxu_"
    },
    pics: {
        icon_camera: t + "icon_camera.png",
        cdkey: t + "cdkey.png",
        ring: t + "ring.png",
        standard_face: t + "standard_face.png",
        head_ico: t + "head_ico.png",
        vip_1: t + "vip_1.png",
        vip_2: t + "vip_2.png",
        vip_3: t + "vip_3.png",
        setting_yonghuxieyi_ico: t + "setting_yonghuxieyi_ico.png",
        lis_open_arrow_ico_nor: t + "lis_open_arrow_ico_nor.png",
        setting_service_ico: t + "setting_service_ico.png",
        pay_card: t + "pay_card.png",
        vip_tag_cdkey: t + "vip_tag_cdkey.png",
        vip_new: t + "vip_new.png",
        vip_hot: t + "vip_hot.png",
        vip_recommend: t + "vip_recommend.png",
        vip_best_value: t + "vip_best_value.png",
        make_pic_fangda_ico_nor: t + "make_pic_fangda_ico_nor.png",
        koutu_xxh: t + "koutu_xxh.png",
        qushuiying_xxh: t + "qushuiying_xxh.png",
        dmfg_xxh: t + "dmfg_xxh.png",
        katong_xxh: t + "katong_xxh.png",
        ico_tab_video_nor_xxh: t + "ico_tab_video_nor_xxh.png",
        ico_tab_video_pre_xxh: t + "ico_tab_video_pre_xxh.png",
        ico_tab_huan_nor_xxh: t + "ico_tab_huan_nor_xxh.png",
        ico_tab_huan_pre_xxh: t + "ico_tab_huan_pre_xxh.png",
        ico_tab_my_nor_xxh: t + "ico_tab_my_nor_xxh.png",
        ico_tab_my_pre_xxh: t + "ico_tab_my_pre_xxh.png",
        touming_bg: t + "touming_bg.png",
        dmhkt: t + "dmhkt.png",
        kthtx: t + "kthtx.png",
        ktqbj: t + "ktqbj.png",
        sptq: t + "sptq.png",
        yjqsy: t + "yjqsy.png",
        icon_video_extract: t + "icon_video_extract.png",
        bg_tip: t + "bg_tip.png",
        save_times_out: t + "save_times_out.png",
        tip: t + "tip.png",
        title_save_one: t + "title_save_one.png",
        vip_icon: t + "vip_icon.png"
    },
    onForkGet: function(t, e) {
        var a = t.data.data, n = a.token, o = a.folk;
        wx.setStorage({
            key: "token",
            data: n
        }), wx.setStorage({
            key: "folk",
            data: o
        }), e(n, o);
    },
    getToken: function(t) {
        var e = this;
        this.getTokenStored(function(a) {
            null != a ? t(a) : wx.showModal({
                title: "提示",
                content: "您尚未登录，是否要去登录",
                success: function(a) {
                    a.confirm ? e.login(function(e, a) {
                        t(e);
                    }) : a.cancel && t(null);
                }
            });
        });
    },
    getTokenStored: function(t) {
        wx.getStorage({
            key: "token",
            success: function(e) {
                var a = e.data;
                t(a);
            },
            fail: function(e) {
                t(null);
            }
        });
    },
    getFolkStored: function(t) {
        wx.getStorage({
            key: "folk",
            success: function(e) {
                var a = e.data;
                t(a);
            },
            fail: function(e) {
                t(null);
            }
        });
    },
    updateFork: function(t) {
        var e = this;
        this.getTokenStored(function(a) {
            null != a && e.getUserInfo(a, function(e) {
                wx.setStorage({
                    key: "folk",
                    data: e
                }), t(e);
            });
        });
    },
    getNewestFolk: function(t) {
        var e = this;
        wx.getStorage({
            key: "folkNeedUpdate",
            success: function(a) {
                1 == a.data ? e.updateFork(function(e) {
                    t(e), wx.setStorage({
                        key: "folkNeedUpdate",
                        data: 0
                    });
                }) : e.getFolkStored(function(e) {
                    t(e);
                });
            },
            fail: function(a) {
                e.getFolkStored(function(e) {
                    t(e);
                });
            }
        });
    },
    getUserInfo: function(t, e) {
        wx.request({
            url: "https://www.slimeraso.com/appUser/getAppUser",
            method: "POST",
            data: {
                packageName: this.globalData.packageName
            },
            header: {
                "content-type": "application/json",
                "X-Auth-Token": t
            },
            success: function(t) {
                var a = t.data.data.folk;
                e(a);
            },
            fail: function(t) {
                e(null);
            }
        });
    },
    getFolk: function(t) {
        var e = this;
        this.getFolkStored(function(a) {
            null != a ? t(a) : e.getTokenStored(function(a) {
                null == a ? wx.showModal({
                    title: "提示",
                    content: "您尚未登录，是否要去登录",
                    success: function(a) {
                        a.confirm ? e.login(function(e, a) {
                            t(a);
                        }) : a.cancel && t(null);
                    }
                }) : e.getUserInfo(a, t);
            });
        });
    },
    login: function(t) {
        var e = this;
        wx.getUserProfile({
            desc: "用于完善会员资料",
            success: function(a) {
                var n = a.userInfo;
                wx.login({
                    success: function(a) {
                        a.code ? wx.request({
                            url: "https://www.slimeraso.com/wx/microLogin",
                            method: "POST",
                            data: {
                                code: a.code,
                                packageName: e.globalData.packageName,
                                systemInfo: "",
                                userInfo: n
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(a) {
                                e.onForkGet(a, t);
                            },
                            fail: function(t) {}
                        }) : console.log("登录失败！" + a.errMsg);
                    }
                });
            },
            fail: function(t) {
                console.log(t);
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
    getHashCode: function(t, e) {
        e || (t = t.toLowerCase());
        var a, n = 1315423911;
        for (a = t.length - 1; a >= 0; a--) n ^= (n << 5) + t.charCodeAt(a) + (n >> 2);
        return 2147483647 & n;
    },
    downlodFile: function(t, e) {
        var a = this, n = wx.env.USER_DATA_PATH + "/" + a.getHashCode(t) + ".png";
        wx.getFileInfo({
            filePath: n,
            success: function(t) {
                e(n);
            },
            fail: function(o) {
                a.showLoading("下载中"), wx.downloadFile({
                    url: t,
                    filePath: n,
                    success: function(t) {
                        if (200 === t.statusCode) {
                            a.hideLoading();
                            var n = t.filePath;
                            e(n);
                        }
                    },
                    fail: function(t) {
                        a.hideLoading(), wx.showToast({
                            title: "下载失败",
                            icon: "error"
                        });
                    }
                });
            }
        });
    },
    processPkResult: function(t, e) {
        var a = this, n = JSON.parse(t.data).data.imageBase64, o = wx.getFileSystemManager(), i = Date.parse(new Date()), c = wx.env.USER_DATA_PATH + "/" + i + ".png";
        o.writeFile({
            filePath: c,
            data: n,
            encoding: "base64",
            success: function(t) {
                a.hideLoading(), e(c);
            },
            fail: function(t) {}
        });
    },
    pikaProcess: function(t, e, a) {
        var n = "", o = "", i = "";
        "抠图" == e ? (n = "https://picupapi.tukeli.net/api/v1/matting2?mattingType=6", o = "抠图中...", 
        i = "抠图失败") : "动漫" == e ? (n = "https://picupapi.tukeli.net/api/v1/matting2?mattingType=11", 
        o = "处理中...", i = "处理失败") : "卡通" == e && (n = "https://picupapi.tukeli.net/api/v1/cartoonSelfie2?cartoonType=1", 
        o = "处理中...", i = "处理失败"), this.showLoading(o);
        var c = this;
        wx.uploadFile({
            url: n,
            filePath: t,
            name: "file",
            header: {
                APIKEY: c.globalData.PKAPIKEY,
                "Content-Type": "multipart/form-data"
            },
            success: function(t) {
                c.processPkResult(t, a);
            },
            fail: function(t) {
                c.hideLoading(), wx.showToast({
                    title: i,
                    icon: "error"
                });
            }
        });
    },
    isVipUser: function(t) {
        return null != t && (t.vipLevel != this.globalData.VIP_LEVEL_UN_PAY && (t.vipLevel == this.globalData.VIP_LEVEL_FOREVER || t.vipLevel == this.globalData.VIP_LEVEL_PAY && !t.hasExpired));
    },
    getAbility2Save: function(t, e) {
        var a = this;
        this.getFolk(function(n) {
            null != n && (a.isVipUser(n) ? t() : e());
        });
    },
    getFreeUseState: function(t, e) {
        wx.request({
            url: "https://www.slimeraso.com/freeUse/getState",
            method: "POST",
            data: {
                packageName: this.globalData.packageName
            },
            header: {
                "content-type": "application/json",
                "X-Auth-Token": t
            },
            success: function(t) {
                var a = t.data.data;
                e(a);
            },
            fail: function(t) {
                e(null);
            }
        });
    },
    updateFreeUse: function(t, e) {
        wx.request({
            url: "https://www.slimeraso.com/freeUse/update",
            method: "POST",
            data: {
                packageName: this.globalData.packageName,
                value: e
            },
            header: {
                "content-type": "application/json",
                "X-Auth-Token": t
            },
            success: function(t) {},
            fail: function(t) {}
        });
    },
    authWritePhotoAlbum: function(t) {
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.writePhotosAlbum"] ? t() : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function(e) {
                        t();
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "请手动授权",
                            icon: "error"
                        });
                    }
                });
            },
            fail: function(t) {}
        });
    },
    showModal: function(t) {
        wx.showModal({
            content: t,
            showCancel: !1,
            confirmColor: "#FD4274",
            success: function(t) {}
        });
    },
    getFaceFusionState: function(t) {
        var e = this;
        wx.getStorage({
            key: "faceFusion",
            success: function(a) {
                var n = a.data;
                -1 != n ? t(n) : e.getFaceFusionStateFromServer(t);
            },
            fail: function(a) {
                e.getFaceFusionStateFromServer(t);
            }
        });
    },
    getFaceFusionStateFromServer: function(t) {
        wx.request({
            url: "https://www.slimeraso.com/appModule/getState",
            data: {
                packageName: this.globalData.packageName,
                moduleName: "faceFusion",
                code: this.globalData.versionCode
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var a = e.data.data;
                wx.setStorage({
                    key: "faceFusion",
                    data: a
                }), t(a);
            },
            fail: function(e) {
                wx.setStorage({
                    key: "faceFusion",
                    data: 0
                }), t(0);
            }
        });
    },
    
    getPayStateFromServer: function(t) {
        wx.request({
            url: "https://www.slimeraso.com/appModule/getState",
            data: {
                packageName: this.globalData.packageName,
                moduleName: "pay",
                code: this.globalData.versionCode
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var a = e.data.data;
                wx.setStorage({
                    key: "pay",
                    data: a
                }), t(a);
            },
            fail: function(e) {
                wx.setStorage({
                    key: "pay",
                    data: 0
                }), t(0);
            }
        });
    }
});