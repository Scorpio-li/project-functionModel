/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-01 16:48:31
 * @LastEditTime: 2026-09-08 11:31:07
 * @LastEditors: lizhiliang
 * @Usage:
 */
import { memo, useState, useCallback, useMemo } from "react";
import Counter from "./Counter";
import Clock from "./Clock";
import Button from "./Button";

// const MyComponent = memo((props) => {
//   console.log("Rendering MyComponent");
//   return <div>{props.text}</div>;
// });

const MyComponent = memo(
  (props) => {
    console.log("Rendering MyComponent");
    return <div>{props.text}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.text === nextProps.text;
  }
);

const ChildComponent = memo(({ onClick, count }) => {
  console.log("Rendering ChildComponent");
  return <button onClick={onClick}>Count: {count}</button>;
});

function HelloWorld({ name }) {
  const [count, setCount] = useState(0);
  const [text] = useState("Hello, world!");
  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const doubledCount = useMemo(() => count * 2, [count]);
  return (
    <div>
      <div>
        <p>Doubled Count: {doubledCount}</p>
        <ChildComponent onClick={increment} count={count} />
        <button
          onClick={() => {
            setCount(count + 1);
            // setText(text + "1");
          }}
        >
          Increment Count
        </button>
        <MyComponent text={text} />
      </div>
      <Clock />
      <Counter />
      <Button />
      <h2>欢迎，{name || "陌生人"}!</h2>
    </div>
  );
}

export default HelloWorld;
