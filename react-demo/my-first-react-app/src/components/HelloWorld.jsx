/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-01 16:48:31
 * @LastEditTime: 2026-09-07 17:13:05
 * @LastEditors: lizhiliang
 * @Usage:
 */
import Counter from "./Counter";
import Clock from "./Clock";
import Button from "./Button";

function HelloWorld({ name }) {
  return (
    <div>
      <Clock />
      <Counter />
      <Button />
      <h2>欢迎，{name || "陌生人"}!</h2>
    </div>
  );
}

export default HelloWorld;
