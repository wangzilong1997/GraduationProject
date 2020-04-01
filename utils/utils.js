function http(target, callBack) {
  wx.request({
    url: target,
    method: 'GET',
    header: {
      "Content-Type": ""
    },
    success: function (res) {
      console.log(res)
      callBack(res.data)
    },
    fail: function (res) {
      console.log(res)
    },
    complete: function (res) {
      console.log(res)
    }
  })
}




module.exports = {
  http: http
}