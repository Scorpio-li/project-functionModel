/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-06-16 15:28:33
 * @LastEditTime: 2026-06-16 16:27:51
 * @LastEditors: lizhiliang
 * @Usage: 
 */
/**
 * 卡尔曼滤波
 */

let lastLocation_x //上次位置
let currentLocation_x //这次位置
let lastLocation_y //上次位置
let currentLocation_y //这次位置
let estimate_x //修正后数据
let estimate_y //修正后数据
let pdelt_x //自预估偏差
let pdelt_y //自预估偏差
let mdelt_x //上次模型偏差
let mdelt_y //上次模型偏差
let gauss_x //高斯噪音偏差
let gauss_y //高斯噪音偏差
let kalmanGain_x //卡尔曼增益
let kalmanGain_y //卡尔曼增益

let m_R = 0
let m_Q = 0

/**
 * 初始模型
 */
const initial = () => {
  pdelt_x = 0.001
  pdelt_y = 0.001
  //        mdelt_x = 0;
  //        mdelt_y = 0;
  mdelt_x = 5.698402909980532e-4
  mdelt_y = 5.698402909980532e-4
}

/**
 * 滤波算法
 *
 * @param oldValue_x
 * @param value_x
 * @param oldValue_y
 * @param value_y
 * @param curLoc 当前点坐标
 */
const kalmanFilter = (oldValue_x, value_x, oldValue_y, value_y, curLoc) => {
  lastLocation_x = oldValue_x
  currentLocation_x = value_x
  gauss_x = Math.sqrt(pdelt_x * pdelt_x + mdelt_x * mdelt_x) + m_Q //计算高斯噪音偏差
  kalmanGain_x =
    Math.sqrt((gauss_x * gauss_x) / (gauss_x * gauss_x + pdelt_x * pdelt_x)) +
    m_R //计算卡尔曼增益
  estimate_x =
    kalmanGain_x * (currentLocation_x - lastLocation_x) + lastLocation_x //修正定位点
  mdelt_x = Math.sqrt((1 - kalmanGain_x) * gauss_x * gauss_x) //修正模型偏差

  lastLocation_y = oldValue_y
  currentLocation_y = value_y
  gauss_y = Math.sqrt(pdelt_y * pdelt_y + mdelt_y * mdelt_y) + m_Q //计算高斯噪音偏差
  kalmanGain_y =
    Math.sqrt((gauss_y * gauss_y) / (gauss_y * gauss_y + pdelt_y * pdelt_y)) +
    m_R //计算卡尔曼增益
  estimate_y =
    kalmanGain_y * (currentLocation_y - lastLocation_y) + lastLocation_y //修正定位点
  mdelt_y = Math.sqrt((1 - kalmanGain_y) * gauss_y * gauss_y) //修正模型偏差

  let latlng = curLoc
  latlng.latitude = estimate_y
  latlng.longitude = estimate_x

  return latlng
}

/**
 * 单点滤波
 *
 * @param lastLoc 上次定位点坐标
 * @param curLoc 本次定位点坐标
 * @param intensity 滤波强度（1—5）
 * @return 滤波后本次定位点坐标值
 */
const kalmanFilterPoint = (lastLoc, curLoc, intensity) => {
  if (pdelt_x === 0 || pdelt_y === 0) {
    initial()
  }
  let kalmanLatlng = null
  if (lastLoc == null || curLoc == null) {
    return kalmanLatlng
  }
  if (intensity < 1) {
    intensity = 1
  } else if (intensity > 5) {
    intensity = 5
  }
  for (let j = 0; j < intensity; j++) {
    kalmanLatlng = kalmanFilter(
      lastLoc.longitude,
      curLoc.longitude,
      lastLoc.latitude,
      curLoc.latitude,
      curLoc
    )
    curLoc = kalmanLatlng
  }
  return kalmanLatlng
}

/**
 *
 * 卡尔曼滤波 返回滤波后的轨迹数组
 *
 * @param {Array} originlist 原始轨迹数组
 * @param {Number} intensity 滤波强度 默认是3
 */
export const kalmanFilterPath = (originlist, intensity = 3) => {
  let kalmanFilterList = []
  if (originlist == null || originlist.length <= 2) return originlist
  initial() //初始化滤波参数
  let latLng = null
  let lastLoc = originlist[0]
  kalmanFilterList.push(lastLoc)
  for (let i = 1; i < originlist.length; i++) {
    let curLoc = originlist[i]
    latLng = kalmanFilterPoint(lastLoc, curLoc, intensity)
    if (latLng != null) {
      kalmanFilterList.push(latLng)
      lastLoc = latLng
    }
  }
  return kalmanFilterList
}

// module.exports = kalmanFilterPath
