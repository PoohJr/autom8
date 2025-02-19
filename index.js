import puppeteer from "puppeteer";

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://books.toscrape.com");

  await page.setViewport({ width: 1080, height: 1024 });
  await page.locator("catalogue/category/books_2/index.html").click();

  //   const title = await page.title();
  //   console.log("Book Titles:", title);

  await browser.close();
};

scrape();
