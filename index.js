const puppeteer = require('puppeteer');

(async () => {
    const url = "https://energy-ua.info/cherga/3";
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
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

    console.log(data);

    await browser.close();
})();