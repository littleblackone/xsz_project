import {
  listNav,
  queryProduct
} from "../../api/api"

let navid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navArr: [],
    proArr: [],
    loading: false,
    isData: false,
    navActive: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const {
      idx
    } = options
    await this.getNavList()

    if (idx) {
      this.navChange(idx)
    } else {
      navid = this.data.navArr[0]._id
      this.getProduct()
    }
  },

  async getNavList() {
    const navData = await listNav();
    this.setData({
      navArr: navData.data
    })
    this.selectComponent("#myTabs").resize()
  },

  async getProduct(size = 0) {
    this.setData({
      loading: true
    })
    const proData = await queryProduct({
      navid,
      size
    })
    this.setData({
      loading: false
    })
    const oldArr = this.data.proArr
    const newArr = oldArr.concat(proData.data)
    this.setData({
      proArr: newArr
    })
    if (this.data.proArr.length == proData.total) {
      this.setData({
        isData: true
      })
    }
  },

  navChange(e) {
    const index = e?.detail?.index ?? e
    navid = this.data.navArr[index]._id
    this.setData({
      proArr: [],
      loading: false,
      isData: false,
      navActive: Number(index)
    })
    this.getProduct()
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
    if (this.data.isData) return;
    this.getProduct(this.data.proArr.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})