import moment from 'moment';
const gameURL = 'http://www.lotterycanada.com/quebec-la-quotidienne-4';
const backupURL = 'https://www.lotterypost.com/game/252';
const jackpotURL = 'https://loteries.lotoquebec.com/en/lotteries/la-quotidienne';
import { getData } from '../helpers/getData';

export const laquotidienne4Recent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'laquotidienne4',
    regions: ['QC'],
    url:gameURL,
    data: {
      numbers: {
        path: '.panel-body .well .row .col-xs-12 h4 .label-number',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<4; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: 'table.oddWinning tr:nth-child(2) td:nth-child(3)',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.panel-title .lottery-name .draw-date',
        transform: async (html) => {
          const text = html.text().replace("- ", "");
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'laquotidienne4',
    regions: ['QC'],
    url:backupURL,
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
          let jackpot2 = await getData({
            url: jackpotURL,
            path: '.lqZoneTableauDonnees .lqTableauDonnees tr:nth-child(3) td:nth-child(3)',
            transform: async (html) => {
              const text = html.eq(2).text().replace(/\D/g,'');
              return parseInt(text);
            }
          });
          return jackpot2;
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

export const laquotidienne4Next = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'laquotidienne4',
    regions: ['QC'],
    url:gameURL,
    data: {
      jackpot: {
        path: 'table.oddWinning tr:nth-child(2) td:nth-child(3)',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.panel-footer .row .col-xs-8 span',
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
    lotteryName:'laquotidienne4',
    regions: ['QC'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2) .resultsJackpot',
        transform: async (html) => {
          let jackpot2 = await getData({
            url: jackpotURL,
            path: '.lqZoneTableauDonnees .lqTableauDonnees tr:nth-child(3) td:nth-child(3)',
            transform: async (html) => {
              const text = html.eq(2).text().replace(/\D/g,'');
              return parseInt(text);
            }
          });
          return jackpot2;
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