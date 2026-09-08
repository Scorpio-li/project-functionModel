import { useState, useEffect } from "react";

const Hooks = () => {
  // useState Hook 允许你在函数组件中使用局部状态。它返回一个状态值和更新该状态值的函数。
  const [count, setCount] = useState(0);
  // useEffect Hook 允许你在函数组件中执行副作用操作（如数据获取、订阅管理、DOM 操作等）。它在每次渲染后都会执行。
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []); // 空数组作为第二个参数表示仅在组件挂载和卸载时执行

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // 仅在 count 发生变化时更新标题
  return (
    <>
      {/* useState */}
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      {/* useEffect */}
      <p>Timer: {seconds} seconds</p>
    </>
  );
};

export default Hooks;
