// pages/details/detail.js
import {fetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:false,
    bookId:"",
    bookData:{},
    book:{},
    time:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      bookId:options.id
    })
    this.getData()
  },
  //根据书籍id获取数据
  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      console.log(res)
      let time = this.data.time;
      let updateTime = res.data.updateTime;
      let Y = (new Date(updateTime).getFullYear());
      let M = (new Date(updateTime).getMonth() + 1);
      let D = (new Date(updateTime).getDate());
      this.setData({
        book:res,
        bookData:res.data,
        isLoading:false,
        time: `${Y}年-${M}月-${D}日`
      })
    }).catch(err=>{
      this.setData({
        isLoading:false
      })
    })
  },
  //根据id跳转到对应书籍的目录
  jumpCatalogs(event){
    // console.log(event)
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/catalogs/catalogs?id=${id}`,
    })
  },
  //点击按钮收藏
  handleCollect(){
    let bookId = this.data.bookId;
    fetch.post('/collection',{bookId}).then(res=>{
      if(res.code == 200){
        wx.showToast({
          title: '收藏成功',
        })
        let book = { ...this.data.book }
        book.isCollect = 1;
        this.setData({
          book
        })
      }else{
        let arr = [this.data.bookId];
        fetch.post('/collection/delete',{ arr }).then(res=>{
          if(res.code == 200){
            wx.showToast({
              title: '取消收藏成功',
            });
            let book = { ...this.data.book };
            book.isCollect = 0;
            this.setData({
              book
            })
          }
        })
      }
    })
  },
  showCatalog(){
    wx.navigateTo({
      url: `/pages/catalogs/catalogs?id=${this.data.bookId}`,
    })
  },
  onShareAppMessage: function () {
    return {
      title:this.data.bookData.title,
      path:`/pages/details/details?id=${this.data.bookId}`,
      imgUrl:this.data.bookData.img
    }
  }
})