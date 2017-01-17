import moment from 'moment';
const gameURL = 'http://www.lotterycanada.com/ontario-lottario';
const backupURL = 'https://www.lotterypost.com/game/241';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getJackpot, getNextJackpot, getFloatValue } from '../helpers/lotteryPost';

export const lottarioonRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lottarioon',
    regions: ['ON'],
    url:gameURL,
    data: {
      numbers: {
        path: '.results-table tbody tr',
        transform: async (html) => {
          const text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: '.panel.panel-info',
        transform: async (html) => {
          const payout = html.eq(0).find("table tbody tr:first-child td:nth-child(3)");
          return getFloatValue(payout.text());
        }
      },
      date: {
        path: '.col-sm-10 h1',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'lottarioon',
    regions: ['ON'],
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


export const lottarioonNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lottarioon',
    regions: ['ON'],
    url:gameURL,
    data: {
      jackpot: {
        path: ' body > .container h4',
        transform: async (html) => {
          const pos = html.eq(0).text().indexOf('-');
          const text = html.text().substring(pos+1); //.split(/[a-zA-Z]/)[0].replace(/\D/g,'');
          return getFloatValue(text);
        }
      },
      date: {
        path: ' body > .container h4',
        transform: async (html) => {
          const text = html.eq(0).text().replace("Estimated Jackpot for ", "");
          return await moment(text, "MMMM D, YYYY").format();
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'lottarioon',
    regions: ['ON'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
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