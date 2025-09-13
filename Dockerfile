# 多阶段构建 - 构建阶段
FROM node:20.11.0 AS builder

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装所有依赖（包括开发依赖，构建需要）
RUN npm ci --silent

# 复制源代码
COPY . .

# 构建应用（跳过TypeScript类型检查，直接构建）
RUN npx vite build

# 生产阶段 - 运行阶段
FROM nginx:latest

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 删除nginx默认的静态文件
RUN rm -rf ./*

# 从构建阶段复制构建好的dist目录
COPY --from=builder /app/dist/ .

# 复制自定义nginx配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 设置文件权限
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]