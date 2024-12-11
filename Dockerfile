# Використовуємо офіційний Node.js образ
FROM node:18

# Встановлюємо залежності для Puppeteer
RUN apt-get update \
  && apt-get install -y wget gnupg \
  && apt-get install -y \
  libnss3 \
  libxss1 \
  libasound2 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdbus-1-3 \
  libdrm2 \
  libgbm1 \
  libgtk-3-0 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libu2f-udev \
  libvulkan1 \
  fonts-liberation \
  libappindicator3-1 \
  xdg-utils \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

# Вказуємо порт
EXPOSE 3000

# Запускаємо додаток
CMD ["node", "index.js"]