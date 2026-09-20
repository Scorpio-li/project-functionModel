import { useState, useMemo, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import CategoryFilter from "../components/CategoryFilter";

function HomePage() {
  // const [articles] = useState([
  //   {
  //     id: 1,
  //     title: "React 入门完全指南",
  //     summary: "从零学 React",
  //     category: "React",
  //     date: "2024-05-10",
  //     content:
  //       "<h2>为什么学 React？</h2><p>React 是目前最流行的前端框架之一...</p>",
  //   },
  //   {
  //     id: 2,
  //     title: "JS 异步编程详解",
  //     summary: "搞懂 Promise 和 async/await",
  //     category: "JavaScript",
  //     date: "2024-05-08",
  //     content:
  //       "<h2>什么是异步？</h2><p>JS 是单线程的，异步操作可以让主线程不阻塞...</p>",
  //   },
  //   {
  //     id: 3,
  //     title: "CSS Grid 布局实战",
  //     summary: "用 Grid 实现响应式布局",
  //     category: "CSS",
  //     date: "2024-05-05",
  //     content: "<h2>Grid 入门</h2><p>Grid 是二维布局系统...</p>",
  //   },
  // ]);
  const [articles, setArticles] = useState([]); // 文章数据
  const [isLoading, setIsLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误信息

  const [activeCategory, setActiveCategory] = useState("全部");
  const [keyword, setKeyword] = useState(""); // 搜索关键词

  // useEffect 加载数据：空依赖数组 = 仅在首次渲染后执行一次
  useEffect(() => {
    let cancelled = false; // 防止组件卸载后 setState 的标记
    async function fetchPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/posts.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setArticles(data);
        }
      } catch (error) {
        if (!cancelled) {
          setError(error.message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchPosts();

    // 清理函数：组件卸载时将 cancelled 设为 true
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    return ["全部", ...new Set(articles.map((a: any) => a.category))];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let result = articles;
    // if (activeCategory === "全部") return articles;
    // return articles.filter((a: any) => a.category === activeCategory);
    // 先按分类过滤
    if (activeCategory !== "全部") {
      result = result.filter((a) => a.category === activeCategory);
    }

    // 再按关键词过滤
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(kw) ||
          a.summary.toLowerCase().includes(kw)
      );
    }

    return result;
  }, [articles, activeCategory, keyword]);

  return (
    <div>
      <h2 className="section-title">最新文章</h2>

      {/* 搜索框 */}
      <div className="search-bar">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索文章标题或摘要..."
          className="search-input"
        />
        {keyword && (
          <span className="clear-btn" onClick={() => setKeyword("")}>
            ✕
          </span>
        )}
      </div>
      {/* 加载中 */}
      {isLoading && <p className="status-msg">加载中，请稍候...</p>}
      {/* 加载出错 */}
      {error && (
        <div className="status-msg error">
          <p>加载失败：{error}</p>
          <button onClick={() => window.location.reload()}>重试</button>
        </div>
      )}
      {/* <CategoryFilter
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
      )} */}
      {/* 数据加载完成 */}
      {!isLoading && !error && (
        <>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <p className="result-info">
            共 {filteredArticles.length} 篇{keyword && `，搜索「${keyword}」`}
          </p>
          {filteredArticles.length === 0 ? (
            <p className="empty-tip">该分类下暂无文章</p>
          ) : (
            <div className="article-grid">
              {filteredArticles.map((article: any) => (
                <BlogCard key={article.id} {...article} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
