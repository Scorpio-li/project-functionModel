/**
 * 计算方向角
 */

/**
 * 获取带角度参数的新点对象
 *
 * @param {Object} point 点对象
 * @returns 新点对象
 */
const resetPoint = (point) => {
  let Rc = 6378137
  let Rj = 6356725

  let newPoint = point

  let longitude = point.longitude
  let latitude = point.latitude

  newPoint.m_LoDeg = parseInt(longitude)
  newPoint.m_LoMin = parseInt((longitude - newPoint.m_LoDeg) * 60)
  newPoint.m_LoSec =
    (longitude - newPoint.m_LoDeg - newPoint.m_LoMin / 60) * 3600

  newPoint.m_LaDeg = parseInt(latitude)
  newPoint.m_LaMin = parseInt((latitude - newPoint.m_LaDeg) * 60)
  newPoint.m_LaSec =
    (latitude - newPoint.m_LaDeg - newPoint.m_LaMin / 60) * 3600

  newPoint.m_Longitude = longitude
  newPoint.m_Latitude = latitude
  newPoint.m_RadLo = (longitude * Math.PI) / 180
  newPoint.m_RadLa = (latitude * Math.PI) / 180
  newPoint.Ec = Rj + ((Rc - Rj) * (90 - newPoint.m_Latitude)) / 90
  newPoint.Ed = newPoint.Ec * Math.cos(newPoint.m_RadLa)

  return newPoint
}

/**
 * 获取AB连线与正北方向的角度
 *
 * @param startPoint 起始点的经纬度
 * @param endPoint 终止点的经纬度
 * @return 两点连线与正北方向的角度（0~360）
 */
export const getAngle = (startPoint, endPoint) => {
  let newStartPoint = resetPoint(startPoint)
  let newEndPoint = resetPoint(endPoint)
  let dx = (newEndPoint.m_RadLo - newStartPoint.m_RadLo) * newStartPoint.Ed
  let dy = (newEndPoint.m_RadLa - newStartPoint.m_RadLa) * newStartPoint.Ec
  let angle = (Math.atan(Math.abs(dx / dy)) * 180) / Math.PI
  let dLo = newEndPoint.m_Longitude - newStartPoint.m_Longitude
  let dLa = newEndPoint.m_Latitude - newStartPoint.m_Latitude
  if (dLo > 0 && dLa <= 0) {
    angle = 90 - angle + 90
  } else if (dLo <= 0 && dLa < 0) {
    angle = angle + 180
  } else if (dLo < 0 && dLa >= 0) {
    angle = 90 - angle + 270
  }
  return angle
}

// export default getAngle
