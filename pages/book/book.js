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
    isShow:false,
    isActive:false,
    font:32,
    index:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
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
      // let data = app.towxml.toJson(res.data.article.content,"markdown");
      this.setData({
        article:res.data.article.content,
        title:res.data.title,
        isLoading:false,
        //获取index
        index:res.data.article.index
      })
    }).catch(err=>{
      this.setData({
        isLoading:false
      })
    });
  },
  //根据bookId获取文章内容
  getCatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      console.log(res);
      this.setData({
        catalog:res.data
      })
    })
  },
  //切换左侧导航菜单显示状态
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
  //点击字体放大
  handleDecr(){
    this.setData({
      font:this.data.font+2
    })
  },
  //点击字体缩小
  handleIncr(){
    if(this.data.font<20){
      wx.showModal({
        title: '温馨提示',
        content: '字体太小会影响视力',
        showCancel:false
      })
    }else{
      this.setData({
        font: this.data.font - 2
      });
    }
  },
  //点击跳转到下一章
  handleNext(){
    let catalog = this.data.catalog;
    if(catalog[this.data.index+1]){
      this.setData({
        titleId:catalog[this.data.index+1]._id
      });
      this.getData();
    }else{
      wx.showToast({
        title: '已是最后一章',
      })
    }
  },
  //点击跳转到上一章
  handlePrev(){
    let catalog = this.data.catalog;
    if(this.data.index-1<0){
      wx.showToast({
        title: '已经是第一章',
      })
    }else{
      this.setData({
        titleId:catalog[this.data.index-1]._id
      })
    }
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