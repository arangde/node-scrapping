import moment from 'moment';
const gameURL = 'http://www.lotterycanada.com/ontario-49';
const backupURL = 'https://www.lotterypost.com/game/240';
const jackpotURL = 'http://www.olg.ca/lotteries/games/howtoplay.do?game=ontario49';
import { getData } from '../helpers/getData';

export const ontario49Recent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'ontario49',
    regions: ['ON'],
    url:gameURL,
    data: {
      numbers: {
        path: '.results-table tbody tr td strong',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<html.length; i++) {
            numbers.push(html.eq(i).text());
          }
          return numbers;
        }
      },
      jackpot: {
        path: '.panel-body .table.table-striped.table-condensed tbody tr:nth-child(1) td:nth-child(3)',
        transform: async (html) => {
          const text = html.eq(0).text().replace(/\D/g,'');
          return parseInt(text)/100;
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
    lotteryName:'ontario49',
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
            url: jackpotURL,
            path: '#ontario49PrizeTableContainer table tbody tr:first-child td:nth-child(2)',
            transform: async (html) => {
              const text = html.text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
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


export const ontario49Next = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'ontario49',
    regions: ['ON'],
    url:gameURL,
    data: {
      jackpot: {
        path: '.col-sm-8 h4',
        transform: async (html) => {
          const text = html.html().replace("Estimated Jackpot for ", "");
          const pos = text.indexOf(" - ");
          const jackpot = text.substring(pos).split(/[a-zA-Z]/)[0].replace(/\D/g,'');
          return parseInt(jackpot)/100;
        }
      },
      date: {
        path: '.col-sm-8 h4',
        transform: async (html) => {
          const text = html.html().replace("Estimated Jackpot for ", "");
          return await moment(text, "MMMM D, YYYY").format();
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'ontario49',
    regions: ['ON'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2) .resultsJackpot',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '#jackpotContent p.fontSize450',
            transform: async (html) => {
              const text = html.text().replace(/\D/g,'');
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