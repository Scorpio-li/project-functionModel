/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-05-22 15:47:56
 * @LastEditTime: 2026-05-22 15:48:23
 * @LastEditors: lizhiliang
 * @Usage: 
 */
export const initUuid = () => {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c + '' === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

export const encodeSTR = (str: string): String => {
    let t: string = '';
    for (let x: number = 0; x < str.length; x++) {
        const a: number = str.charCodeAt(x);
        if (x != 0) {
            t += '|';
        }
        t += new Number(a).toString(10);
    }
    return t;
}