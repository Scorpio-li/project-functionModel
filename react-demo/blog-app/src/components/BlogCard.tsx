/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-15 17:02:13
 * @LastEditTime: 2026-09-15 17:02:13
 * @LastEditors: lizhiliang
 * @Usage:
 */

import { Link } from "react-router-dom";

const BlogCard = ({ id, title, summary, date, category }: any) => {
  return (
    // Link 替代了传统的 <a> 标签，不会触发页面刷新。
    <Link to={`/post/${id}`} className="card-link">
      <div className="card">
        <span className="tag">{category}</span>
        <h3>{title}</h3>
        <p>{summary}</p>
        <span className="date">{date}</span>
      </div>
    </Link>
  );
};

export default BlogCard;
