import moment from 'moment';
const gameTitle = 'Cash 3';
const gameURL = 'http://www.lotteryusa.com/tennessee/';
const backupURL = 'https://www.lotterypost.com/game/227';
const jackpotURL = 'http://lotterycorner.com/results/tn/cash-3-evening-winning-numbers.html';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getData } from '../helpers/getData';

export const cash3eveningtnRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash3eveningtn',
    regions: ['TN'],
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
    lotteryName:'cash3eveningtn',
    regions: ['TN'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<3; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsGrid',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: 'table.table-bordered.table-striped.col-sm-12 tbody tr:first-child td:last-child',
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

export const cash3eveningtnNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash3eveningtn',
    regions: ['TN'],
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
    lotteryName:'cash3eveningtn',
    regions: ['TN'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsGrid',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: 'table.table-bordered.table-striped.col-sm-12 tbody tr:first-child td:last-child',
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