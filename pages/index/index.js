// 获取全局APP
const app = getApp();

//socket 插件连接
const io = require('../../utils/weapp.socket.io')

const uid=require('../../public/uuid.js')
// socket 连接地址
var socketUrl = '127.0.0.1:20000'
// socket 状态更新
var socketMessage = ''
// 上下文对象
var that
var resIndex=0
var str = "";
var UUID="";

// 获取计时器函数
Page({
    /**
     * 页面的初始数据
     */
    data: {
        login: false,
        //输入框距离
        InputBottom: 0,
        roomId: 1,
        userInfo: {
            avatarUrl: ""
        },
        content: '',
        groups: [{
            text: '点歌',
            value: 1
        },]
    },

    InputFocus(e) {
        this.setData({
            InputBottom: e.detail.height
        })
    },
    InputBlur(e) {
        this.setData({
            InputBottom: 0
        })
    },
    // 页面加载
    onLoad: function (options) {
        wx.closeSocket();
        UUID="";
        //建立连接
        wx.connectSocket({
            //url: "wss://www.xcuitech.com/ws",
            url: "ws://localhost:8082/ws",
        })
        UUID = uid.uuid();
        console.log(UUID)
        //连接成功
        wx.onSocketOpen(function () {
            
            wx.setNavigationBarTitle({
                title: "(在线)"
            })
            wx.sendSocketMessage({
                data: '{"type":"login","uid":"'+UUID+'","msg":"我登陆了"}',
            })
        })

        var that = this;
        wx.onSocketMessage(function (data) {
            const cht = app.globalData.cht;
            str += data.data;
            // console.log("str:", str)
            // 清空之前的定时器
            clearInterval(that.timer);

            // 设置一个新的定时器，每隔一定时间添加一个字符到聊天列表中
            var index = 0;
            that.timer = setInterval(function () {
                if (index < str.length) {
                    if (resIndex==0){
                        cht.data.chatList.push({
                            "type": "rob",
                            "content": str,
                            "avatarUrl": "https://i-1.rar8.net/2023/2/24/e7a2033b-c04e-418c-a1a8-0c3a109557d1.png",
                        });
                    }else{
                        //console.log("ln:", cht.data.chatList.length)
                        cht.data.chatList[cht.data.chatList.length-1].content=str
                    }
                    cht.setData({
                        chatList: cht.data.chatList
                    });
                    index++;
                    resIndex++;
                } else {
                    clearInterval(that.timer);
                    str=""
                }
            }, 50); // 每 100 毫秒添加一个字符到聊天列表中
        });

        //连接失败
        wx.onSocketError(function () {
            wx.setNavigationBarTitle({
                title: "(离线)"
            })
            console.log('websocket连接失败！');
        })

    },


    // 页面销毁时
    onUnload: function (options) {
        wx.closeSocket()
    },
    async submit() {
        var that = this;
        //已登录用户
        wx.showLoading({
            title: '信息发送',
        })
        const cht = app.globalData.cht
        const content = that.data.content
        console.log(cht.data.chatList.push({
            "type": "man",
            "content": that.data.content,
            "avatarUrl": "https://pic2.zhimg.com/v2-37c9f66185c88633fc1ec099c1dbae70_r.jpg?source=1940ef5c",
        }))
        resIndex=0;
        str = "";

        cht.setData({
            chatList: cht.data.chatList,
        })
        that.setData({
            content: ''
        })
        wx.hideLoading();

        console.log("q:", content)

        wx.sendSocketMessage({
            
            data: '{"type":"msg","uid":"'+UUID+'","msg":"' + content + '"}',
            //data:content,
        })
       
    },
    /**
    * 用户点击右上角分享
    */
    onShareAppMessage: function () {
        let userID = 1
        return {
            title: 'G_P_T',
            path: 'pages/index/index',
            imageUrl: 'https://i-1.rar8.net/2023/2/24/e7a2033b-c04e-418c-a1a8-0c3a109557d1.png',
            success: function (res) {
                wx.showToast({
                    title: "分享成功",
                    icon: 'success',
                    duration: 500
                })
            },
            fail: function (res) {
                // 分享失败
            },
        }
    },
    /**
     * 朋友圈分享
     */
    onShareTimeline: function () {
        return {
            title: 'G_P_T',
            imageUrl: 'https://i-1.rar8.net/2023/2/24/e7a2033b-c04e-418c-a1a8-0c3a109557d1.png'
        }
    },
})