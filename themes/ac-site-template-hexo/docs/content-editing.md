# 页面内容编辑说明

这份主题里，`Projects`、`CV`、`Personal`、`About` 的内容来源不完全一样。

## 去哪里修改

- `Projects`: 修改 `themes/ac-site-template-hexo/_config.yml` 里的 `projects` 列表，用来放作品、产品、仓库或可展示项目。
- `CV`: 修改 `themes/ac-site-template-hexo/_config.yml` 里的 `cv` 区块。当前 CV 不在导航中单独展示，而是合并渲染到 `Personal` 页面里的“履历速览”。
- `Personal`: 修改 `themes/ac-site-template-hexo/_config.yml` 里的 `personal` 区块，用来放更生活化的自我介绍、兴趣、链接和头像；同时会展示 `cv` 区块里的履历内容。
- `About`: 修改 `source/about/index.md`，用普通 Markdown 写站点介绍、同步流程、博客说明或联系说明。

## 四个页面的定位

- `Projects` 是“我做过什么”，更像作品集。
- `CV` 是“我作为候选人/合作者的正式履历”，当前作为结构化数据隐藏在主题配置中。
- `Personal` 是“我是谁、我喜欢什么、我常去哪里”，同时承载 CV 的履历速览，更像完整个人主页。
- `About` 是“这个站点是什么、怎么同步、为什么存在”，更像博客说明页。

当前推荐边界：`Personal = 关于我 + 履历速览`，`About = 关于本站`，`CV = 可复用的结构化履历数据`。如果以后需要正式简历页，可以把菜单里的 `cv.hidden` 改为 `false` 或删除这行。

## 自动化兼容提醒

这些页面不要求文章 frontmatter 增加新字段，也不会影响 `pub -> source/_posts -> npm run build -> GitHub Pages` 的同步发布链路。
