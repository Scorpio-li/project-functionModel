/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-01 16:48:31
 * @LastEditTime: 2026-09-04 10:27:13
 * @LastEditors: lizhiliang
 * @Usage:
 */
import Counter from "./Counter";
import Clock from "./Clock";

function HelloWorld({ name }) {
  return (
    <div>
      <Clock />
      <Counter />
      <h2>欢迎，{name || "陌生人"}!</h2>
    </div>
  );
}

export default HelloWorld;
