import request from 'request';
import cheerio from 'cheerio';
import Promise from 'bluebird';
import moment from 'moment';
import scrape from '../services/scrapeURLsAndSaveNewData'

Promise.promisifyAll(request);

const sourcesRecent = [
  { Url:'https://www.lotterypost.com/game/228/jackpot', Scraper: scriptRecent }
];

const sourcesNext = [
  { Url: 'http://www.olg.ca/lotteries/games/howtoplay.do?game=lotto649', Scraper: scriptNext  }
];

async function scriptRecent (html) {
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

  return { date, jackpot, scrapedNumbers };
}

async function scriptNext (html){
  const $ = cheerio.load(html);

  const jackpotContent = $("#jackpotContent");
  let date = jackpotContent.children().first().text().replace('The next Jackpot is','').trim();
  date = await moment(date + ' 2016', "ddd,  MMM DD YYYY").format();

  let jackpot = parseInt(jackpotContent.children().eq(1).text().replace('estimated','').replace(/\D/g,''));

  return { date, jackpot };
}

const lottery = {
  name: 'lotto649',
  region: 'CAN',
  drawTime:'Tuesday and Friday at 11:00 EST',
  sourcesRecent,
  sourcesNext
};

export default async function () {
  await scrape(lottery);
}