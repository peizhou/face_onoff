var t = getApp(),ad = t.globalData.cycadd;
Page({
    data: {
        scrollX: !0,
        showScrollBar: !1,
        enhanced: !0,
        enableFlex: !0,
        categorys: [],
        faceListMap: {},
        pageNoMap: {},
        isLastPageMap: {},
        currentCategory: "热门推荐",
        menuItemId: "item0",
        pageIndex: 0,
        autoplay: !1,
        faceRefreshEnabled: !0,
        refresherTriggered: !1,
        cadid:ad.cmid
    },
    onLoad: function(t) {
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
    onReady: function() {
        var t = this;
        this.getCategoryList(function() {
            var e = t.data.currentCategory;
            t.getFaceList(e, 0, function() {});
        });
    },
    getFaceList: function(t, e, a) {
        var n = this;
        wx.request({
            url: "https://www.slimeraso.com/face/getSimpleList",
            method: "POST",
            data: {
                category: "热门推荐" == t ? "" : t,
                page: e
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                var o = e.data, r = (o.code, o.data), i = o.pageInfo, s = n.data.faceListMap, c = n.data.pageNoMap, g = n.data.isLastPageMap, u = [], h = 0;
                0 == i.page ? s[t] = u : h = (u = s[t]).length, console.log(i), c[t] = i.page;
                for (var l = 0; l < r.length; l++) u[h + l] = r[l];
                var d = !1;
                u.length >= i.total && (d = !0), g[t] = d, n.setData({
                    faceListMap: s,
                    pageNoMap: c,
                    isLastPageMap: g
                }), console.log(n.data.faceListMap),a();
            }
        });
    },
    getCategoryList: function(t) {
        var e = this;
        wx.request({
            url: "https://www.slimeraso.com/face/getCategoryList",
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                var n = a.data, o = (n.code, n.data), r = [];
                r[0] = {
                    index: 0,
                    id: "item0",
                    value: "热门推荐"
                };
                for (var i = 0; i < o.length; i++) r[i + 1] = {
                    index: i + 1,
                    id: "item" + (i + 1),
                    value: o[i].title
                };
                var s = {}, c = {};
                for (i = 0; i < r.length; i++) {
                    var g = r[i];
                    s[g.value] = -1, c[g.value] = !1;
                }
                e.setData({
                    categorys: r,
                    currentCategory: r[0].value,
                    pageNoMap: s,
                    isLastPageMap: c
                }), t();
            }
        });
    },
    onShow: function() {
        var e = this;
        "function" == typeof this.getTabBar && this.getTabBar() && t.getFaceFusionState(function(t) {
            console.log(t)
            1 == t && e.getTabBar().setData({
                selected: 0
            });
        });
    },
 
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        console.log("onReachBottom");
    },
    onReachBottom: function() {
        console.log("onReachBottom");
    },
    getPageIndex: function(t) {
        for (var e = this.data.categorys, a = 0; a < e.length; a++) if (e[a].value == t) return a;
        return -1;
    },
    selectCategory: function(t) {
        this.setData({
            currentCategory: t.currentTarget.dataset.item,
            pageIndex: this.getPageIndex(t.currentTarget.dataset.item)
        });
    },
    onPageChange: function(t) {
        var e = this.data.categorys, a = t.detail.current;
        this.setData({
            currentCategory: e[a].value,
            menuItemId: "item" + a
        });
        var n = this.data.currentCategory;
        this.getFaceList(n, 0, function() {});
    },
    onRefresh: function() {
        var t = this, e = this.data.currentCategory;
        this.getFaceList(e, 0, function() {
            t.setData({
                refresherTriggered: !1
            });
        });
    },
    getNextPageFaceList: function() {
        var t = this, e = this.data.currentCategory, a = this.data.pageNoMap[e];
        this.data.isLastPageMap[e] || (console.log(a + 1), this.getFaceList(e, a + 1, function() {
            t.setData({
                refresherTriggered: !1
            });
        }));
    },
    onScrollToLower: function() {
        this.getNextPageFaceList();
    },
    onSelectFace: function(t) {
        var e = t.currentTarget.dataset.item, a = JSON.stringify(e);
        wx.navigateTo({
            url: "../fusion/fusion?item=" + a
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