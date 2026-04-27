# Astro 到 Hexo 组件映射表

## 页面级映射

| Astro 页面/布局 | Hexo 目标 | 说明 |
| --- | --- | --- |
| `src/layouts/BaseLayout.astro` | `layout/layout.ejs` | 全局壳层、侧栏、横幅、主题切换入口 |
| `src/pages/index.astro` | `layout/index.ejs` | 首页欢迎区 + 最新文章卡片流 |
| `src/layouts/PostLayout.astro` | `layout/post.ejs` | 文章详情页、标签、上一篇/下一篇 |
| `src/pages/blog/[...page].astro` | `layout/blog.ejs` | 独立博客列表页，使用 Hexo 数据手写循环 |
| `src/pages/blog/[slug].astro` | `layout/post.ejs` | 继续使用 Hexo 文章模型 |
| `src/pages/notes/[...page].astro` | `layout/tags.ejs` | 不迁移 notes，借鉴列表风格实现标签索引页 |
| `src/pages/cv.astro` / `personal.astro` | `layout/page.ejs` | 本轮不迁移为独立栏目，保留 About 普通页面 |

## 组件级映射

| Astro 组件 | Hexo partial | 处理策略 |
| --- | --- | --- |
| `SideBar.astro` | `partial/sidebar.ejs` | 保留 NookPhone 侧栏信息架构 |
| `SideBarMenu.astro` | `partial/sidebar.ejs` | 菜单内联到侧栏 partial，减少跳转层级 |
| `Header.astro` | `partial/mobile-bar.ejs`（并入 `layout.ejs`） | 改为移动端标题栏 |
| `Footer.astro` | `partial/footer-banner.ejs` + 页脚块 | 统一到 Hexo 页脚 |
| `Card.astro` / `HorizontalCard.astro` | `partial/post-card.ejs` | 统一文章卡片结构 |
| 主题横幅切换逻辑 | `partial/header-banner.ejs` / `partial/footer-banner.ejs` | 保留 `data-light-src` / `data-dark-src` |

## 有状态交互降级

| Astro 交互 | Hexo 实现 |
| --- | --- |
| 主题切换 | 原生 JS + `localStorage` |
| 响应式 Drawer | 原生 JS 切换 `body[data-nav-open]` |
| 活跃菜单高亮 | 由模板根据 `page.path` / `is_*` 计算 |
| View Transitions | 不迁移 |

## 样式落地策略

- Tailwind / DaisyUI 不直接引入到 Hexo。
- 把参考仓库中的 token、圆角、阴影、按钮按压态手工转译为主题 CSS 变量。
- 所有类名使用 `ac-` 前缀，避免污染 Hexo 默认输出。
- 分页、标签、归档不使用 Hexo helper 的默认 DOM，统一手写 EJS 循环输出结构。
