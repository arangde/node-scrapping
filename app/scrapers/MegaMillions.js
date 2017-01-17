import cheerio from 'cheerio';
import scrape from '../services/scrapeURLsAndSaveNewData';
import moment from 'moment';

const sourcesRecent = [
  { Url:'http://www.lotteryusa.com/mega-millions/', Scraper: scriptPrimary }
  // { Url:'http://www.megamillions.com/winning-numbers/last-25-drawings', Scraper: scriptSecondary }
];

const sourcesNext = [
  { Url: 'http://www.megamillions.com/', Scraper: scriptNext }
];

async function scriptPrimary (html) {
  const $ = cheerio.load(html);
  let scrapedNumbers = [];

  $('.draw-result').children().each(function (index, elem) {
    scrapedNumbers.push($(this).text().trim().replace(/\D/g,''));
  });

  const date = $('.date').children().text();
  const jackpot = parseInt($('.jackpot-amount').text().replace(/\D/g,''));
  return { date, scrapedNumbers, jackpot };
}


async function scriptNext (html){
  const lotteryName = lottery.name;
  const $ = cheerio.load(html);

  let date = $(".home-next-drawing-date-top").children().eq(2).text().trim();

  // TODO: THis date format will not always work because it doesn't have 0's for month and date.
  date = moment(date, "M/DD/YYYY").format();
  const jackpot = parseInt($(".home-next-drawing-estimated-jackpot-dollar-amount").text())*1000000;

  return { date, jackpot };
}

const lottery = {
  name: 'megamillions',
  region: 'USA',
  drawTime:'Tuesday and Friday at 11:00 EST',
  sourcesRecent,
  sourcesNext
};

export default async function () {
  await scrape(lottery);
}