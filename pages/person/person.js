// pages/person/person.js
import {fetch} from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    isLoading:false,
    total:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getCollectTotal();
    this.setData({
      isLoading:true
    });
    wx.getUserInfo({
      success:data=>{
        // console.log(data);
        this.setData({
          userInfo:data.userInfo,
          isLoading:false
        })
      }
    })
  },
  jumpCollection(){
    wx.navigateTo({
      url: '/pages/collection/collection',
    })
  },
  getCollectTotal(){
    return new Promise((resolve,reject)=>{
      this.setData({
        isLoading:true
      })
      fetch.get('/collection/total').then((res) => {
        // console.log(res);
        resolve(res);
        let total = this.data.total;
        this.setData({
          total: res.data,
        })
      })
    }) 
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getCollectTotal().then(()=>{
      this.setData({
        isLoading:false
      })
    });
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})