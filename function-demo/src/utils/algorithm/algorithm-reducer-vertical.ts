/**
 * 抽稀
 */

// const {
//   getLastLocation,
//   calculateDistanceFromPoint
// } = require('./algorithm-remove-noise')
import { getLastLocation, calculateDistanceFromPoint } from './algorithm-remove-noise'

/**
 * 抽稀算法
 *
 * @param {Array} inPoints 待抽稀的坐标数组
 * @param {Number} threshHold 抽稀的程度 默认0.3
 */
export const reducerVerticalThreshold = (inPoints, threshHold = 0.3) => {
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
    if (distance > threshHold) {
      ret.push(cur)
    }
  }
  return ret
}

// module.exports = reducerVerticalThreshold
