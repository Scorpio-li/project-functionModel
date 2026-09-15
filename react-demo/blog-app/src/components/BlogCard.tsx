/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-15 17:02:13
 * @LastEditTime: 2026-09-15 17:02:13
 * @LastEditors: lizhiliang
 * @Usage:
 */

const BlogCard = ({ title, summary, date, category }) => {
  return (
    <div className="card">
      <span className="tag">{category}</span>
      <h3>{title}</h3>
      <p>{summary}</p>
      <span className="date">{date}</span>
    </div>
  );
};

export default BlogCard;
