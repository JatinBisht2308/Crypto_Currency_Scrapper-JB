const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
let url = "https://crypto.com/price";
// making request to the website
request(url, cb);

// defining the call back function
function cb(err, res, html) {
  if (err) {
    console.log(err);
  } else if (res.statusCode === 404) {
    console.log("Page Not Found!!!!");
  } else {
    handleHtml(html);
  }
}

// defining the handleHtml function
function handleHtml(code) {
  // console.log(code)
  const selector = cheerio.load(code);
  let tableRowArray = selector(".chakra-table.css-1bveei3");
  // console.log(tableRowArray.html());
  var priceTable = tableRowArray.html();
  let destPath = path.join(__dirname, "priceTable.html");
  console.log(destPath);
  let finalHtml =
    `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
  <table>
  ` +
    priceTable +
    `</table>
    </body>
  </html>`;
  fs.appendFileSync(destPath, finalHtml);
}
