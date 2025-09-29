# Etapa 1: build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servir o build
FROM node:18-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
CMD ["serve", "-s", "dist", "-l", "3000", "-H", "0.0.0.0"]
