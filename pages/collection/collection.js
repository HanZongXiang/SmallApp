// pages/collection/collection.js
import {fetch} from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:false,
    pn: 1,
    size: 10,
    collections:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow: function (options) {
    this.getCollection();
  },
  getCollection() {
    let pn = this.data.pn;
    let size = this.data.size;
    this.setData({
      isLoading:true
    })
    fetch.get('/collection', { pn, size }).then(res => {
      console.log(res);
      this.setData({
        collections:res.data,
        isLoading:false
      })
      // console.log(this.data.collections)
    }).catch(err=>{
      this.setData({
        isLoading:false
      })
    });
  },
  //收藏书籍查看
  jumpCollect(event){
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
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