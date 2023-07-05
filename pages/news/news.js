import {
  listNews
} from "../../api/api"
import {
  formatTime,
  formatNum
} from "../../utils/common.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsArr: [],
    loading: false,
    dataLoadFinished: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getNewsList();
  },

  //获取新闻列表
  async getNewsList(size = 0) {
    this.setData({
      loading: true
    })
    const newsData = await listNews({
      limit: 8,
      size
    })
    this.setData({
      loading: false
    })
    newsData.data.forEach(item => {
      item.view_count = formatNum(item.view_count);
      item.publish_date = formatTime(item.publish_date, 5);
    })
    const oldData = this.data.newsArr;
    const newData = oldData.concat(newsData.data);
    wx.stopPullDownRefresh();
    this.setData({
      newsArr: newData
    })
    if (this.data.newsArr.length == newsData.total) this.setData({dataLoadFinished:true})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      newsArr: [],
      loading: false,
      dataLoadFinished: false
    })
    this.getNewsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.dataLoadFinished) return;
    this.getNewsList(this.data.newsArr.length);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})