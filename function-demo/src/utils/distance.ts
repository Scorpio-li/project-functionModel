/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-05-22 16:01:39
 * @LastEditTime: 2026-05-22 16:02:06
 * @LastEditors: lizhiliang
 * @Usage: 
 */
/*
 * @Author: lizhenzhen
 * @Date: 2021-02-01 18:09:22
 * @LastEditors: lizhenzhen
 * @LastEditTime: 2021-02-01 18:27:57
 * @FilePath: \jmax_tuqiang_web\src\DServices\utils\distance.ts
 */

const getRad = (d: any) => {
    // 圆周率
    let PI = Math.PI;
    return d * PI / 180.0;
}

/**
 * 计算两点之间的距离
 *
 * @param lat1
 * @param lng1
 * @param lat2
 * @param lng2
 * @returns {Number}
 */
const getDistance = (lat1: any, lng1: any, lat2: any, lng2: any) => {
    let radLat1 = getRad(lat1);
    let radLat2 = getRad(lat2);
    let a = radLat1 - radLat2;
    let b = getRad(lng1) - getRad(lng2);
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000.0;
    return s;
}

/**
 * 获取最大距离
 * @param {String} gemo 点坐标数组字符串
 */
export const getMaxDistance = (geom: string) => {
    let points = geom.split('|');
    let max = 0;
    for (let i = 0; i < points.length; i++) {
        let a = points[i].split(',');
        for (let j = 0; j < points.length; j++) {
            let b = points[j].split(',');
            let distance = getDistance(
                a[0],
                a[1],
                b[0],
                b[1]
            );
            if (i == 0 && j == 0) {
                max = distance;
            } else {
                if (distance > max) {
                    max = distance;
                }
            }
        }
    }
    return max;
}