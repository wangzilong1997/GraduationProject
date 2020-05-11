const app = getApp()
//const wxpay = require('../../utils/pay.js')
//const CONFIG = require('../../config.js')
//const WXAPI = require('../../wxapi/main')
Page({
  data: {
    balance: 0.00,
    freeze: 0,
    score: 0,
    score_sign_continuous: 0,
    data:{}
  },
  onLoad() {

  },
  onShow() {
    var that = this;
    var orderId = wx.getStorageSync("orderId")
    console.log("我的myonshow执行")
    wx.request({
      url: 'https://www.wangshuaishuai.com/sell/buyer/order/detail',
      method:"GET",
      data: { openid: "xxx", orderId: orderId},
      success:function(res){
        console.log(res.data);
        res.data.data.createTime = that.getLocalTime(res.data.data.createTime)
        that.setData({
          data: res.data.data
        })

      }
    })
  }, 
  getLocalTime:function (nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
  }
})