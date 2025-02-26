const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public folder
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Fetch page HTML using Puppeteer
app.get("/fetch", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("Missing URL");
  }

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const content = await page.content();
    await browser.close();

    res.send(content);
  } catch (error) {
    console.error("Error fetching page:", error);
    res.status(500).send("Error fetching page");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
