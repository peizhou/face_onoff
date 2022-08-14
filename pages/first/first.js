var t = getApp(),ad = t.globalData.cycadd;
let interstitialAd = null
Page({
    data: {
        sptq: t.pics.sptq,
        ktqbj: t.pics.ktqbj,
        yjqsy: t.pics.yjqsy,
        dmhkt: t.pics.dmhkt,
        kthtx: t.pics.kthtx,
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

    onReady: function() {},
    kouTu: function(t) {
        wx.navigateTo({
            url: "../koutu/koutu"
        });
    },
    dongman: function(t) {
        wx.navigateTo({
            url: "../dongman/dongman"
        });
    },
    katong: function(t) {
        wx.navigateTo({
            url: "../katong/katong"
        });
    },
    videoExtract: function(t) {
        wx.navigateTo({
            url: "../videoExtract/videoExtract"
        });
    },
 
    watermark: function(t) {
        wx.navigateTo({
            url: "../watermark/watermark"
        });
    },
    onShow: function() {
        "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
            selected: 1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage(e) {
        return {
            title: '人工智能工具箱，AI智能神器工具合集'
        }
    },
    onShareTimeline() {
        console.log('分享朋友圈')
        return {
            title: '人工智能工具箱，AI智能神器工具合集'
        }
    },
    onAddToFavorites() {
        return {
            title: '人工智能工具箱，AI智能神器工具合集'
        }
    },
});