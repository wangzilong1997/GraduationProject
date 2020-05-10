var util = require('../../utils/utils.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    selectedLeftMenuItem:"",
    toView:"",
    goodsList: {
      saveHidden: true,
      totalPrice: 0,
      allSelect: true,
      noSelect: false,
      list: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.http(app.globalData.url + "buyer/product/list", this.getProductData);
    

  },
  onShow:function(){
    var data = wx.getStorageSync("data");
    this.setData({
      data: data
    })
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
    
    this.data.data.forEach(item => {
      if (e.detail.scrollTop >= (item.offsetTop - 155) && e.detail.scrollTop <= (item.offsetTop - 155 + item.height)) {
        that.setData({
          selectedLeftMenuItem: item.type
        })
      }
      
    })
  }, 
  selectClassesClick:function(e){
    var that = this;
    
    let dataset = e.currentTarget;
    
    let id = dataset.id;
    id = id.substring(13,id.length);
    
    that.setData({
      selectedLeftMenuItem: id,
      toView: 'categoryRType' + id //不能数字开头，所以开头加了productItem
    });
    
  }, 
  jiaBtnTap:function(e){
    console.log("加1");
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var list = this.data.goodsList.list;
    console.log(list);
    for (var i = 0; i < this.data.data.length; i++) {
      for (var j = 0; j < this.data.data[i].foods.length; j++) {
        if (this.data.data[i].foods[j].id == index) {
          this.data.data[i].foods[j].number = this.data.data[i].foods[j].number == undefined? 1 : this.data.data[i].foods[j].number + 1;
        }
      }

    }

    this.setData({
      data: this.data.data
    })
    wx.setStorageSync("data", this.data.data);

  },
  jianBtnTap: function (e) {
    console.log("减1");
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var list = this.data.goodsList.list;
    console.log(list);
    for(var i=0;i<this.data.data.length;i++){
      for (var j = 0; j < this.data.data[i].foods.length; j++) {
        if (this.data.data[i].foods[j].id == index){
          this.data.data[i].foods[j].number = this.data.data[i].foods[j].number == undefined || this.data.data[i].foods[j].number == 0 ? 0 : this.data.data[i].foods[j].number -1 ;
        }
      }
      
    }

    this.setData({
      data:this.data.data
    })
    wx.setStorageSync("data", this.data.data);
  }
  
})