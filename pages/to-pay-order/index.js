const app = getApp()


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
    console.log("创建订单")
  },
  
  
  
})