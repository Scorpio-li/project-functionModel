/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-01 16:57:42
 * @LastEditTime: 2026-09-04 10:25:49
 * @LastEditors: lizhiliang
 * @Usage:
 */
import { useState } from "react";
import styles from "../styles/Greeting.module.css";

const items = [
  { id: 1, name: "苹果" },
  { id: 2, name: "香蕉" },
  { id: 3, name: "橙子" },
];

const Greeting = ({ name = "" }) => {
  const [num, setNum] = useState(1);
  const isLoggedIn = false;
  const count = 1;
  return (
    <div
      style={{
        backgroundColor: "#000000",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #cccccc",
        marginBottom: "10px",
      }}
    >
      <h2 className={styles.card}>Hello， {name}！</h2>
      <p className="num-text">点击了{num}次</p>
      <button onClick={() => setNum(num + 1)}>增加num1次</button>
      {/* 条件渲染:不要用 if 语句直接在 JSX 中（可以用在函数体里） */}
      {isLoggedIn ? (
        <h1 className={styles.title}>欢迎回来，{name}！</h1>
      ) : (
        <h1 className={styles.title}>请登录</h1>
      )}
      {count > 0 && <p className={styles.content}>你有 {count} 条未读消息</p>}
      {/* count 为 0 时不渲染 */}
      {/* 列表渲染 */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {" "}
            {/* key 必须唯一且稳定！ */}
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Greeting;
