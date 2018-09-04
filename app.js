//app.js
const Towxml = require('/towxml/main.js');
App({
  onLaunch: function () {

  },
  towxml: new Towxml(),
  globalData: {
    userInfo: null
  }
})