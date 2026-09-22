/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-15 17:02:13
 * @LastEditTime: 2026-09-15 17:02:13
 * @LastEditors: lizhiliang
 * @Usage:
 */

import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";
const BlogCard = ({ id, title, summary, date, category }: any) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  function handleFavorite(e) {
    e.preventDefault(); // 阻止 Link 跳转
    toggleFavorite(id);
  }

  return (
    // Link 替代了传统的 <a> 标签，不会触发页面刷新。
    <Link to={`/post/${id}`} className="card-link">
      <div className="card">
        <span className="tag">{category}</span>
        <h3>{title}</h3>
        <p>{summary}</p>
        {/* <span className="date">{date}</span> */}
        <div className="card-footer">
          <span className="date">{date}</span>
          <button className="fav-btn" onClick={handleFavorite}>
            {isFavorite(id) ? "&#x2665;" : "♡"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
