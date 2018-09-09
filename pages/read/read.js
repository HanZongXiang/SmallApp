// pages/read/read.js
import {fetch} from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readContent:[],
    bookId:"",
    isLoading:false,
    pn:1,
    // size:4,
    hasMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLoading: true
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getReadList();
  },
  getReadList() {
    return new Promise((resolve,reject)=>{
      fetch.get('/readList',{pn:this.data.pn,size:this.data.size}).then(res => {
        resolve(res);
        console.log(res);
        let arr = [...res.data];
        arr = arr.map(item => {
          item.title.percent = Math.round(((item.title.index + 1) / item.title.total) * 100);
          return item;
        })
        let readContent = this.data.readContent
        this.setData({
          readContent: res.data,
          isLoading: false
        })
        this.getTime();
        if(this.data.readContent.length == 0){
          wx.showModal({
            title: '温馨提示',
            content: '您还没有阅读任何书籍',
            showCancel: false
          })
        }
      }).catch(err => {
        this.setData({
          isLoading: false
        })
      })
    })
  },
  getTime(){
    let content = this.data.readContent;
    content.map(item => {
      var date1 = new Date(item.updatedTime);
      var date2 = new Date();
      var time1 = date1.getTime();
      var time2 = date2.getTime();
      var time = parseInt((time2 - time1)/1000);
      // console.log(time);
      if(time<60){
        item.time = `${time}秒前`
      }else if(time>=60 && time<3600){
        time = parseInt(time/60);
        item.time = `${time}分钟前`
      }else if(time>3600 && time<86400){
        time = parseInt(time/3600);
        item.time = `${time}小时前`
      }else if(time>86400){
        time = Math.floor(time/86400);
        item.time = `${time}天前`
      }
    });
    this.setData({
      readContent:content
    })
  },
  jumpReading(event){
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      isLoading:true,
      readContent:[]
    })
    this.getReadList().then(res=>{
      this.setData({
        isLoading:false,
      });
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  /* getMoreCollect(){
    return fetch.get('/readList',{
      pn:this.data.pn,
      size:this.data.size
    })
  }, */
  //上拉加载更多
  /* onReachBottom: function () {
    if(this.data.hasMore){
      this.setData({
        pn:this.data.pn + 1,
        size: this.data.size + 4
      })
      console.log(this.data.pn)
      this.getMoreCollect().then(res => {
        console.log(res)
        let newReadContent = [...this.data.readContent, ...res.data];
        this.setData({
          readContent: newReadContent
        })
        if (res.data.length < 1) {
          this.setData({
            hasMore: false
          })
        }
      })
    } 
  }, */

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})