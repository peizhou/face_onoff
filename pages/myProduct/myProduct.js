var n = getApp();

Page({
    data: {
        shareList: []
    },
    onLoad: function(o) {
        n.getToken(function(n) {});
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});