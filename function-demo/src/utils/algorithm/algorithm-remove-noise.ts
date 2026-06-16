/**
 * 去噪
 */

/**
 * 计算两点的距离
 *
 * @param {Object} var0 点1
 * @param {Object} var1 点2
 */
const calculateLineDistance = (var0, var1) => {
  if (var0 != null && var1 != null) {
    let paramNum = 0.01745329251994329
    try {
      let var2 = var0.longitude
      let var4 = var0.latitude
      let var6 = var1.longitude
      let var8 = var1.latitude
      var2 *= paramNum
      var4 *= paramNum
      var6 *= paramNum
      var8 *= paramNum
      let var10 = Math.sin(var2)
      let var12 = Math.sin(var4)
      let var14 = Math.cos(var2)
      let var16 = Math.cos(var4)
      let var18 = Math.sin(var6)
      let var20 = Math.sin(var8)
      let var22 = Math.cos(var6)
      let var24 = Math.cos(var8)
      let var26 = []
      let var27 = []
      var26[0] = var16 * var14
      var26[1] = var16 * var10
      var26[2] = var12
      var27[0] = var24 * var22
      var27[1] = var24 * var18
      var27[2] = var20
      let var28 = Math.sqrt(
        (var26[0] - var27[0]) * (var26[0] - var27[0]) +
          (var26[1] - var27[1]) * (var26[1] - var27[1]) +
          (var26[2] - var27[2]) * (var26[2] - var27[2])
      )
      return Math.asin(var28 / 2.0) * 1.27420015798544e7
    } catch (var30) {
      console.log(var30)
      return 0.0
    }
  } else {
    try {
      throw new IllegalArgumentException('非法坐标值')
    } catch (var31) {
      console.log(err)
      return 0.0
    }
  }
}

/**
 * 计算当前点到线的垂线距离
 *
 * @param {Object} p 当前点
 * @param {Object} lineBegin 线的起点
 * @param {Object} lineEnd 线的终点
 */
export const calculateDistanceFromPoint = (p, lineBegin, lineEnd) => {
  let A = p.longitude - lineBegin.longitude
  let B = p.latitude - lineBegin.latitude
  let C = lineEnd.longitude - lineBegin.longitude
  let D = lineEnd.latitude - lineBegin.latitude

  let dot = A * C + B * D
  let len_sq = C * C + D * D
  let param = dot / len_sq

  let xx, yy

  if (
    param < 0 ||
    (lineBegin.longitude === lineEnd.longitude &&
      lineBegin.latitude === lineEnd.latitude)
  ) {
    xx = lineBegin.longitude
    yy = lineBegin.latitude
    //            return -1;
  } else if (param > 1) {
    xx = lineEnd.longitude
    yy = lineEnd.latitude
    //            return -1;
  } else {
    xx = lineBegin.longitude + param * C
    yy = lineBegin.latitude + param * D
  }
  return calculateLineDistance(p, {
    latitude: yy,
    longitude: xx
  })
}

/**
 * 获取最后一个点的经纬度
 *
 * @param {Array} oneGraspList 遍历后的点坐标数组集合
 */
export const getLastLocation = (oneGraspList) => {
  if (oneGraspList == null || oneGraspList.length === 0) {
    return null
  }
  let locListSize = oneGraspList.length
  return oneGraspList[locListSize - 1]
}

/**
 * 去除噪点
 *
 * @param {Array} inPoints 初始坐标点集合
 */
export const removeNoisePoint = (inPoints) => {
  let threshHold = 10

  if (inPoints == null) {
    return null
  }
  if (inPoints.length <= 2) {
    return inPoints
  }
  let ret = []
  for (let i = 0; i < inPoints.length; i++) {
    let pre = getLastLocation(ret)
    let cur = inPoints[i]
    if (pre == null || i === inPoints.length - 1) {
      ret.push(cur)
      continue
    }
    let next = inPoints[i + 1]
    let distance = calculateDistanceFromPoint(cur, pre, next)
    if (distance < threshHold) {
      ret.push(cur)
    }
  }
  return ret
}

// export default {
//   getLastLocation,
//   calculateDistanceFromPoint,
//   removeNoisePoint
// }
