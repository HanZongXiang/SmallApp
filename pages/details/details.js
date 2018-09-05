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
    book:{}
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
      this.setData({
        book:res,
        bookData:res.data,
        isLoading:false
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
  showCatalog(){
    wx.navigateTo({
      url: `/pages/catalogs/catalogs?id=${this.data.bookId}`,
    })
  },
  onShareAppMessage: function () {
    
  }
})