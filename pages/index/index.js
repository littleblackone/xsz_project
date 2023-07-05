import {
  formatTime,
  formatNum
} from "../../utils/common.js"
import {
  listNav,
  listNews
} from "../../api/api"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navArr: [],
    newsArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavData();
    this.getNewsData();
  },
//获取导航栏数据
  async getNavData() {
    const navData = await listNav();
    this.setData({
      navArr: navData.data
    });
  },
//获取新闻列表
  async getNewsData() {
    const newsData = await listNews({
      limit: 3,
      hot: "true"
    })
    newsData.data.forEach(item => {
      item.view_count = formatNum(item.view_count);
      item.publish_date = formatTime(item.publish_date, 5);
    })
    this.setData({
      newsArr: newsData.data
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})