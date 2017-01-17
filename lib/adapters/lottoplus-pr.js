import moment from 'moment';
const gameTitle = 'Lotto';
const gameURL = 'http://www.lotteryusa.com/puerto-rico/';
const backupURL = 'https://www.lotterypost.com/game/299';
const jackpotURL = 'http://www.lottostrategies.com/script/last_results/252/PR/puerto-lottery-results.html';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getData } from '../helpers/getData';
import { getJackpot, getNextJackpot, getFloatValue } from '../helpers/lotteryPost';

export const lottoplusprRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lottopluspr',
    regions: ['PR'],
    url:gameURL,
    data: {
      numbers: {
        path: '.state-results',
        transform: async (html) => {
          const row = filterGameRow(gameTitle, html);
          const text = row.find('.result .string-results').text();
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
    lotteryName:'lottopluspr',
    regions: ['PR'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<6; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          // return getJackpot(html);
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '.roundbox:nth-child(2) table',
            transform: async (html) => {
              const nextJackpot = getFloatValue(html.first().find("span.fs19 b").text());
              const change = getFloatValue(html.first().find("span.fs12 b").text());
              return nextJackpot - change;
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

export const lottoplusprNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lottopluspr',
    regions: ['PR'],
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
    lotteryName:'lottopluspr',
    regions: ['PR'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          // return getNextJackpot(html);
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '.roundbox:nth-child(2) table span.fs19',
            transform: async (html) => {
              const text = html.first().text();
              return getFloatValue(text);
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