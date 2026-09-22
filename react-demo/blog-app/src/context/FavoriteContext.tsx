import { createContext, useContext, useReducer, useEffect } from "react";

// 1. 创建Context
const FavoriteContext = createContext(null);

// 2. 定义reducer
const favoriteReducer = (state: any[], action: { type: any; id: any }) => {
  switch (action.type) {
    case "TOGGLE":
      if (state.includes(action.id)) {
        // 关闭收藏
        return state.filter((id: any) => id !== action.id);
      } else {
        return [...state, action.id];
      }
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

// 3. Provider组件：组合 Context + useReducer
export const FavoriteProvider = ({ children }) => {
  // 从 localStorage 恢复初始状态
  const [favoriteIds, dispatch] = useReducer(favoriteReducer, [], () => {
    const saved = localStorage.getItem("blog-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // 收藏列表变化时，自动同步到 localStorage
  useEffect(() => {
    localStorage.setItem("blog-favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // 封装几个常用方法
  function toggleFavorite(id) {
    // 切换收藏状态
    dispatch({ type: "TOGGLE", id });
  }

  function isFavorite(id) {
    return favoriteIds.includes(id);
  }

  const value = {
    favoriteIds,
    favoriteCount: favoriteIds.length,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

// 4. 自定义 Hook：封装 useContext，让调用方更简洁
export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites 必须在 FavoriteProvider 内部使用");
  }
  return context;
}
