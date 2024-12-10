const puppeteer = require('puppeteer');
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
        try {
            const url = "https://energy-ua.info/cherga/3";
            const browser = await puppeteer.launch({
                headless: true, // У Production зазвичай headless
                args: ['--no-sandbox', '--disable-setuid-sandbox'], // Для Puppeteer у Docker
            });

            const page = await browser.newPage();
            await page.goto(url);

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