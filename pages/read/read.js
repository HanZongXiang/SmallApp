// pages/read/read.js
import {fetch} from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    readContent:[],
    bookId:"",
    isLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLoading: true
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    fetch.get('/readList').then(res => {
      console.log(res);
      let arr = [...res.data];
      arr = arr.map(item=>{
        item.title.percent = Math.round(((item.title.index+1)/item.title.total)*100);
        let date = +new Date(item.createdTime);
        let time = new Date() - date;
        item.time = new Date(time).getHours();
        // console.log(item.time)
        if(item.time<24){
          item.time = item.time + "小时前"
        }else if(item.time>=24){
          item.time = Math.ceil(item.time/24) + "天前"
        }else if(item.time<1){
          item.time = (item.time*60) + "分钟前"
        }
        // console.log(item.time)
        return item;
      });
      // console.log(arr)
      let readContent = this.data.readContent;
      this.setData({
        readContent: res.data,
        isLoading:false
      })
    }).catch(err=>{
      this.setData({
        isLoading:false
      })
    })
  },

  jumpReading(event){
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  //继续阅读按钮
  /* continueReading(event){
    let bookId = this.data.bookId;
    bookId = event.currentTarget.dataset.id;
    console.log(bookId);
    this.setData({
      isLoading:true,
    })
    fetch.get(`/titles/${bookId}`).then(res => {
      // console.log(res);
      this.setData({
        detail: res.data,
        isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    });
    wx.navigateTo({
      url: `/pages/book/book?id=5b79ca77eeb005130915f16a&bookId=${bookId}`,
    })
  }, */
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