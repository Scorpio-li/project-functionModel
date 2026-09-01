import { useState } from "react";

const Greeting = ({ name = "" }) => {
  const [num, setNum] = useState(1);
  return (
    <div style={{ padding: "20px;", border: "1px solid #CCCCCC" }}>
      <h2>Hello， {name}！</h2>
      <p className="num-text">点击了{num}次</p>
      <button onClick={() => setNum(num + 1)}>增加num1次</button>
    </div>
  );
};

export default Greeting;
