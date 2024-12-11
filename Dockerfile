FROM ghcr.io/puppeteer/puppeteer:23.10.2

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

# Експортуємо порт
EXPOSE 3000

# Запускаємо додаток
CMD ["node", "index.js"]