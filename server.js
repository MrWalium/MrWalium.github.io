const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");

module.exports = async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath, // Ensures correct Chromium path
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        await page.goto("https://example.com", { waitUntil: "networkidle2" });

        const html = await page.content();
        await browser.close();

        res.status(200).send(html);
    } catch (error) {
        console.error("Error fetching page:", error);
        res.status(500).send("Error fetching page");
    }
};
