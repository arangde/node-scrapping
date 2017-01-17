import moment from 'moment';
const gameURL = "http://www.lotterycanada.com/lotto-649";
const backupURL = 'https://www.lotterypost.com/lotto649';
import { getJackpot, getNextJackpot, getFloatValue } from '../helpers/lotteryPost';

export const lotto649Recent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lotto649',
    regions: ['AC'],
    url : gameURL,
    data: {
      numbers: {
        path: 'table.results-table tbody tr',
        transform: async (html) => {
          const numbers = html.text().match(/\d+/g);
          return numbers;
        }
      },
      jackpot: {
        path: '.panel-body table:nth-child(1) tbody tr:nth-child(1) td:last-child',
        transform: async (html) => {
          const text = html.first().text().replace(/\D/g,'');
          return parseInt(text) / 100;
        }
      },
      date: {
        path: '.row > .col-sm-8 > .row > .col-sm-10 > h1',
        transform: async (html) => {
          let text = html.text();
          text = text.split('-')[0].trim();
          const date = await moment(text, "MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'lotto649',
    regions: ['AC'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<7; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          return getJackpot(html);
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

export const lotto649Next = [
  // Scraper for the next draw (Primary)
  {
    lotteryName:'lotto649',
    regions: ['AC'],
    url: gameURL,
    data: {
      jackpot: {
        path: '.row > .col-sm-8 > h4',
        transform: async (html) => {
          const text = html.first().text().split('-')[1].replace(/\D/g,'');
          return parseInt(text) / 100;
        }
      },
      date: {
        path: '.row > .col-sm-8 > h4',
        transform: async (html) => {
          const text = html.first().text().split('-')[0].replace('Estimated Jackpot for','').trim();
          return await moment(text, "MMMM DD, YYYY").format();
        }
      }
    }
  },
  // Scraper for the next draw (Backup)
  {
    lotteryName:'lotto649',
    regions: ['AC'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',// .resultsJackpot .jackpotnative
        transform: async (html) => {
          return getNextJackpot(html);
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