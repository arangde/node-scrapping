import request from 'request';
import cheerio from 'cheerio';
import Promise from 'bluebird';
import moment from 'moment';
Promise.promisifyAll(request);

// Change the primary URL to which ever URL you are building a scraper for.
const lottery = {
  url:'https://www.lotterypost.com/game/228/jackpot'
};

// write a script in here to get back the wanted data.
// this block can then be used exactly in the scraping file for the game.
async function scriptPrimary (html) {
  const lotteryName = lottery.name;
  const $ = cheerio.load(html);

  const scrapedNumbers = [];
  const jackpotContent = $(".podtable").children().eq(1).children().eq(1);
  const jackpot = jackpotContent.children().eq(1).text().split("Million",1)[0].replace('CA$','')*1000000;

  let date = jackpotContent.children().eq(0).text().replace(/\W+/g, " ");
  date = await moment(date, "ddd MMM DD YYYY").format();

  const numbersResponse = await request.getAsync('https://www.wclc.com/winning-numbers/lotto-649-extra.htm');
  const numbersHtml = numbersResponse.body;
  const $2 = cheerio.load(numbersHtml);

  $2('.pastWinNumbers').first().children().each(function(index, elem){
    scrapedNumbers.push($(this).text().trim().replace(/\D/g,''));
  });

  return { lotteryName, date, jackpot, scrapedNumbers };
}

async function run(url) {
  const response = await request.getAsync(url);
  const html = response.body;
  scriptPrimary(html);
}

run(lottery.url);