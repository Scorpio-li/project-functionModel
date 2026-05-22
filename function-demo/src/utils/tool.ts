/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-05-22 15:48:35
 * @LastEditTime: 2026-05-22 15:50:18
 * @LastEditors: lizhiliang
 * @Usage: 
 */
/**
 * 设置全屏
 * @param {Boolean} flag true为全屏 false为退出全屏
 * @param {Object} element dom元素
 */
export function setFullscreen(flag: boolean, element: any) {
    const el: any = element
    if (flag) {
        el && el.requestFullScreen && el.requestFullScreen()
        el && el.webkitRequestFullScreen && el.webkitRequestFullScreen()
        el && el.mozRequestFullScreen && el.mozRequestFullScreen()
    } else {
        const doc: any = document
        doc.cancelFullScreen && doc.cancelFullScreen()
        doc.webkitCancelFullScreen && doc.webkitCancelFullScreen()
        doc.mozCancelFullScreen && doc.mozCancelFullScreen()
    }
}
