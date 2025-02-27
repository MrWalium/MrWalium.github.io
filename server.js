const puppeteer = require("puppeteer");

module.exports = async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: "new", // Ensures latest headless mode
            args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required for Vercel
            executablePath: process.env.CHROME_EXECUTABLE_PATH // Uses correct Chrome path on Vercel
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
