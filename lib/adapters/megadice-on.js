import moment from 'moment';
const gameTitle = 'Mega Dice';
const gameURL = 'http://www.lottostrategies.com/script/winning_of_past_month/100/ONM/ON/Ontario-ON-Mega-Dice-lottery-results.html';
const backupURL = 'https://www.lotterypost.com/game/426';
const jackpotURL = 'http://www.lotterycanada.com/megadice-lotto';
const jackpotBackupURL = 'http://www.olg.ca/lotteries/games/howtoplay.do?game=megadice';
const nextDrawURL = 'http://www.lottostrategies.com/script/last_results/263/ON/ontario-lottery-results.html';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getData } from '../helpers/getData';

export const megadiceRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'megadice',
    regions: ['ON'],
    url:gameURL,
    data: {
      numbers: {
        path: '.datagrid >table tbody',
        transform: async (html) => {
          var cell = html.eq(1).find("tr:first-child td:last-child");
          const text = cell.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: '.state-results',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '.panel-body .table.table-striped.table-condensed tbody tr:first-child td:last-child',
            transform: async (html) => {
              const text = html.first().text().replace(/\D/g,'');
              return parseInt(text)/100;
            }
          });
          return nextJackpot;
        }
      },
      date: {
        path: '.datagrid >table tbody',
        transform: async (html) => {
          var cell = html.eq(1).find("tr:first-child td:first-child");
          const text = cell.text();
          const date = await moment(text, "ddd MM/DD/YY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'megadice',
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
          let nextJackpot = await getData({
            url: jackpotBackupURL,
            path: '#PLcontainer table.font tr td.mdiceLottoPrizeCell2',
            transform: async (html) => {
              const text = html.first().text().replace(/\D/g,'');
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

export const megadiceNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'megadice',
    regions: ['ON'],
    url:nextDrawURL,
    data: {
      jackpot: {
        path: '.state-results',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '.panel-body .table.table-striped.table-condensed tbody tr:first-child td:last-child',
            transform: async (html) => {
              const text = html.first().text().replace(/\D/g,'');
              return parseInt(text)/100;
            }
          });
          return nextJackpot;
        }
      },
      date: {
        path: '.roundbox:last-child .next_date b',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "ddd, MMM D").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'megadice',
    regions: ['ON'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2) .resultsJackpot',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotBackupURL,
            path: '#PLcontainer table.font tr td.mdiceLottoPrizeCell2',
            transform: async (html) => {
              const text = html.first().text().replace(/\D/g,'');
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