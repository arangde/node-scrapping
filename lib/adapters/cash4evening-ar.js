import moment from 'moment';
const gameTitle = 'Cash 4';
const gameURL = 'http://www.lotteryusa.com/arkansas/';
const backupURL = 'https://www.lotterypost.com/game/380';
const jackpotURL = 'http://myarkansaslottery.com/games/cash-4';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getData } from '../helpers/getData';

export const cash4eveningarRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash4eveningar',
    regions: ['AR'],
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
    lotteryName:'cash4eveningar',
    regions: ['AR'],
    url: backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<4; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: 'table#Cash4 tr:nth-child(2) td:last-child',
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

export const cash4eveningarNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash4eveningar',
    regions: ['AR'],
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
    lotteryName:'cash4eveningar',
    regions: ['AR'],
    url: backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2) .resultsJackpot',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: 'table#Cash4 tr:nth-child(2) td:last-child',
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