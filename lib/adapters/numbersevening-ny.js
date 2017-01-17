import moment from 'moment';
const gameTitle = 'Numbers';
const gameURL = 'http://www.lotteryusa.com/new-york/';
const backupURL = 'https://www.lotterypost.com/game/146';
const jackpotURL = 'http://www.lottery.com/news/official_rules.cfm/GameID/NY3';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getData } from '../helpers/getData';

export const numberseveningnyRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'numberseveningny',
    regions: ['NY'],
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
    lotteryName:'numberseveningny',
    regions: ['NY'],
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
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '.centerWellPadding',
            transform: async (html) => {
              const table = html.first().find("th:contains('Sum of Number Picked')").parents("table");
              const text = table.first().find("tbody tr:nth-child(2) td:last-child").text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
              return parseInt(text) / 100;
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

export const numberseveningnyNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'numberseveningny',
    regions: ['NY'],
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
    lotteryName:'numberseveningny',
    regions: ['NY'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2) .resultsJackpot',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '.centerWellPadding',
            transform: async (html) => {
              const table = html.first().find("th:contains('Sum of Number Picked')").parents("table");
              const text = table.first().find("tbody tr:nth-child(2) td:last-child").text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
              return parseInt(text) / 100;
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