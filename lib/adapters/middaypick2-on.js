import moment from 'moment';
const gameURL = 'http://www.lotterycanada.com/ontario-pick-2-midday';
const backupURL = 'https://www.lotterypost.com/game/404';
const jackpotURL = 'http://www.olg.ca/lotteries/games/howtoplay.do?game=pick-2';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getData } from '../helpers/getData';

export const middaypick2Recent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'middaypick2',
    regions: ['ON'],
    url:gameURL,
    data: {
      numbers: {
        path: '.well .row .col-xs-12 h4',
        transform: async (html) => {
          const text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: '.well .table.table-striped.table-condensed tbody tr:first-child td:last-child',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text)/100;
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
    lotteryName:'middaypick2',
    regions: ['ON'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<2; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: 'td.body_lotteries',
            transform: async (html) => {
              const table = html.first().find(".data:contains('Prize Amount')").parents("table");
              const text = table.first().find("tr:nth-child(2) td:nth-child(2)").text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
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

export const middaypick2Next = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'middaypick2',
    regions: ['ON'],
    url:gameURL,
    data: {
      jackpot: {
        path: '.well .table.table-striped.table-condensed tbody tr:first-child td:last-child',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text)/100;
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
    lotteryName:'middaypick2',
    regions: ['ON'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2) .resultsJackpot',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: 'td.body_lotteries',
            transform: async (html) => {
              const table = html.first().find(".data:contains('Prize Amount')").parents("table");
              const text = table.first().find("tr:nth-child(2) td:nth-child(2)").text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
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