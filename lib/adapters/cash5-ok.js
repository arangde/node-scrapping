import moment from 'moment';
const gameTitle = 'Cash 5';
const gameURL = 'http://www.lotteryusa.com/oklahoma/';
const backupURL = 'https://www.lotterypost.com/game/309';
const jackpotURL = 'http://www.lottostrategies.com/script/prize_payout?state=Oklahoma&game=OK1&area1=US&area2=OK';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getData } from '../helpers/getData';

export const cash5okRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash5ok',
    regions: ['OK'],
    url:gameURL,
    data: {
      numbers: {
        path: '.state-results',
        transform: async (html) => {
          const row = filterGameRow(gameTitle, html);
          const text = row.find('.result .draw-result').text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: '.state-results',
        transform: async (html) => {
          const row = filterGameRow(gameTitle, html);
          const text = row.find('.jackpot-amount').text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.state-results',
        transform: async (html) => {
          const row = filterGameRow(gameTitle, html);
          const text = row.find('.date').text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'cash5ok',
    regions: ['OK'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<5; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsGrid',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '.datagrid table tr:nth-child(2) td:first-child',
            transform: async (html) => {
              const text = html.text().replace(/\D/g,'');
              return parseInt(text);
            }
          });
          return nextJackpot;
        }
      },
      date: {
        path: '.resultsGrid .resultsDrawDate',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "dddd, MMMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];

export const cash5okNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash5ok',
    regions: ['OK'],
    url:gameURL,
    data: {
      jackpot: {
        path: '.state-results',
        transform: async (html) => {
          const row = filterGameRow(gameTitle, html);
          const text = row.find('.next-jackpot-amount').text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.state-results',
        transform: async (html) => {
          const row = filterGameRow(gameTitle, html);
          const text = row.find('.next-draw-date').text();
          return await moment(text, "ddd, MMM DD, YYYY").format();
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'cash5ok',
    regions: ['OK'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsGrid',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '.datagrid table tr:nth-child(2) td:first-child',
            transform: async (html) => {
              const text = html.text().replace(/\D/g,'');
              return parseInt(text);
            }
          });
          return nextJackpot;
        }
      },
      date: {
        path: '.resultsNextDrawInfoUnit:first-child .resultsNextDrawInfo label + p',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "ddd, MMM DD, YYYY").format();
        }
      }
    }
  }
];