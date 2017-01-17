import moment from 'moment';
const gameTitle = 'Bank a Million';
const gameURL = 'http://www.lotteryusa.com/virginia/';
const backupURL = 'https://www.lotterypost.com/game/487';
const backupJactpotURL = 'https://www.valottery.com/SearchNumbers/bankamillion/';
import { getData } from '../helpers/getData';
import { filterGameRow } from '../helpers/lotteryUSA';

export const bankamillionRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'bankamillion',
    regions: ['VA'],
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
    lotteryName:'bankamillion',
    regions: ['VA'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i<7; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsGrid',
        transform: async (result) => {
          let nextJackpot = await getData({
            url: backupJactpotURL,
            path: '#main_0_contentleft_2 .winningtierdesc tr:nth-child(2) td:last-child',
            transform: async (html) => {
              const text = html.first().text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
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

export const bankamillionNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'bankamillion',
    regions: ['VA'],
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
    lotteryName:'bankamillion',
    regions: ['VA'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsGrid',
        transform: async (result) => {
          let nextJackpot = await getData({
            url: backupJactpotURL,
            path: '#main_0_contentleft_2 .winningtierdesc tr:nth-child(2) td:last-child',
            transform: async (html) => {
              const text = html.first().text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
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