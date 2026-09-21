// 文件路径：src/hooks/useDarkMode.js
import { useState, useEffect } from "react";

export function useDarkMode() {
  // 从 localStorage 读取之前的设置
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("blog-theme") === "dark";
  });

  // 当 isDark 变化时，同步到 DOM 和 localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("blog-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("blog-theme", "light");
    }
  }, [isDark]);

  function toggleDark() {
    setIsDark(!isDark);
  }

  return { isDark, toggleDark };
}
