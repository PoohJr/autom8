import puppeteer from "puppeteer";
import fs from "fs";
const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const allBooks = [];
  let currentpage = 1;
  const maxpg = 3;
  const url = `https://books.toscrape.com/catalogue/page-${currentpage}.html`;
  await page.goto(url);

  while (currentpage <= maxpg) {
    const vid = await page.evaluate(() => {
      const vidtits = document.querySelectorAll(".product_pod");
      return Array.from(vidtits).map((vid) => {
        //GET TITLE BY GETTING THE ELEMENTS AND ATTRIUBUTE SINCE NO CLASS
        const title = vid.querySelector("h3 a").getAttribute("title");
        //TEXT CONTENT TO GET WHATS BEING SHOWN
        const price = vid.querySelector(".price_color").textContent;
        const stock = vid.querySelector(".instock.availability")
          ? "In Stock"
          : "Out of Stock";
        const rating = vid
          .querySelector(".star-rating")
          .className.split(" ")[1];
        const link = vid.querySelector("h3 a").getAttribute("href");
        return {
          title,
          price,
          stock,
          rating,
          link,
        };
      });
    });

    allBooks.push(...vid);
    console.log(`Books on current page ${currentpage}: `, vid);
    currentpage++;
  }

  fs.writeFileSync("books.json", JSON.stringify(allBooks, null, 2));

  await browser.close();
};

scrape();
