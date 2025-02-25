const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

async function fetchPage(url) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    let html = await page.content();

    html = html.replace(/(src|href)="(\/[^"]*)"/g, `$1="${url}$2"`);

    await browser.close();
    return html;
  } catch (error) {
    await browser.close();
    return `<p>Error: ${error.message}</p>`;
  }
}

app.get("/fetch", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing URL parameter");

  console.log(`Fetching: ${url}`);
  const html = await fetchPage(url);
  res.send(html);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => console.log(`🚀 Running at port ${PORT}`));
