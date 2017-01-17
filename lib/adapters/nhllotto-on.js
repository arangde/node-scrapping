import moment from 'moment';
const gameURL = 'http://www.lotterycanada.com/nhl-lotto';
const backupURL = 'http://www.lottostrategies.com/script/last_results/263/ON/ontario-lottery-results.html';
const jackpotURL = 'http://www.olg.ca/lotteries/games/howtoplay.do?game=nhllotto';
import { getData } from '../helpers/getData';

export const nhllottoRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'nhllotto',
    regions: ['ON'],
    url:gameURL,
    data: {
      numbers: {
        path: '.panel-body .well .row .col-xs-10',
        transform: async (html) => {
          const text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
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
        path: '.panel-heading .panel-title .lottery-name .draw-date',
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
    lotteryName:'nhllotto',
    regions: ['ON'],
    url:backupURL,
    data: {
      numbers: {
        path: '.roundbox:nth-child(8)',
        transform: async (html) => {
          const numbers = [];
          const balls = html.find(".ball.ball3.blu");
          for(var i=0; i<balls.length; i++) {
            numbers.push(balls.eq(i).text());
          }
          return numbers;
        }
      },
      jackpot: {
        path: '.roundbox:nth-child(8)',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '.wheel-of-fortuneInstantPrizeTableContainer',
            transform: async (html) => {
              const text = html.last().find("tbody tr:first-child td:nth-child(2)").text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
              return parseInt(text);
            }
          });
          return nextJackpot;
        }
      },
      date: {
        path: '.roundbox:nth-child(8) .draw_date',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "ddd MMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];

export const nhllottoNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'nhllotto',
    regions: ['ON'],
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
        path: '.panel-footer .col-xs-8 span',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "MMMM D, YYYY").format();
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'nhllotto',
    regions: ['ON'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.roundbox:nth-child(8)',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: '.wheel-of-fortuneInstantPrizeTableContainer',
            transform: async (html) => {
              const text = html.last().find("tbody tr:first-child td:nth-child(2)").text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
              return parseInt(text);
            }
          });
          return nextJackpot;
        }
      },
      date: {
        path: '.roundbox:nth-child(8) .next_date b',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "ddd, MMM D").format();
        }
      }
    }
  }
];