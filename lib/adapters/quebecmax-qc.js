import moment from 'moment';
const gameURL = 'http://www.lotterycanada.com/quebec-max';
const backupURL = 'https://www.lotterypost.com/game/423';
const jackpotURL = 'https://loteries.lotoquebec.com/en/lotteries/quebec-max';
import { getJackpot, getNextJackpot, getFloatValue } from '../helpers/lotteryPost';
import { getData } from '../helpers/getData';

export const quebecmaxRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "quebecmax",
    regions: ["QC"],
    url: gameURL,
    data: {
      numbers: {
        path: 'table.results-table tr',
        transform: async (html) => {
          const numbers = html.first().text().match(/\d+/g);
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

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "quebecmax",
    regions: ["QC"],
    url: backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<8; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: ".resultsGrid",
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '.lqZoneDetailsStructureLots table tr:nth-child(2) td:last-child',
            transform: async (html) => {
              const text = html.first().text().replace(/\D/g,'');
              return parseInt(text)/100;
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

export const quebecmaxNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "quebecmax",
    regions: ["QC"],
    url: gameURL,
    data: {
      jackpot: {
        path: '.panel-body table:nth-child(1) tbody tr:nth-child(1) td:last-child',
        transform: async (html) => {
          const text = html.first().text().replace(/\D/g,'');
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
  // scraper for the next draw (backup)
  {
    lotteryName: "quebecmax",
    regions: ["QC"],
    url: backupURL,
    data: {
      jackpot: {
        path: ".resultsNextDrawInfoUnit",
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '.lqZoneDetailsStructureLots table tr:nth-child(2) td:last-child',
            transform: async (html) => {
              const text = html.first().text().replace(/\D/g,'');
              return parseInt(text)/100;
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
  },
];