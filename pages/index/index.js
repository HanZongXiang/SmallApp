//index.js
//获取应用实例
import {fetch,login} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent:[],
    indicatorDots: true,
    duration: 1000,
    isLoading:false,
    pn:1,
    hasmore:true
  },
  onLoad: function () {
    this.getData();
    this.getContent();
    login()
  },
  //获取轮播图数据
  getData(){
    this.setData({
      isLoading:true
    })
    return new Promise((resolve,reject)=>{
      fetch.get('/swiper').then(res => {
        // console.log(res)
        resolve();
        this.setData({
          swiperData: res.data,
          isLoading: false
        })
      }).catch(err => {
        reject(err)
        this.setData({
          isLoading: false
        })
      })
    })
  },
  //获取分类、内容
  getContent(){
    return new Promise((resolve,reject)=>{
      fetch.get('/category/books').then(res => {
        console.log(res);
        resolve();
        this.setData({
          mainContent: res.data,
        })
      })
    })
  },
  //获取更多书籍列表内容
  getMoreContent(){
    return fetch.get('/category/books',{
      pn:this.data.pn
    })
  },
  //下拉刷新
  onPullDownRefresh(){
    Promise.all([this.getData(),this.getContent()]).then(()=>{
      this.setData({
        hasmore:true,
        pn:1,
        isLoading:false
      });
      wx.stopPullDownRefresh();
    })
  },
  //触底获取更多书籍
  onReachBottom(){
    if(this.data.hasmore){
      this.setData({
        pn:this.data.pn+1
      })
      console.log(this.data.pn);
      this.getMoreContent().then(res=>{
        let newMainContent = [...this.data.mainContent,...res.data];
        this.setData({
          mainContent:newMainContent
        })
        if(res.data.length<2){
          this.setData({
            hasmore:false
          })
        }
      })
    }
  },
  //根据id跳转到书籍详情页面
  jumpBook(event){
    const id = event.currentTarget.dataset.id;
    // console.log(event)
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  }
})
