//index.js
//获取应用实例
import {fetch} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent:[],
    // title:[],
    indicatorDots: true,
    duration: 1000,
    isLoading:false
  },
  onLoad: function () {
    this.getData();
    this.getContent();
  },
  //获取轮播图数据
  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get('/swiper').then(res=>{
      console.log(res)
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
  //获取分类、内容
  getContent(){
    fetch.get('/category/books').then(res=>{
      console.log(res);
      // let title = [];
      // res.data.forEach((item,index) => {
      //   title.push({title:item.title,index})
      // })
      this.setData({
        mainContent:res.data,
        // title:title
      })
      // console.log(this.data.title)
    })
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
