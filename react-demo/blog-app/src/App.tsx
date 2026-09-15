/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-09 10:16:13
 * @LastEditTime: 2026-09-15 17:24:50
 * @LastEditors: lizhiliang
 * @Usage:
 */
/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-09 10:16:13
 * @LastEditTime: 2026-09-15 17:09:51
 * @LastEditors: lizhiliang
 * @Usage:
 */
import { useState, useMemo, type SetStateAction } from "react";
import "./App.css";
import BlogCard from "./components/BlogCard";
import CategoryFilter from "./components/CategoryFilter";
import NavBar from './components/NavBar'

function App() {
  // const [count, setCount] = useState(0)
  const [articles] = useState([
    {
      id: 1,
      title: "React 入门完全指南",
      summary: "从零开始学 React",
      category: "React",
      date: "2024-05-10",
    },
    {
      id: 2,
      title: "JS 异步编程详解",
      summary: "搞懂 Promise 和 async/await",
      category: "JavaScript",
      date: "2024-05-08",
    },
    {
      id: 3,
      title: "CSS Grid 布局实战",
      summary: "用 Grid 实现响应式布局",
      category: "CSS",
      date: "2024-05-05",
    },
    {
      id: 4,
      title: "React Hooks 深入",
      summary: "深入理解 useState 和 useEffect",
      category: "React",
      date: "2024-05-03",
    },
    {
      id: 5,
      title: "Flexbox 完全指南",
      summary: "一文学会弹性布局",
      category: "CSS",
      date: "2024-05-01",
    },
  ]);

  const [activeCategory, setActiveCategory] = useState("全部");

  // 提取所有分类
  const categories = useMemo(() => {
    const cats = articles.map((a) => a.category);
    return ["全部", ...new Set(cats)];
  }, [articles]);

  // 根据分类过滤文章
  const filteredArticles = useMemo(() => {
    if (activeCategory === "全部") return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [articles, activeCategory]);

  const handleCategoryChange = (cat: SetStateAction<string>) => {
    setActiveCategory(cat)
  }
  return (
    <>
      <div className="app">
        {/* 顶部导航栏 */}
        {/* <header className="navbar">
          <h1 className="logo">RUNOOB Blog</h1>
          <nav>
            <a href="/">首页</a>
            <a href="#">关于</a>
          </nav>
        </header> */}
        <NavBar />

        {/* 主内容区 */}
        <main className="container">
          <h2 className="section-title">最新文章</h2>
          {/* 分类筛选按钮组 */}
          <div className="category-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={activeCategory === cat ? "active" : ""}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <CategoryFilter categories={categories} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          <p className="result-info">共 {filteredArticles.length} 篇</p>

          {filteredArticles.length === 0 ? (
            <p className="empty-tip">该分类下暂无文章</p>
          ) : (
            <div className="article-grid">
              {filteredArticles.map((article) => (
                <div key={article.id} className="article-card">
                  <div className="card-content">
                    <span className="card-category">{article.category}</span>
                    <h3>{article.title}</h3>
                    <p>{article.summary}</p>
                    <span className="card-date">{article.date}</span>
                  </div>
                </div>
              ))}

              {articles.map((article) => (
                <BlogCard
                  key={article.id}
                  title={article.title}
                  summary={article.summary}
                  date={article.date}
                  category={article.category}
                />
              ))}
            </div>
          )}
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
