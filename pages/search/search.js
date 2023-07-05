// pages/search/search.js
import {
  searchProduct
} from "../../api/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchHistory: [], // 搜索历史数组
    proArr:[],
    loading:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //页面加载时从本地存储取回搜索历史
    const historyData = wx.getStorageSync('searchHistory')
    if (!historyData) return;
    this.setData({
      searchHistory: historyData
    })
  },
  // 搜索函数
  async onSearch(event) {
    //获取搜索内容
    const searchText = event.detail;
    // 执行搜索操作
    this.setData({
      loading:true
    })
    const searchData = await searchProduct({
      keyword: searchText
    })
    this.setData({
      loading:false
    })
    this.setData({
      proArr:searchData.data
    })
    // 将搜索内容保存至搜索历史数组中
    this.data.searchHistory.push(searchText);
    const newData = this.data.searchHistory;
    this.setData({
      searchHistory: newData
    })
    // 将搜索内容数组保存在本地存储中
    wx.setStorageSync('searchHistory', this.data.searchHistory);
  },

  // 清空历史函数
  clearHistory() {
    // 清空搜索历史数组和本地缓存
    this.setData({
      searchHistory: []
    })
    wx.removeStorageSync('searchHistory');
  },

  //点击历史查询文字再次查询
  async backSearch(e){
    //从e.currentTarget.dataset.text获取历史搜索的文字
    const historyText = e.currentTarget.dataset.text
    //根据历史搜索文字再次查询
    this.setData({
      loading:true
    })
    const searchData = await searchProduct({
      keyword: historyText
    })
    this.setData({
      loading:false
    })
    this.setData({
      proArr:searchData.data
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})