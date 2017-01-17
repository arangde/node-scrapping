import moment from 'moment';
const gameURL = 'http://www.lotterycanada.com/ontario-daily-keno-midday';
const backupURL = 'https://www.lotterypost.com/game/406';
const jackpotURL = 'http://kenoonline.ca/olg-keno-winning-numbers/';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getData } from '../helpers/getData';

export const middaykenoRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'middaykeno',
    regions: ['ON'],
    url:gameURL,
    data: {
      numbers: {
        path: '.well .row .col-xs-12.text-center h4',
        transform: async (html) => {
          const text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: 'table.oddWinning',
        transform: async (html) => {
          const text = html.find("strong:contains('10 PICK')").parents("tr").find("td:nth-child(3)").text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.panel-title .lottery-name span',
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
    lotteryName:'middaykeno',
    regions: ['ON'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<20; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '#tabs-3',
            transform: async (html) => {
              const text = html.text();
              const prize = text.substring(text.indexOf('$')).split(/[a-zA-Z]/)[0].replace(/\D/g,'');
              return parseInt(prize);
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

export const middaykenoNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'middaykeno',
    regions: ['ON'],
    url:gameURL,
    data: {
      jackpot: {
        path: 'table.oddWinning',
        transform: async (html) => {
          const text = html.find("strong:contains('10 PICK')").parents("tr").find("td:nth-child(3)").text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.panel-footer .row .col-xs-8 span strong',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "MMMM D, YYYY").format();
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'middaykeno',
    regions: ['ON'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '#tabs-3',
            transform: async (html) => {
              const text = html.text();
              const prize = text.substring(text.indexOf('$')).split(/[a-zA-Z]/)[0].replace(/\D/g,'');
              return parseInt(prize);
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