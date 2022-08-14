var t = getApp();

Component({
    data: {
        selected: 0,
        color: "#7C7E94",
        selectedColor: "#E91E63",
        list: [ {
            pagePath: "/pages/main/main",
            iconPath: t.pics.ico_tab_huan_nor_xxh,
            selectedIconPath: t.pics.ico_tab_huan_pre_xxh,
            text: "换装变脸"
        }, {
            pagePath: "/pages/first/first",
            iconPath:t.pics.ico_tab_video_nor_xxh ,
                    selectedIconPath:t.pics.ico_tab_video_pre_xxh ,
                    text: "工具箱"
        } ]
    },
    attached: function() {
        var e = this;
        t.getFaceFusionState(function(a) {
            if (1 == a) {
                var i = [ {
                    pagePath: "/pages/main/main",
                    iconPath: t.pics.ico_tab_huan_nor_xxh,
                    selectedIconPath: t.pics.ico_tab_huan_pre_xxh,
                    text: "换装变脸"
                 
                }, {
                    pagePath: "/pages/first/first",
                    iconPath:t.pics.ico_tab_video_nor_xxh ,
                    selectedIconPath:t.pics.ico_tab_video_pre_xxh ,
                    text: "工具箱"
                // }, {
                //     pagePath: "/pages/mine/mine",
                //     iconPath: t.pics.ico_tab_my_nor_xxh,
                //     selectedIconPath: t.pics.ico_tab_my_pre_xxh,
                //     text: "我的"
                } ];
                e.setData({
                    list: i
                });
            }
        });
    },
    methods: {
        switchTab: function(t) {
            var e = t.currentTarget.dataset, a = e.path;
            
            wx.switchTab({
                url: a
            }), this.setData({
                selected: e.index
            });
            console.log(this.data.selected)
        }
    }
});