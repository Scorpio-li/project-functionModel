/**
 * 五点一平滑
 */

/**
 * 五点一平滑算法
 *
 * @param {Array} array 需要的平滑数组
 * @param {Number} len 需要平滑数组的长度
 */
const linearSmooth5 = (array, len) => {
  let newArray = []
  if (len < 5) {
    for (let i = 0; i <= len - 1; i++) {
      newArray.push(array[i])
    }
  } else {
    newArray.push((3.0 * array[0] + 2.0 * array[1] + array[2] - array[4]) / 5.0)
    newArray.push(
      (4.0 * array[0] + 3.0 * array[1] + 2 * array[2] + array[3]) / 10.0
    )
    for (i = 2; i <= len - 3; i++) {
      newArray.push(
        (array[i - 2] + array[i - 1] + array[i] + array[i + 1] + array[i + 2]) /
          5.0
      )
    }
    newArray.push(
      (4.0 * array[len - 1] +
        3.0 * array[len - 2] +
        2 * array[len - 3] +
        array[len - 4]) /
        10.0
    )
    newArray.push(
      (3.0 * array[len - 1] +
        2.0 * array[len - 2] +
        array[len - 3] -
        array[len - 5]) /
        5.0
    )
  }
  return newArray
}

/**
 * 五点一平滑调用方法
 *
 * @param {Array} pointList 需要的平滑数组
 */
export const linearSmooth5Array = (pointList) => {
  let latList = []
  let lngList = []
  let len = pointList.length

  for (let index = 0; index < pointList.length; index++) {
    let point = pointList[index]
    latList.push(point.latitude)
    lngList.push(point.longitude)
  }

  let newLatList = linearSmooth5(latList, len)
  let newLngList = linearSmooth5(lngList, len)

  let newPointList = []

  for (let index = 0; index < pointList.length; index++) {
    let element = pointList[index]
    element.latitude = newLatList[index]
    element.longitude = newLngList[index]
    newPointList.push(element)
  }

  return newPointList
}

// module.exports = linearSmooth5Array
