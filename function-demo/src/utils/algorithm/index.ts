// const supplementaryPoint = require('./algorithm-add-point')

// const { removeNoisePoint } = require('./algorithm-remove-noise')

// const kalmanFilterPath = require('./algorithm-kalman-filter')

// const linearSmooth5Array = require('./algorithm-linear-smooth5')

// const reducerVerticalThreshold = require('./algorithm-reducer-vertical')
import {supplementaryPoint} from './algorithm-add-point'
import { removeNoisePoint } from './algorithm-remove-noise'
import {kalmanFilterPath} from './algorithm-kalman-filter'
import {linearSmooth5Array} from './algorithm-linear-smooth5'
import {reducerVerticalThreshold} from './algorithm-reducer-vertical'

/**
 * 轨迹平滑算法
 *
 * @param {Array} originalPointList 原始坐标数组
 * @param {Number} precision 补点密度
 */

export const trackSmooth = (
  originalPointList,
  precision = 0.0001,
  isShowLog = false
) => {
  let supplementaryPointList = supplementaryPoint(originalPointList, precision)

  let cloneSupplementaryPointList = JSON.parse(
    JSON.stringify(supplementaryPointList)
  )

  if (isShowLog) {
    console.log(cloneSupplementaryPointList, '补点后')
  }

  let removeNoisePointList = removeNoisePoint(cloneSupplementaryPointList)

  let cloneRemoveNoisePointList = JSON.parse(
    JSON.stringify(removeNoisePointList)
  )

  if (isShowLog) {
    console.log(cloneRemoveNoisePointList, '去噪后')
  }

  let kalmanFilterList = kalmanFilterPath(cloneRemoveNoisePointList, 4)

  let cloneKalmanFilterList = JSON.parse(JSON.stringify(kalmanFilterList))

  if (isShowLog) {
    console.log(cloneKalmanFilterList, '滤波后')
  }

  let linearSmooth5List = linearSmooth5Array(cloneKalmanFilterList)

  let cloneLinearSmooth5List = JSON.parse(JSON.stringify(linearSmooth5List))

  if (isShowLog) {
    console.log(cloneLinearSmooth5List, '五点一平滑后')
  }

  let reducerVerticalThresholdList = reducerVerticalThreshold(
    cloneLinearSmooth5List
  )

  let cloneReducerVerticalThresholdList = JSON.parse(
    JSON.stringify(reducerVerticalThresholdList)
  )

  if (isShowLog) {
    console.log(cloneReducerVerticalThresholdList, '抽稀后')
  }

  return cloneReducerVerticalThresholdList
}

// export default {
//   trackSmooth
// }
