# Образ для React-фронта (Vite dev-server).
# Поднимается вместе с остальными сервисами через docker compose up.
FROM node:22-alpine

WORKDIR /app

# Сначала только манифесты — чтобы слой с зависимостями кэшировался
COPY package*.json ./
RUN npm install

# Затем исходники (в compose код ещё и монтируется томом для hot-reload)
COPY . .

EXPOSE 5173

# --host 0.0.0.0, чтобы dev-server был доступен снаружи контейнера
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
