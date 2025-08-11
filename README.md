# AAWebFront - Vue 3 + Typescript Web前端


一个基于 Vue 3 + Vite + TypeScript 的前端项目，集成 Naive UI、Pinia、Vue Router、UnoCSS、Axios、ECharts 等，用于构建实训/教学管理相关的 Web 界面。

### 技术栈
- **框架**: Vue 3 (Composition API, SFC)
- **构建工具**: Vite 4
- **语言**: TypeScript
- **路由**: Vue Router 4（基于 `createWebHistory('/')`）
- **状态管理**: Pinia
- **UI 组件**: Naive UI
- **样式**: UnoCSS、Sass、animate.css
- **数据请求**: Axios（拦截器、统一错误码处理）
- **图表**: ECharts
- **工具**: dayjs、xlsx

## 环境要求
- Node.js 16+（推荐 18 LTS）
- 包管理器：npm（仓库包含 `package-lock.json`）

## 快速开始
1. 安装依赖
```bash
npm install
```
2. 新建开发环境变量文件 `.env.development`
```bash
VITE_TITLE=管理系统
VITE_BASE_API=/api/pc
```
3. 启动开发服务器
```bash
npm run dev
```
4. 生产构建与本地预览
```bash
npm run build
npm run preview
```

## 环境变量
- `VITE_TITLE`: 页面标题，注入到 `index.html` 的 `<title>` 模板中
- `VITE_BASE_API`: Axios 实例的 `baseURL`，开发环境通常设置为 `/api/pc`

说明：`vite.config.ts` 已配置了开发代理，将以 `/api/pc` 开头的请求代理到后端并去除前缀。

```ts
// vite.config.ts 节选
server: {
  proxy: {
    '/api/pc': {
      // 根据需要改为你的后端地址
      target: 'http://localhost:8080/api/pc',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/pc/, ''),
    },
  },
},
```

## NPM 脚本
- `npm run dev`: 启动开发服务器
- `npm run build`: 类型检查（`vue-tsc`）并构建生产包
- `npm run preview`: 预览构建产物

## 项目结构
```txt
.
├─ src/
│  ├─ api/                # 接口封装（Axios 基于统一实例）
│  ├─ components/         # 通用与业务组件
│  ├─ layout/             # 布局相关
│  ├─ router/             # 路由、守卫与动态路由装配
│  ├─ store/              # Pinia 状态（用户、权限、应用等）
│  ├─ styles/             # 全局样式（reset.css、global.scss）
│  ├─ types/              # TS 类型（Route.Row、User、Page 等）
│  ├─ utils/              # 工具库（storage/auth/request/common）
│  ├─ views/              # 页面模块（login、workbench、sys-manage 等）
│  ├─ App.vue             # 根组件（Naive UI Provider 注入）
│  └─ main.ts             # 应用入口（Pinia/Router 装配）
├─ public/                # 静态资源（favicon、loading）
├─ index.html             # HTML 模板（使用 VITE_TITLE）
├─ vite.config.ts         # Vite 配置（别名、插件、代理、构建）
├─ unocss.config.ts       # UnoCSS 配置与快捷类
├─ tsconfig*.json         # TypeScript 配置
└─ package.json
```

## 路由与权限
- 基础路由位于 `src/router/routes/index.ts` 的 `basicRoutes`，含 `/login`、`/404` 等。
- 项目采用 `createWebHistory('/')`，部署于根路径。如果部署到子路径，请同步调整：
  - Router history 基础路径
  - Vite `base`（`defineConfig({ base: '/子路径/' })`）
- 动态路由：登录成功后，会根据权限生成路由并通过 `router.addRoute` 挂载。
  - 扫描规则：会自动扫描 `views/**/route.ts` 并汇总为异步路由。

## 身份认证与会话
- Token 存储：本地存储键为 `access_token`，默认有效期 12 小时。
- 请求头：`Authorization: Token <token>`（在请求拦截器中自动注入）。
- Token 刷新：`/auth/refresh`，在过期前半段后尝试刷新；失败则跳转登录。
- 返回码约定：接口成功码为 `code === 1`，其他情况会通过全局消息提示；
  - `201/202/204/206` 等会触发登出并重定向至登录。

## 请求封装（Axios）
- 统一实例位于 `src/utils/request/index.ts`，`baseURL` 读取 `VITE_BASE_API`。
- 开箱方法：`request.get/post/put/delete`，返回统一的 `{ code, message, data }` 结构。
- GET/DELETE：若携带 `params`，会自动拼接为查询字符串（含数组/对象展开）。

示例：
```ts
// src/api/authApi.ts
login: (loginInfo) => request.post('/auth/login', loginInfo)
```

## 样式与 UI
- UnoCSS：已启用 `presetUno` 与 `presetAttributify`，同时配置了常用快捷类与自定义规则（见 `unocss.config.ts`）。
- 全局样式：`src/styles/reset.css`、`src/styles/global.scss`（通过 Vite `additionalData` 自动注入）。
- 动画：`animate.css`；UI 组件库：`Naive UI`（在 `App.vue` 挂载 Provider）。

## 构建与部署
1. 构建产物
```bash
npm run build
```
2. 产物位置：默认输出到 `dist/`，可部署到任意静态服务器（Nginx、Apache、Netlify 等）。
3. 路由模式为 History：生产环境请确保后端/网关做了 HTML5 History 路由回退（将未知路径重写到 `index.html`）。
4. 接口地址：
   - 方案 A（推荐开发）：保持 `VITE_BASE_API=/api/pc`，使用 Vite 代理；生产由网关同样配置 `/api/pc` 反向代理。
   - 方案 B：将 `VITE_BASE_API` 配置为完整后端地址（如 `https://your-domain.com/api/pc`），并在生产禁用前端代理。

## 常见问题
- 登录后白屏或无限跳转：
  - 检查 `VITE_BASE_API` 是否正确；
  - 后端 `/auth/login` 是否可达并返回 `code === 1`；
  - 浏览器是否禁用了本地存储或三方 Cookie（已开启 `withCredentials`）。
- 接口 404：
  - 开发环境检查 Vite 代理与 `VITE_BASE_API` 前缀是否一致；
  - 生产环境检查网关反向代理与跨域配置。
- 路由 404（部署后刷新丢失）：
  - 配置服务端将未知路由回退到 `index.html`（History 模式所需）。

## 许可证
本仓库未显式声明开源许可证，如需开源请自行添加 `LICENSE` 并在此处说明。

