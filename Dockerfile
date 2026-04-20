# 📦 Use official Node.js LTS image
FROM node:20-alpine

# 📁 Set working directory
WORKDIR /app

# 📌 Copy package files first (better caching)
COPY package*.json ./

# 📦 Install dependencies (production only)
RUN npm install --production

# 📁 Copy entire project
COPY . .

# 🌍 Expose port (Render / VPS / Docker)
EXPOSE 3000

# 🚀 Start bot
CMD ["node", "index.js"]