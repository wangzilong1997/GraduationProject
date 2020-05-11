const app = getApp()
var util = require('../../utils/utils.js');

Page({
  data: {
    totalScoreToPay: 0,
    goodsList: [],
    
    goodsJsonStr: "",
    desktop:"",
    orderId:""

    
  },
  onShow: function() {
    var that = this;
    var shopList = [];

    //购物车下单
    var shopCarInfoMem = wx.getStorageSync('shopCarInfo');
    
    that.setData({
      goodsList: shopCarInfoMem,
    });
    
  },

  onLoad: function(e) {
    
  },

 

  createOrder: function(e) {
    var that = this;
    console.log("创建订单")
    console.log(this.data.desktop);
    if (this.data.desktop ==""){
      wx.showToast({

        title: '请输入桌号',

        icon: 'none',

        duration: 2000//持续的时间

      })
    }else{
      var data = {}
      data.name = this.data.desktop.toString();
      data.phone = this.data.desktop.toString();
      data.address = this.data.desktop.toString();
      data.openid = "xxx";
      var items = [];
      var item = {};
      for (var i = 0; i < this.data.goodsList.list.length; i++) {
        item = {};
        item.productId = this.data.goodsList.list[i].goodsId;
        console.log(this.data.goodsList.list[i].goodsId)
        item.productQuantity = this.data.goodsList.list[i].number;
        items.push(item);
        console.log(items);
      }
      data.items = JSON.stringify(items);

      console.log(data);
      wx.request({
        url: 'https://www.wangshuaishuai.com/sell/buyer/order/create',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data,
        success: function (res) {
          console.log(res);

          that.setData({
            goodsList: [],
            orderId: res.data.data.orderId
          })
          wx.setStorageSync("shopCarInfo", {})
          wx.setStorageSync("orderId", res.data.data.orderId)
          util.http(app.globalData.url + "buyer/product/list", that.getProductData);
          wx.switchTab({
            url: "../../pages/my/index",
          })
        }

      })
    }
   
  },
  inputedit:function(e){
    console.log(e.detail.value);
    this.data.desktop = e.detail.value
    this.setData({
      desktop: this.data.desktop
    })
   
  },
  getProductData:function(e){
    console.log(e)
    console.log(e.data)
    wx.setStorageSync("data", e.data)
  }
  
  
  
})