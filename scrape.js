import puppeteer from "puppeteer";

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = "https://books.toscrape.com/";
  await page.goto(url);

  const vid = await page.evaluate(() => {
    const vidtits = document.querySelectorAll(".product_pod");
    return Array.from(vidtits).map((vid) => {
      //GET TITLE BY GETTING THE ELEMENTS AND ATTRIUBUTE SINCE NO CLASS
      const title = vid.querySelector("h3 a").getAttribute("title");
      //TEXT CONTENT TO GET WHATS BEING SHOWN
      const price = vid.querySelector(".price_color").textContent;
      return price;
    });
  });
  console.log(vid);

  await browser.close();
};

scrape();
