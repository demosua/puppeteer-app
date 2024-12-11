const puppeteer = require('puppeteer');
const http = require('http');

const PORT = process.env.PORT || 4000;

const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
        try {
            const url = "https://energy-ua.info/cherga/3";

                const browser = await puppeteer.launch({
                    headless: true,
                    args: [
                      "--disable-setuid-sandbox",
                      "--no-sandbox",
                      "--single-process",
                      "--no-zygote",
                    ],
                    executablePath:
                      process.env.NODE_ENV === "production"
                        ? process.env.PUPPETEER_EXECUTABLE_PATH
                        : puppeteer.executablePath(),
                  });

            const page = await browser.newPage();
            await page.setUserAgent(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
            );
            await page.goto(url, { waitUntil: 'networkidle2' });

            const data = await page.evaluate(() => {
                const elements = document.querySelectorAll('.periods_items');
                return Array.from(elements).map(el => el.textContent.trim());
            });

            await browser.close();

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ data }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error: ' + error.message);
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});