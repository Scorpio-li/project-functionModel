/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-01 15:57:13
 * @LastEditTime: 2026-09-01 17:10:59
 * @LastEditors: lizhiliang
 * @Usage:
 */
import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import HelloWorld from "./components/HelloWorld.jsx";
import Greeting from "./components/Greeting.jsx";
import Card from "./components/Card.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <HelloWorld name="Li Zhiliang" />

      <Greeting name="lzl" />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "40px",
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
        }}
      >
        {/* 第一张卡片：关于 React */}
        <Card
          title="React 是什么？"
          content="React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发。它采用组件化方式，让代码更易复用和维护。"
          imageUrl="https://react.dev/images/uwu.png"
        />

        {/* 第二张卡片：关于 Vite */}
        <Card
          title="Vite 的优势"
          content="Vite 是新一代前端构建工具，开发服务器启动极快，支持热模块替换（HMR），是现代 React 项目的首选。"
          imageUrl="https://vite.dev/logo-without-border.svg"
        />

        {/* 你可以再加第三张试试！ */}
      </div>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>

      {/* 新加模块 */}
      <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>你好，Lizhiliang！</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count - 1)}>
            当前计数减1：{count}
          </button>
        </div>
        <p>
          编辑 <code>src/App.jsx</code> 并保存体验热更新！
        </p>
      </div>
    </>
  );
}

export default App;
