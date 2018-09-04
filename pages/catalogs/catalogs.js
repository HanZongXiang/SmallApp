// pages/catalogs/catalogs.js
import {fetch} from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:false,
    bookId:"",
    catalogData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId:options.id
    }),
    this.getData()
  },
  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      // console.log(res);
      this.setData({
        catalogData:res.data,
        isLoading:false
      })
    }).catch(err=>{
      this.setData({
        isLoading:false
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})