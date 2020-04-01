var util = require('../../utils/utils.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.http(app.globalData.url + "buyer/product/list", this.getProductData)
  },
  getProductData:function(e){
    console.log(e)
    console.log(e.data)
    this.setData({ data: e.data});
  }
})