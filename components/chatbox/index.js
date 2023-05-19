// release/components/chatbox
const app = getApp();
// 时间工具类
const timeutil = require('./timeutil');
const cx = Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    roomId: {
      type: Number,
      observer: function (newVal, oldVal) {
        if (newVal != undefined && newVal != null) {
          // console.log(newVal)
        }

      }
    }
  },
  /**
   * 组件注册页面生命周期
   */
  pageLifetimes: {
    show: function () {
      // 页面被展示
    },
  },
  lifetimes: {
    attached() {
      var that = this;
      that.initMessageHistory();
      //初始化监听器
      // that.initWatcher();
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            systemInfo: res
          })
        }
      })
    },
    detached() {
      try {
      } catch (error) {
        console.log('--消息监听器关闭失败--')
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    
    openid: app.globalData.openid || wx.getStorageSync('openid'),
    scrollId: '',
    systemInfo: {},
    //消息记录列表
    chatList: [],
    //标记触顶事件
    isTop: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 预览图片
    viewImage(e) {
      // console.log(e)
      let url = e.currentTarget.dataset.url;
      wx.previewImage({
        urls: [url],
      })
    },
    //触顶事件
    tapTop() {
      console.log('--触顶--')
      var that = this;
      that.setData({
        isTop: true
      }, () => {
      })

    },
    //初始化
    initMessageHistory() {
      //初始化消息历史
      var that = this;
app.globalData.cht = that

const cht = app.globalData.cht;
    //       //文字逐个显示
    //   var story = "很久很久以前,有一个国王。";
    //   var i= 0;
    //   var time = setInterval(function(){
    //       var text = story.substring(0, i);
    //       i++;
    //       cht.data.chatList.push({
    //         "type": "rob",
    //         "content": text,
    //         "avatarUrl": "https://i-1.rar8.net/2023/2/24/e7a2033b-c04e-418c-a1a8-0c3a109557d1.png",
    //     });
    //     cht.setData({
    //         "type": "rob",
    //         "content": text,
    //         "avatarUrl": "https://i-1.rar8.net/2023/2/24/e7a2033b-c04e-418c-a1a8-0c3a109557d1.png",

    //     });
    //       that.setData({
    //           text: text
    //       });
    //       if (text.length == story.length) {
    //         //   console.log("定时器结束！");
    //           clearInterval(time);
    //       }
    //   },100)


      that.setData({
        chatList: [
          {
            type: "rob",
            content: "text",
            avatarUrl: "https://i-1.rar8.net/2023/2/24/e7a2033b-c04e-418c-a1a8-0c3a109557d1.png",
          },
          {
            type: "man",
            content: "text",
            avatarUrl: "https://i-1.rar8.net/2023/2/24/e7a2033b-c04e-418c-a1a8-0c3a109557d1.png",
          }
        ]
      })
    },
  }
})
