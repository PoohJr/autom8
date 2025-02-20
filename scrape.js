import puppeteer from "puppeteer";

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://books.toscrape.com/");

  await page.locator(".thumbnail")
  const vid = await page.evaluate(() => {
    const vidtits = document.querySelectorAll("#video-title")
    return vidtits
  })
  console.log(vid);
  
  
  await browser.close();
};

scrape();
