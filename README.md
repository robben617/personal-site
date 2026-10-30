# personal-site

个人作品集与线上简历，站内嵌了一个读过站内资料的 AI 分身，可以直接向它提问。

- 首页：作品集与关键数字
- `/resume`：线上简历，浏览器打印即出 A4 PDF
- `/ask`：AI 分身，流式回答，只按站内资料作答

## 技术栈

| 层 | 选型 | 说明 |
|---|---|---|
| 框架 | Next.js 16（App Router） | 页面静态预渲染，只有一个动态路由 |
| 语言 | TypeScript | 严格模式 |
| 样式 | Tailwind CSS 4 | 设计令牌集中定义，不引外部字体 |
| 模型 | DeepSeek（OpenAI 兼容） | `deepseek-chat`，1M 上下文 |
| 部署 | Node 运行时 | 需要一个能跑 Node 的平台 |

运行时依赖只有 3 个：`next`、`react`、`react-dom`。

## 本地运行

```bash
npm install
cp .env.example .env.local   # 填入 DEEPSEEK_API_KEY
npm run dev                  # http://localhost:3000
```

密钥不填也能跑：`/api/chat` 会进入演示模式，逐字吐一段固定话术，用来验证流式链路和界面，不消耗额度。

生产构建：

```bash
npm run build
npm start
```

## 环境变量

| 变量 | 必填 | 默认 | 说明 |
|---|---|---|---|
| `DEEPSEEK_API_KEY` | 否 | 空 | 留空则 `/api/chat` 走演示模式 |
| `DEEPSEEK_MODEL` | 否 | `deepseek-chat` | 可换 `deepseek-v4-pro` |
| `NEXT_PUBLIC_SITE_URL` | 否 | `http://localhost:3000` | 换域名时只改这一处 |
| `CONTACT_EMAIL` | 否 | 空 | 页面展示的联系邮箱；留空则隐藏邮箱入口 |

## 目录结构

```
app/
  layout.tsx              侧栏 + 全局元信息 + JSON-LD
  page.tsx                首页（作品集）
  resume/page.tsx         线上简历
  ask/page.tsx            AI 分身
  api/chat/route.ts       模型网关：限流、密钥、流式转发
components/
  sidebar.tsx             侧栏导航与邮箱复制
  work-card.tsx           作品卡与 AI 入口
  chat/chat-panel.tsx     流式聊天面板
data/
  profile.json            个人信息唯一来源
  works.json              作品数据唯一来源
  kb/faq.ts               无法从上面两者派生的手写问答
lib/
  content.ts              读数据、生成知识库与系统提示词
  rate-limit.ts           进程内限流
```

## 几个设计决策

**知识库不是另写一份 Markdown。** `lib/content.ts` 从 `profile.json` 和 `works.json` 程序化生成知识库文本，所以页面上显示的数字和 AI 读到的数字永远同源，不会出现"网页说 827、AI 说 800"这种问题。

**没有上向量库。** 全站知识库约 4500 tokens，模型上下文窗口是 1M，全量塞进系统提示词比检索更准也更简单。等评测数据证明直塞不够用了再上 RAG。

**密钥只在服务端。** 浏览器拿不到 Key，请求统一走 `/api/chat`，由服务端带 Key 调模型。前端只接收纯文本流。

**限流在校验之后。** 无效请求不消耗配额，避免误伤正常访客。阈值是每分钟 12 次、每天 150 次。多实例部署时需要把 `lib/rate-limit.ts` 换成 Redis 或 KV，否则每个实例各算各的。

**答案不返回 Markdown。** 提示词里明确要求纯文本，前端直接渲染文本节点，省掉一个 Markdown 解析依赖，也没有 XSS 面。

## 安全

- `.env*` 已加入 `.gitignore`，密钥不会进仓库
- **联系邮箱不写进仓库**：`data/profile.json` 的 `email` 留空，构建时由 `CONTACT_EMAIL` 注入，公开仓库里看不到明文邮箱
- 上游错误不透传原文，只返回归类后的提示
- 单条输入 800 字上限，最多带 12 轮历史，总长 6000 字

## License

MIT
