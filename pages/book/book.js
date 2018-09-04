// pages/book/book.js
import {fetch} from "../../utils/util.js";
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleId:"",
    article:{},
    title:"",
    bookId:"",
    catalog:[],
    isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      titleId:options.id,
      bookId:options.bookId
    });
    this.getData();
    this.getCatalog();
  },
  //获取文章数据
  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get(`/article/${this.data.titleId}`).then(res=>{
      console.log(res);
      //动态切换页面标题
      wx.setNavigationBarTitle({
        title: res.data.title,
      });
      let data = app.towxml.toJson(res.data.article.content,"markdown");
      this.setData({
        article:data,
        title:res.data.title,
        isLoading:false
      })
    }).catch(err=>{
      this.setData({
        isLoading:false
      })
    });
  },
  //根据titleId获取文章内容
  getCatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      // console.log(res);
      this.setData({
        catalog:res.data
      })
    })
  },
  //切换导航栏显示状态
  handleToggle(){
    let isShow = !this.data.isShow;
    this.setData({
      isShow
    })
  },
  //点击目录跳转
  handleGet(event){
    // console.log(event);
    const id = event.currentTarget.dataset.id;
    this.setData({
      titleId:id
    });
    this.handleToggle();
    this.getData();
  },
  // toggleTitle(){
  //   wx.setNavigationBarTitle({
  //     title: this.data.title,
  //   })
  // },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})