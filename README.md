# Vue 3 + NaiveUI + TypeScript 项目模板

<div align="center">

![Vue 3](https://img.shields.io/badge/Vue-3.5.27-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=flat-square&logo=vite&logoColor=white)
![Naive UI](https://img.shields.io/badge/Naive%20UI-2.43.2-18A058?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.18-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0.4-FFD859?style=flat-square)

</div>

🚀 **现代化的 Vue 3 + TypeScript 项目模板**

这是一个基于 Vue 3 + TypeScript 的现代化前端项目模板，集成了多个主流技术栈和工具链，适合快速启动新项目。

## ✨ 特性

- 🎯 **Vue 3** + **TypeScript** - 现代化的前端开发体验
- 🎨 **Naive UI** - 优雅的 Vue 3 组件库
- 🎭 **IconPark** - 丰富的图标库支持
- 🎪 **Tailwind CSS** - 实用程序优先的 CSS 框架
- 🔥 **Vite** - 极速的构建工具
- 📦 **Pinia** - 轻量级状态管理
- 🛣️ **Vue Router** - 官方路由管理
- 🌐 **Axios** - 完整的 HTTP 客户端封装
- 🤖 **Auto Import** - 智能自动导入
- 📱 **响应式设计** - 移动端友好
- 🔧 **开箱即用** - 零配置启动开发

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/Msg-Lbo/vue3-naive-template.git

# 进入项目目录
cd vue3-naive-template

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 🎯 使用场景

- ✅ 中后台管理系统
- ✅ 企业级应用开发
- ✅ 快速原型开发
- ✅ 学习现代前端技术栈

## 🚀 技术栈

### 核心框架
- **Vue 3** (^3.5.27) - 渐进式 JavaScript 框架
- **TypeScript** (~5.9.3) - 静态类型检查
- **Vite** (^7.3.1) - 新一代前端构建工具

### 路由和状态管理
- **Vue Router** (^4.6.4) - 官方路由管理器
- **Pinia** (^3.0.4) - 新一代状态管理库

### UI 组件库
- **Naive UI** (^2.43.2) - 现代化的 Vue 3 组件库

### 图标库
- **@icon-park/vue-next** (^1.4.2) - 字节跳动出品的图标库，支持 Vue 3

### 样式解决方案
- **Tailwind CSS** (^4.1.18) - 实用程序优先的 CSS 框架
- **PostCSS** (^8.5.6) - CSS 处理工具
- **Autoprefixer** (^10.4.23) - 自动添加 CSS 前缀

### 网络请求
- **Axios** (^1.13.2) - HTTP 客户端

### 自动化工具
- **unplugin-auto-import** (^21.0.0) - 自动导入 Vue 3 API
- **unplugin-vue-components** (^31.0.0) - 自动导入组件

## 📁 项目结构

```
123pan-list/
├── public/                    # 静态资源
│   └── vite.svg
├── src/
│   ├── apis/                  # API 接口
│   │   ├── apis.ts           # 业务 API
│   │   └── index.ts          # Axios 封装
│   ├── assets/               # 静态资源
│   ├── components/           # 公共组件
│   ├── pages/                # 页面组件
│   │   ├── admin/           # 管理端页面
│   │   └── client/          # 客户端页面
│   ├── router/              # 路由配置
│   │   └── index.ts
│   ├── stores/              # 状态管理
│   │   ├── auth.ts         # 认证状态
│   │   └── config.ts       # 配置状态
│   ├── types/               # TypeScript 类型定义
│   │   └── index.d.ts
│   ├── App.vue              # 根组件
│   ├── main.ts              # 应用入口
│   └── style.css            # 全局样式
├── index.html               # HTML 模板
├── package.json             # 项目配置
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
├── tsconfig.app.json       # 应用 TypeScript 配置
├── tsconfig.node.json      # Node.js TypeScript 配置
└── postcss.config.js       # PostCSS 配置
```

## ⚙️ 配置文件详解

### 1. Vite 配置 (`vite.config.ts`)

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  plugins: [
    vue(),
    // 自动导入 Vue 3 API 和 Naive UI 组合式函数
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"],
        },
      ],
    }),
    // 自动导入组件
    Components({
      resolvers: [NaiveUiResolver(), IconParkResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src", // 路径别名
    },
  },
});
```

**特性：**
- 支持 Vue 3 API 自动导入（ref、reactive、computed 等）
- 支持 Naive UI 组件和组合式函数自动导入
- 支持 IconPark 图标自动导入
- 配置路径别名 `@` 指向 `src` 目录

### 2. TypeScript 配置

**主配置 (`tsconfig.json`)：**
使用项目引用方式，分离应用代码和构建工具代码的配置。

**应用配置 (`tsconfig.app.json`)：**
- 继承 Vue 官方 TypeScript 配置
- 启用严格模式
- 支持路径别名
- 包含自动导入类型文件

### 3. PostCSS 配置 (`postcss.config.js`)

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // Tailwind CSS 处理
    autoprefixer: {},           // 自动添加浏览器前缀
  },
}
```

