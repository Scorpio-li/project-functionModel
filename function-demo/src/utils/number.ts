/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-05-22 15:57:44
 * @LastEditTime: 2026-05-22 15:58:07
 * @LastEditors: lizhiliang
 * @Usage: 
 */
/**
 * 格式化数字 尾开始 超过3位增加逗号
 * @param {Number} val 需要格式化的数字
 * @returns {String} 对应字符串
 * @example
 * FormatNum(122151515) => '122,151,515'
 */
export const FormatNum = (val:string):string => {
    let last = val.split('.')[1];
    // let num = (val || 0).toString();
    let num = val.split('.')[0];
    let result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result + '.' + last;
};