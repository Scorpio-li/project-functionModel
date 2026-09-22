/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-15 17:23:12
 * @LastEditTime: 2026-09-22 17:21:32
 * @LastEditors: lizhiliang
 * @Usage:
 */
import "../App.css";
import { useDarkMode } from "../hooks/useDarkMode";
import { useFavorites } from "../context/FavoriteContext";
const NavBar = () => {
  const { isDark, toggleDark } = useDarkMode();
  const { favoriteCount } = useFavorites();
  return (
    <header className="navbar">
      <a href="/" className="logo">
        RUNOOB Blog
      </a>
      <nav>
        <a href="/">首页</a>
        {favoriteCount > 0 && (
          <span className="fav-badge">收藏 {favoriteCount}</span>
        )}
        <a href="#">关于</a>
        <button className="theme-btn" onClick={toggleDark}>
          {isDark ? "&#x2600; 亮色" : "☾ 暗黑"}
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
