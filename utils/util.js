const baseUrl = "https://m.yaojunrong.com";

const fetch = {
  http(url,method,data){
    return new Promise((resolve,reject)=>{
      let header = {
        'content-type':'application/json'
      };
      let token = wx.getStorageSync('token');
      if(token){
        header.token = token;
      }
      wx.request({
        url: baseUrl + url,
        method,
        data,
        header,
        success(res) {
          // console.log(res);
          if(res.header.Token || res.header.token){
            wx.setStorageSync('token', res.header.Token || res.header.token)
          }
          resolve(res.data)
        },
        fail(err){
          reject(err);
        }
      })
    })
  },
  get(url,data){
    return this.http(url,'GET',data)
  },
  post(url,data){
    return this.http(url,'POST',data)
  }
}

const login = ()=>{
  wx.login({
    success(res){
      fetch.post('/login',{
        code:res.code,
        appid:'wx0e7e4d54a05783a1',
        secret:'37ad046bab19409d07c4dade054f9d27'
      }).then(res=>{
        console.log(res)
      })
    }
  })
}
exports.login = login;
exports.fetch = fetch;
