/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-09 11:56:37
 * @LastEditTime: 2026-09-09 13:45:46
 * @LastEditors: lizhiliang
 * @Usage:
 */

import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import '../style/ArticlePage.module.css'

const ArticlePage = () => {
  const articles: any = [];
  const isLoading = false;

  return (
    <div>
      {/* 方式一：三元表达式 — 适合二选一 */}
      {isLoading ? <p>加载中，请稍候...</p> : <p>加载完成！</p>}

      {/* 方式二：&& 短路 — 适合「有条件就显示，没条件就不显示」 */}
      {articles.length === 0 && <p>还没有文章，敬请期待。</p>}

      {/* 方式三：if/else 在组件顶层 — 适合复杂多条件逻辑 */}
      {articles.length > 0 ? (
        <div>
          {articles.map((a: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
            <div key={a.id}>{a.title}</div>
          ))}
        </div>
      ) : (
        <p>暂无数据</p>
      )}
    </div>
  );
};

export default ArticlePage;
