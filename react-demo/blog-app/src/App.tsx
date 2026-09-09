/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-09 10:16:13
 * @LastEditTime: 2026-09-09 10:48:39
 * @LastEditors: lizhiliang
 * @Usage:
 */
// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        {/* 顶部导航栏 */}
        <header className="navbar">
          <h1 className="logo">RUNOOB Blog</h1>
          <nav>
            <a href="/">首页</a>
            <a href="#">关于</a>
          </nav>
        </header>

        {/* 主内容区 */}
        <main className="container">
          <p>博客内容</p>
        </main>

        {/* 页脚 */}
        <footer className="footer">
          <p>© 2026 RUNOOB Blog. Powered by React.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
