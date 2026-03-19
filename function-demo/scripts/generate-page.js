// /*
//  * @Description: 
//  * @Author: Lizhiliang
//  * @Date: 2026-03-19 16:23:42
//  * @LastEditTime: 2026-03-19 16:34:42
//  * @LastEditors: lizhiliang
//  * @Usage: 
//  */
// import fs from 'fs-extra'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const __dirname = path.dirname(fileURLToPath(import.meta.url))

// // 获取命令行参数
// const pageName = process.argv[2]
// if (!pageName) {
//   console.error('请指定页面名称：npm run gen-page 页面名称')
//   process.exit(1)
// }

// // 定义生成路径
// const viewsDir = path.resolve(__dirname, '../src/views')
// const pageDir = path.join(viewsDir, pageName)
// // const routerFilePath = path.resolve(__dirname, '../src/router/routes.js')
// const routerFilePath = path.resolve(__dirname, '../src/router/index.js')

// // 创建页面目录和文件
// async function generate() {
//   try {
//     // 1. 创建页面文件夹
//     await fs.ensureDir(pageDir)
    
//     // 2. 创建 index.vue 文件
//     const vueTemplate = `<template>
//   <div class="${pageName}-container">
//     <h1>${pageName} 页面</h1>
//   </div>
// </template>

// <script setup>
// // 页面逻辑
// </script>

// <style scoped>
// .${pageName}-container {
//   padding: 20px;
// }
// </style>
// `
//     await fs.writeFile(path.join(pageDir, 'index.vue'), vueTemplate)
//     console.log(`✅ 页面文件已创建: src/views/${pageName}/index.vue`)

//     // 3. 自动追加路由配置（简单示例）
//     if (await fs.pathExists(routerFilePath)) {
//       const routeConfig = `\n  {\n    path: '/${pageName.toLowerCase()}',\n    name: '${pageName}',\n    component: () => import('@/views/${pageName}/index.vue')\n  },`
//       let routerContent = await fs.readFile(routerFilePath, 'utf-8')
      
//       // 在 routes 数组的最后一项前插入新路由
//       routerContent = routerContent.replace(
//         /(routes:\s*\[)([\s\S]*?)(\])/,
//         (match, p1, p2, p3) => {
//           return p1 + p2 + routeConfig + '\n' + p3
//         }
//       )
      
//       await fs.writeFile(routerFilePath, routerContent)
//       console.log(`✅ 路由已自动添加到 ${routerFilePath}`)
//     }

//   } catch (err) {
//     console.error('生成失败:', err)
//   }
// }

// generate()

// scripts/generate-page.js
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 获取页面名称
const pageName = process.argv[2]
if (!pageName) {
  console.error('请指定页面名称：npm run gen-page 页面名称')
  process.exit(1)
}

// 定义路径
const viewsDir = path.resolve(process.cwd(), 'src/views')
const pageDir = path.join(viewsDir, pageName)

// 生成页面文件
async function generatePage() {
  try {
    // 1. 创建页面目录和文件
    await fs.ensureDir(pageDir)
    
    const vueTemplate = `<template>
  <div class="${pageName}-container">
    <h1>${pageName} 页面</h1>
  </div>
</template>

<script setup>
// 页面逻辑
</script>

<style scoped>
.${pageName}-container {
  padding: 20px;
}
</style>
`
    await fs.writeFile(path.join(pageDir, 'index.vue'), vueTemplate)
    console.log(`✅ 页面文件已创建: src/views/${pageName}/index.vue`)

    // 2. 更新路由配置
    await updateRouter(pageName)

  } catch (err) {
    console.error('生成失败:', err)
  }
}

// 更新路由配置
async function updateRouter(pageName) {
    const routerFilePath = path.resolve(process.cwd(), 'src/router/route.ts')

  // 检查路由文件是否存在
  if (!await fs.pathExists(routerFilePath)) {
    console.log('⚠️ 路由文件不存在，正在创建...')
    // await createRouterFile()
    await fs.writeFile(routesFilePath, 'export default []\n')
  }

  let routerContent = await fs.readFile(routerFilePath, 'utf-8')
  
  // 生成新的路由配置
  const newRoute = `  {
    path: '/${pageName.toLowerCase()}',
    name: '${pageName}',
    component: () => import('@/views/${pageName}/index.vue')
  },`

  // 在 routes 数组中添加新路由
//   if (routerContent.includes('routes: [')) {
//     routerContent = routerContent.replace(
//       /(routes:\s*\[)([\s\S]*?)(\])/,
//       (match, p1, p2, p3) => {
//         // 去掉最后一个多余的逗号（如果有）
//         const cleanedRoutes = p2.trim().replace(/,$/, '')
//         return p1 + '\n' + cleanedRoutes + ',\n' + newRoute + '\n' + p3
//       }
//     )
//   }
routerContent = routerContent.replace(
    /(export\s+default\s+\[)([\s\S]*?)(\])/,
    (match, p1, p2, p3) => {
      const cleanedRoutes = p2.trim().replace(/,$/, '')
      return p1 + '\n' + cleanedRoutes + ',\n' + newRoute + '\n' + p3
    }
  )

  await fs.writeFile(routerFilePath, routerContent)
  console.log(`✅ 路由已添加到: ${routerFilePath}`)
}

// // 创建基础路由文件（如果不存在）
// async function createRouterFile() {
//   const routerTemplate = `import { createRouter, createWebHistory } from 'vue-router'

// const routes = []

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// export default router
// `
//   await fs.writeFile(routerFilePath, routerTemplate)
//   console.log('✅ 基础路由文件已创建')
// }

generatePage()