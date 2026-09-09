/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-09 11:09:41
 * @LastEditTime: 2026-09-09 11:52:17
 * @LastEditors: lizhiliang
 * @Usage:
 */
import heroImg from "./assets/hero.png";

const ArticleCard = () => {
  const linkUrl = "/post/1";

  return (
    <div>
      {/* 动态属性：花括号绑定 JS 变量 */}
      <img src={heroImg} alt="文章封面" />
      <a href={linkUrl}>阅读全文</a>

      {/* 注意：class 要写成 className */}
      <div className="card active">卡片内容</div>

      {/* style 接受一个对象，属性名用驼峰式 */}
      <div style={{ color: "#42b883", fontSize: "16px" }}>绿色文字</div>
    </div>
  );
};

export default ArticleCard;
