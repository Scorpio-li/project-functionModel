/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-19 16:02:17
 * @LastEditTime: 2026-09-21 09:57:43
 * @LastEditors: lizhiliang
 * @Usage:
 */
import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import "../style/PostPage.module.css";
import { useFavorites } from "../context/FavoriteContext";
// 文章数据（后续章节会从外部加载）
const articles = [
  {
    id: 1,
    title: "React 入门完全指南",
    category: "React",
    date: "2024-05-10",
    content:
      "<h2>为什么学 React？</h2><p>React 是目前最流行的前端框架之一...</p>",
  },
  {
    id: 2,
    title: "JS 异步编程详解",
    category: "JavaScript",
    date: "2024-05-08",
    content: "<h2>什么是异步？</h2><p>JS 是单线程的...</p>",
  },
];

const PostPage = () => {
  const { id } = useParams();
  // 根据 ID 查找文章
  const article = useMemo(() => {
    return articles.find((a) => a.id === Number(id));
  }, [id]);

  // 文章不存在
  if (!article) {
    return (
      <div className="not-found">
        <h2>文章不存在</h2>
        <p>找不到 ID 为 {id} 的文章</p>
        <Link to="/">返回首页</Link>
      </div>
    );
  }

  const { isFavorite, toggleFavorite } = useFavorites();
  // 文章存在
  return (
    <article className="post-view">
      <div className="post-header">
        <h1>{article.title}</h1>
        <button className="fav-btn" onClick={() => toggleFavorite(article.id)}>
          {isFavorite(article.id) ? "&#x2665; 已收藏" : "♡ 收藏"}
        </button>
      </div>
      <span className="category-tag">{article.category}</span>
      <h1>{article.title}</h1>
      <time>{article.date}</time>
      {/* dangerouslySetInnerHTML 等价于 Vue 的 v-html，注意 XSS 风险 */}
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      <Link to="/" className="back-link">
        ← 返回首页
      </Link>
    </article>
  );
};

export default PostPage;
