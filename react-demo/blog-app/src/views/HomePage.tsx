import { useState, useMemo } from "react";
import BlogCard from "../components/BlogCard";
import CategoryFilter from "../components/CategoryFilter";

function HomePage() {
  const [articles] = useState([
    {
      id: 1,
      title: "React 入门完全指南",
      summary: "从零学 React",
      category: "React",
      date: "2024-05-10",
      content:
        "<h2>为什么学 React？</h2><p>React 是目前最流行的前端框架之一...</p>",
    },
    {
      id: 2,
      title: "JS 异步编程详解",
      summary: "搞懂 Promise 和 async/await",
      category: "JavaScript",
      date: "2024-05-08",
      content:
        "<h2>什么是异步？</h2><p>JS 是单线程的，异步操作可以让主线程不阻塞...</p>",
    },
    {
      id: 3,
      title: "CSS Grid 布局实战",
      summary: "用 Grid 实现响应式布局",
      category: "CSS",
      date: "2024-05-05",
      content: "<h2>Grid 入门</h2><p>Grid 是二维布局系统...</p>",
    },
  ]);

  const [activeCategory, setActiveCategory] = useState("全部");

  const categories = useMemo(() => {
    return ["全部", ...new Set(articles.map((a) => a.category))];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (activeCategory === "全部") return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [articles, activeCategory]);

  return (
    <div>
      <h2 className="section-title">最新文章</h2>
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <p className="result-info">共 {filteredArticles.length} 篇</p>
      {filteredArticles.length === 0 ? (
        <p className="empty-tip">该分类下暂无文章</p>
      ) : (
        <div className="article-grid">
          {filteredArticles.map((article) => (
            <BlogCard key={article.id} {...article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
