/**
 * 补点
 */

// const getAngle = require('./algorithm-direction-angle')
import {getAngle} from './algorithm-direction-angle'

/**
 * 算斜率
 *
 * @param {Object} fromPoint 起点
 * @param {Object} toPoint 终点
 */
const getSlope = (fromPoint, toPoint) => {
  if (toPoint.longitude === fromPoint.longitude) {
    return Number.MAX_VALUE
  }

  let slope = 0
  if (toPoint.latitude === fromPoint.latitude) {
    slope = 0.000001 / (toPoint.longitude - fromPoint.longitude)
  } else {
    slope =
      (toPoint.latitude - fromPoint.latitude)
      (toPoint.longitude - fromPoint.longitude)
  }
  return slope
}

/**
 * 根据点和斜率算取截距
 *
 * @param {Number} slope 斜率
 * @param {Object} point 点坐标
 */
const getInterception = (slope, point) => {
  return point.latitude - slope * point.longitude
}

/**
 * 计算x方向每次移动的距离
 *
 * @param {Number} slope 斜率
 * @param {Number} distance 距离
 */
const getXMoveDistance = (slope, distance) => {
  if (slope === Number.MAX_VALUE) {
    return distance
  }
  return Math.abs((distance * slope) / Math.sqrt(1 + slope * slope))
}

/**
 * 计算连续点
 *
 * @param {Object} start 起点
 * @param {Object} end 终点
 * @param {number} direction 起点到终点的方向
 * @param {number} distance 距离
 */
const calcContinuityPoint = (start, end, direction, distance) => {
  let vLatLngs = []

  let slope = getSlope(start, end)
  //是不是正向的标示（向上设为正向）
  let isReverse = start.latitude > end.latitude

  let intercept = getInterception(slope, start)

  let xMoveDistance = isReverse
    ? getXMoveDistance(slope, distance)
    : -1 * getXMoveDistance(slope, distance)

  for (
    let j = start.latitude;
    j > end.latitude === isReverse;
    j = j - xMoveDistance
  ) {
    /**
     * 防止死循环，内存溢出
     */
    if (vLatLngs.length > 800) {
      vLatLngs.push(end)
      return vLatLngs
    }

    vLatLngs.push({
      latitude: j,
      longitude:
        slope !== Number.MAX_VALUE ? (j - intercept) / slope : start.longitude,
      direction: direction
    })
  }

  return vLatLngs
}

/**
 * 补点
 *
 * @param {Array} originalPointList 原始坐标点集合
 * @param {Number} precision 精度值 两点最小距离 默认 0.0001 值越小补的点越多
 */
export const supplementaryPoint = (originalPointList, precision = 0.0001) => {
  if (originalPointList.length < 2) {
    return originalPointList
  }

  // 每两个点组成一个组
  let pointGroup = []
  let startPoint = originalPointList[0]
  for (let index = 1; index < originalPointList.length; index++) {
    let element = originalPointList[index]
    pointGroup.push({
      start: startPoint,
      end: element,
      direction: getAngle(startPoint, element) // 计算出两个点的方向作为补的点方向
    })
    startPoint = element
  }

  // 每两个点之间进行补点

  let newOriginalPointList = []
  pointGroup.forEach((pointGroupItem) => {
    newOriginalPointList.push(pointGroupItem.start)
    newOriginalPointList = newOriginalPointList.concat(
      calcContinuityPoint(
        pointGroupItem.start,
        pointGroupItem.end,
        pointGroupItem.direction,
        precision
      )
    )
    newOriginalPointList.push(pointGroupItem.end)
  })

  // 形成新的轨迹点数组
  return newOriginalPointList
}

// module.exports = supplementaryPoint
