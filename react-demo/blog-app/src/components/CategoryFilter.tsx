import type { Key } from "react"

const CategoryFilter = ({ categories, activeCategory, onCategoryChange}) => {
    return (
        <div className="filter-bar">
            {categories.map((cat: Key | null | undefined) =>(
                <button key={cat} className={activeCategory === cat ? 'active' : ''}
                    // 点击时调用父组件传来的回调函数
          onClick={() => onCategoryChange(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}

export default CategoryFilter