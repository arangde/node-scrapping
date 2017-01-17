import moment from 'moment';
const gameTitle = 'Cash 5';
const gameURL = 'http://www.lotteryusa.com/colorado/';
import { filterGameRow } from '../helpers/lotteryUSA';

export const cash5coRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash5co',
    regions: ['CO'],
    url:'https://www.coloradolottery.com/en/games/cash5/',
    data: {
      numbers: {
        path: '.winningNumbers .draw',
        transform: async (html) => {
          const text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: '.winningNumbers .jackpot > span',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.winningNumbers p:first-child strong',
        transform: async (html) => {
          const text = html.text().replace(" Winning Numbers", "");
          const date = await moment(text, "dddd, M/D").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'cash5co',
    regions: ['CO'],
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
  }
];


export const cash5coNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash5co',
    regions: ['CO'],
    url:'https://www.coloradolottery.com/en/games/cash5/',
    data: {
      jackpot: {
        path: '.commercial p:first-child .punch-up',
        transform: async (html) => {
          const text = html.text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.commercial p:nth-child(2) .punch-up',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "dddd, M/D").format();
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'cash5co',
    regions: ['CO'],
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
  }
];