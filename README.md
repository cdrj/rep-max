# RepMax Calculator

一个现代化的 1RM (1 Repetition Maximum) 计算器，基于不同的科学公式帮助您计算最大重复次数重量。

![Next.js](https://img.shields.io/badge/Next.js-15.0.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?logo=tailwind-css)

## ✨ 特性

- 🧮 **多种计算公式**：支持 7 种主流 1RM 计算公式
  - Epley 公式
  - Brzycki 公式
  - Lander 公式
  - Lombardi 公式
  - Mayhew 公式
  - O'Connor 公式
  - Wathan 公式

- 🎯 **智能输入验证**：
  - 重复次数限制为 1-10 次
  - 重量必须大于 0
  - 支持实时输入和删除

- 🎨 **现代化 UI 设计**：
  - 基于 shadcn/ui 组件库
  - 响应式设计，完美适配移动端
  - 暗色模式支持
  - 中文界面

- ⚡ **高性能**：
  - Next.js 15 App Router
  - 实时计算结果
  - 优化的用户体验

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 📱 使用方法

1. 输入您能完成的重量（公斤）
2. 选择重复次数（1-10 次）
3. 查看不同公式计算出的 1RM 结果
4. 参考表格中的训练重量百分比

## 🛠️ 技术栈

- **前端框架**：Next.js 15.0.4 (App Router)
- **UI 库**：React 19.0.0
- **样式方案**：Tailwind CSS + shadcn/ui
- **类型安全**：TypeScript 5
- **部署平台**：Cloudflare Pages
- **图标库**：Lucide React

## 📁 项目结构

```
rep-max/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # 全局样式
│   │   ├── layout.tsx          # 根布局组件
│   │   └── page.tsx            # 主页面组件
│   ├── components/
│   │   └── ui/                 # shadcn/ui 组件
│   │       ├── button.tsx      # 按钮组件
│   │       ├── input.tsx       # 输入框组件
│   │       ├── select.tsx      # 选择器组件
│   │       └── table.tsx       # 表格组件
│   └── lib/
│       └── utils.ts            # 工具函数
├── public/                     # 静态资源
└── 配置文件...
```

## 🧮 计算公式说明

### Epley 公式
```
1RM = 重量 × (1 + 次数 / 30)
```

### Brzycki 公式
```
1RM = 重量 × 36 / (37 - 次数)
```

### Lander 公式
```
1RM = 100 × 重量 / (101.3 - 2.67123 × 次数)
```

### Lombardi 公式
```
1RM = 重量 × 次数^0.10
```

### Mayhew 公式
```
1RM = 100 × 重量 / (52.2 + 41.9 × e^(-0.055 × 次数))
```

### O'Connor 公式
```
1RM = 重量 × (1 + 0.025 × 次数)
```

### Wathan 公式
```
1RM = 100 × 重量 / (48.8 + 53.8 × e^(-0.075 × 次数))
```

## 🔧 配置

### 环境变量

创建 `.env.local` 文件（可选）：

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 构建配置

- **TypeScript 配置**：`tsconfig.json`
- **Tailwind 配置**：`tailwind.config.ts`
- **Next.js 配置**：`next.config.js`
- **组件配置**：`components.json`

## 🚀 部署

### Vercel 部署

```bash
npm run build
```

将构建结果部署到 Vercel。

### Cloudflare Pages 部署

项目已配置 Cloudflare Pages 部署，使用 `wrangler.toml` 配置文件。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 本项目
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -am 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 提交 Pull Request

### 代码规范

- 使用 ESLint 进行代码检查
- 遵循 TypeScript 最佳实践
- 组件使用 PascalCase 命名
- 保持代码简洁和可读性

## 📝 更新日志

### 2025-05-22
- ✨ 实现基础 1RM 计算功能
- 🎯 添加输入验证：次数 ≥ 1，重量 ≥ 0
- 🔄 支持自由输入和删除

### 2025-05-23
- 🎨 集成 shadcn/ui 组件库
- 📋 将重复次数输入改为下拉选择（1-10 次）
- 📱 优化移动端体验

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Radix UI](https://www.radix-ui.com/) - 无头 UI 组件

---

💪 **开始训练，突破极限！**