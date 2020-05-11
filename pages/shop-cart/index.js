const WXAPI = require('../../wxapi/main')
const app = getApp()
Page({
  data: {
    goodsList: {
      saveHidden: true,
      totalPrice: 30,
      allSelect: true,
      noSelect: false,
      list: [{
        goodsId: 125927,
        pic:"https://cdn.it120.cc/apifactory/2019/03/25/ecea13665301ad26df1a7a0c0612d043.jpeg",
        name: "小黄鱼面",
        price:30,
        active:true,
        number:1
      }],
      
    },
    delBtnWidth: 120, //删除按钮宽度单位（rpx）
    data: {}
  },

  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2); //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  onLoad: function () {
    this.initEleWidth();
    this.onShow();
    var data = wx.getStorageSync("data");
    this.setData({
      data:data
    })
  },
  onShow: function () {
    
    console.log(wx.getStorageSync("data"))
    var data = wx.getStorageSync("data"); 
    this.data.goodsList.totalPrice = 0;
    var shopList = this.data.goodsList.list;
    shopList = []
    for (var i = 0; i <data.length; i++) {
      
      console.log(i)
      console.log(data[i].foods.length)
      for (var j = 0; j <data[i].foods.length; j++) {
        console.log(data[i].foods[j].number)
        if (data[i].foods[j].number > 0) {
         
          this.data.goodsList.totalPrice += data[i].foods[j].number * data[i].foods[j].price
         
          var index = data[i].foods[j].id;
          console.log(index);
          
          var shopItem = {};
          console.log(shopList)
          shopItem.goodsId = index;
          shopItem.pic = data[i].foods[j].icon;
          shopItem.name = data[i].foods[j].name;
          shopItem.price = data[i].foods[j].price;
          shopItem.number = data[i].foods[j].number;
          shopItem.label = data[i].foods[j].description;
          shopList.push(shopItem)
        }
      }
      

    }
    this.data.goodsList.list = shopList;
    this.data.goodsList.totalPrice = this.data.goodsList.totalPrice.toFixed(2);
    this.setData({
      goodsList: this.data.goodsList
    })
   
    
  },
  toIndexPage: function () {
    console.log("去选购美食")
    wx.switchTab({
      url: '../product/product',
    })
  },
  jianBtnTap:function(e){
    console.log("减1");
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var list = this.data.goodsList.list;
    console.log(list);
 
    for (var j = 0; j < this.data.goodsList.list.length; j++) {
      if (this.data.goodsList.list[j].goodsId == index) {
        this.data.goodsList.list[j].number = this.data.goodsList.list[j].number == 0 ? 0 : this.data.goodsList.list[j].number - 1;
      }
    }

    for (var i = 0; i < this.data.data.length; i++) {
      for (var j = 0; j < this.data.data[i].foods.length; j++) {
        if (this.data.data[i].foods[j].id == index) {
          this.data.data[i].foods[j].number = this.data.data[i].foods[j].number == undefined || this.data.data[i].foods[j].number == 0 ? 0 : this.data.data[i].foods[j].number - 1;
        }
      }

    }
    var tempprice = 0;
    for (var i = 0; i < this.data.goodsList.list.length; i++) {
      console.log(this.data.goodsList.list.length)
      tempprice += this.data.goodsList.list[i].price * this.data.goodsList.list[i].number;

    }
    this.data.goodsList.totalPrice = tempprice.toFixed(2);
    this.setData({
      goodsList: this.data.goodsList,
      data:this.data.data
    })
    wx.setStorageSync("data", this.data.data);
  },
  jiaBtnTap: function (e) {
    console.log("加1");
    var index = e.currentTarget.dataset.index;
    console.log(index)
    console.log(e)
    var list = this.data.goodsList.list;
    console.log(list);

    for (var j = 0; j < this.data.goodsList.list.length; j++) {
      console.log(this.data.goodsList.list[j].goodsId)
      if (this.data.goodsList.list[j].goodsId == index) {
        this.data.goodsList.list[j].number = this.data.goodsList.list[j].number + 1;
        console.log(this.data.goodsList.list[j].number)
      }
    }
    
    for (var i = 0; i < this.data.data.length; i++) {
      for (var j = 0; j < this.data.data[i].foods.length; j++) {
        if (this.data.data[i].foods[j].id == index) {
          this.data.data[i].foods[j].number = this.data.data[i].foods[j].number + 1;
        }
      }

    }
    var tempprice = 0;
    for (var i = 0; i < this.data.goodsList.list.length;i++){
      console.log(this.data.goodsList.list.length)
      tempprice += this.data.goodsList.list[i].price * this.data.goodsList.list[i].number;
      
    }
    this.data.goodsList.totalPrice = tempprice.toFixed(2);
    this.setData({
      goodsList: this.data.goodsList,
      data: this.data.data
    })
    wx.setStorageSync("data", this.data.data);
  },
  toPayOrder:function(){
    console.log("toPayOrder点击");
    this.navigateToPayOrder();
    wx.setStorageSync("shopCarInfo", this.data.goodsList);
  },
  navigateToPayOrder: function () {
    wx.hideLoading();
    wx.navigateTo({
      url: "/pages/to-pay-order/index"
    })
  }



})