### 4. 样式配置 (`src/style.css`)

```css
@import "tailwindcss"; /* 导入 Tailwind CSS */

*{
  box-sizing: border-box; /* 统一盒模型 */
}
```

## 🏗️ 核心功能模块

### 1. 路由系统
- 支持懒加载
- 分离管理端和客户端路由
- 使用 History 模式

### 2. 状态管理 (Pinia)
- 认证状态管理
- 支持 Token 持久化
- 类型安全的状态管理

### 3. API 封装
- 基于 Axios 的统一封装
- 支持请求/响应拦截器
- 自动添加认证 Token
- 统一错误处理
- 支持 TypeScript 类型推导

### 4. 自动导入
- Vue 3 API 自动导入（无需手动 import）
- 组件自动导入（Naive UI 组件和 IconPark 图标）
- 类型声明自动生成

## 🛠️ 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

## 📦 依赖说明

### 生产依赖
- `vue`: Vue 3 框架核心
- `@icon-park/vue-next`: 图标库
- `unplugin-auto-import`: 自动导入插件
- `unplugin-vue-components`: 组件自动导入插件

### 开发依赖
- `@vitejs/plugin-vue`: Vite 的 Vue 插件
- `naive-ui`: UI 组件库
- `pinia`: 状态管理库
- `vue-router`: 路由库
- `axios`: HTTP 客户端
- `tailwindcss`: CSS 框架
- `typescript`: TypeScript 编译器
- `vue-tsc`: Vue TypeScript 编译器

## 🎯 特色功能

### 1. 智能自动导入
- **Vue 3 API**: 无需手动导入 `ref`、`reactive`、`computed` 等
- **Naive UI**: 组件和组合式函数自动导入
- **IconPark**: 图标组件自动导入
- **类型安全**: 自动生成类型声明文件

### 2. 现代化构建
- **Vite**: 极速热重载和构建
- **TypeScript**: 完整的类型支持
- **ESM**: 原生 ES 模块支持

### 3. 样式解决方案
- **Tailwind CSS**: 实用程序优先的样式框架
- **PostCSS**: 现代 CSS 处理
- **自动前缀**: 跨浏览器兼容性

### 4. 网络请求
- **统一封装**: 基于 Axios 的完整封装
- **自动认证**: Token 自动管理
- **错误处理**: 统一的错误处理机制
- **类型安全**: 完整的 TypeScript 支持

## 🔧 自定义配置

### 添加新的自动导入
在 `vite.config.ts` 中修改 `AutoImport` 配置：

```typescript
AutoImport({
  imports: [
    "vue",
    "vue-router", // 添加 Vue Router 自动导入
    {
      "naive-ui": ["useDialog", "useMessage"], // 添加更多 Naive UI 函数
    },
  ],
})
```

### 添加新的组件解析器
```typescript
Components({
  resolvers: [
    NaiveUiResolver(),
    // 添加其他组件库解析器
  ],
})
```

## 📝 使用建议

1. **组件开发**: 利用自动导入特性，专注于业务逻辑开发
2. **状态管理**: 使用 Pinia 进行状态管理，充分利用 TypeScript 类型推导
3. **样式开发**: 优先使用 Tailwind CSS 类名，必要时编写自定义 CSS
4. **API 开发**: 使用封装好的 request 方法，确保类型安全
5. **图标使用**: 直接使用 IconPark 图标名称作为组件，无需手动导入

这个项目模板为现代 Vue 3 应用开发提供了完整的基础设施，可以快速启动新项目并保持代码的可维护性和类型安全性。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目模板！

### 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## ⭐ 支持

如果这个项目对你有帮助，请给它一个 ⭐️！

## 📞 联系

- 作者：[Msg-Lbo]
- 邮箱：msglbo@foxmail.com
- GitHub：[@Msg-Lbo](https://github.com/Msg-Lbo)

## 🙏 致谢

感谢以下优秀的开源项目：

- [Vue.js](https://vuejs.org/)
- [Naive UI](https://www.naiveui.com/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [IconPark](https://iconpark.oceanengine.com/)
- [Pinia](https://pinia.vuejs.org/)

---

<div align="center">

**[⬆ 回到顶部](#vue-3--naiveui--typescript-项目模板)**

Made with ❤️ by [Msg-Lbo]

</div> 