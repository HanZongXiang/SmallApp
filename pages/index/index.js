//index.js
//获取应用实例
import {fetch} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent:[],
    indicatorDots: true,
    duration: 1000,
    isLoading:false
  },
  onLoad: function () {
    this.getData();
    this.getContent();
  },
  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get('/swiper').then(res=>{
      // console.log(res)
      this.setData({
        swiperData:res.data,
        isLoading:false
      })
    }).catch(err=>{
      this.setData({
        isLoading:false
      })
    })
  },
  getContent(){
    fetch.get('/category/books').then(res=>{
      console.log(res);
      this.setData({
        mainContent:res.data
      })
    })
  },
  jumpBook(event){
    const id = event.currentTarget.dataset.id;
    // console.log(event)
    console.log(id);
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  }
})
