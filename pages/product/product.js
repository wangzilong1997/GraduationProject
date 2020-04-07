var util = require('../../utils/utils.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    selectedLeftMenuItem:"",
    toView:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.http(app.globalData.url + "buyer/product/list", this.getProductData);
    

  },
  getProductData:function(e){
    console.log(e)
    console.log(e.data)
    this.setData({ data: e.data});
    console.log(this.data.data);
    //添加上坐标和高度
    this.data.data.forEach(item =>{
      wx.createSelectorQuery().select('#categoryRType' + item.type).boundingClientRect(rect => {
          item.offsetTop = rect.top;
          item.height = rect.height;
        }).exec()
    })
    console.log("11", this.data.data)
  },
  touchStart:function(e){
    var that = this;
    console.log(e,"滚动起来了")
    this.data.data.forEach(item => {
      if (e.detail.scrollTop >= (item.offsetTop - 155) && e.detail.scrollTop <= (item.offsetTop - 155 + item.height)) {
        that.setData({
          selectedLeftMenuItem: item.type
        })
      }
      console.log(that.data.selectedLeftMenuItem)
    })
  }, 
  selectClassesClick:function(e){
    var that = this;
    console.log(e)
    let dataset = e.currentTarget;
    console.log(dataset)
    let id = dataset.id;
    id = id.substring(13,id.length);
    console.log(id)
    that.setData({
      selectedLeftMenuItem: id,
      toView: 'categoryRType' + id //不能数字开头，所以开头加了productItem
    });
    
  }
})