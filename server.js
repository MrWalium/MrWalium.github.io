const puppeteer = require("puppeteer");

async function fetchPage(url) {
    const browser = await puppeteer.launch({
        headless: "new", // Ensures the latest headless mode
        args: ["--no-sandbox", "--disable-setuid-sandbox"] // Required for Vercel
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const html = await page.content();
    await browser.close();
    return html;
}
