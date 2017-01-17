import cheerio from 'cheerio';
import moment from 'moment';
import scrape from '../services/scrapeURLsAndSaveNewData'
process.on('unhandledRejection', console.log);

const sourcesRecent = [
  { Url:'http://www.lotteryusa.com/powerball/', Scraper: scriptRecent1 },
  { Url:'http://www.lotteryusa.com/powerball/', Scraper: scriptRecent1 }
];

const sourcesNext = [
  { Url: 'http://www.lotteryusa.com/powerball/', Scraper: scriptNext1  }
];

async function scriptRecent1 (html) {
  const $ = cheerio.load(html);
  let scrapedNumbers = [];

  const currentDraw = $('.result');

  // date
  let date = currentDraw.children().first().text();
  date = await moment(date, "ddd, MMM DD, YYYY").format();

  // numbers
  currentDraw.children().eq(1).children().each(function(index, elem){
    scrapedNumbers.push($(this).text().trim().replace(/\D/g,''));
  });

  // jackpot amount
  let jackpot = $('.jackpot-amount').text().replace(/\D/g,'');
  jackpot = parseInt(jackpot);

  return { date, scrapedNumbers, jackpot };
}

async function scriptNext1 (html){
  const $ = cheerio.load(html);

  //date
  let date = $('.next-draw-date').text();
  date = await moment(date, "ddd, MMM DD, YYYY").format();

  // jackpot
  let jackpot = $('.next-jackpot-amount').text().split(/[a-zA-Z](.+)?/)[0].replace(/\D/g,'');
  jackpot = parseInt(jackpot);
  
  return { date, jackpot };
}

const lottery = {
  name: 'powerball',
  region:['CAN','USA'],
  drawTime:'Tuesday and Friday at 11:00 EST',
  sourcesRecent,
  sourcesNext
};

export default async function () {
  await scrape(lottery);
}