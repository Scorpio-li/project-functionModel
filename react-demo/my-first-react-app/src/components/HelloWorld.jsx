/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-09-01 16:48:31
 * @LastEditTime: 2026-09-01 16:48:31
 * @LastEditors: lizhiliang
 * @Usage: 
 */


function HelloWorld({name}) {
    return <h2>欢迎，{name  || '陌生人'}!</h2>
}

export default HelloWorld