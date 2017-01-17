import moment from 'moment';
const gameURL = 'http://www.lotterycanada.com/quebec-la-mini';
const backupURL = 'https://www.lotterypost.com/game/250';
const jackpotURL = 'https://loteries.espacejeux.com/en/lotteries/la-mini?outil=detailles#res';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getData } from '../helpers/getData';

export const laminiRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lamini',
    regions: ['QC'],
    url:gameURL,
    data: {
      numbers: {
        path: '.panel-body .well .row .col-xs-12.text-center h4 .label-number',
        transform: async (html) => {
          const numbers = html.html().split('');
          return numbers;
        }
      },
      jackpot: {
        path: 'table.oddWinning tr:nth-child(2) td:nth-child(2)',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.panel-title .lottery-name .draw-date',
        transform: async (html) => {
          const text = html.text().replace('- ', '');
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'lamini',
    regions: ['QC'],
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
          let nextDate = await getData({
            url: jackpotURL,
            path: '.lqZoneDetailsStructureLots table tr:first-child td:last-child',
            transform: async (html) => {
              const text = html.text().replace(/\D/g,'');
              return parseInt(text);
            }
          });
          return nextDate;
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

export const laminiNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lamini',
    regions: ['QC'],
    url:gameURL,
    data: {
      jackpot: {
        path: 'table.oddWinning tr:nth-child(2) td:nth-child(2)',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.panel-footer .row .col-xs-8 strong',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "MMMM D, YYYY").format();
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'lamini',
    regions: ['QC'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          let nextDate = await getData({
            url: jackpotURL,
            path: '.lqZoneDetailsStructureLots table tr:first-child td:last-child',
            transform: async (html) => {
              const text = html.text().replace(/\D/g,'');
              return parseInt(text);
            }
          });
          return nextDate;
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