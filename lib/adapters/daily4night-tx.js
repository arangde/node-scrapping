import moment from 'moment';
import { getData } from '../helpers/getData';
export const daily4nighttxRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily4nighttx',
    regions: ['TX'],
    url:"http://www.txlottery.org/export/sites/lottery/Games/Daily_4/",
    data: {
      numbers: {
        path: 'div.large-6:nth-child(2) ol',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.last().children().eq(i).text() != "" ; i++){
            numbers[i] = html.last().children().eq(i).text().replace(/\D/g,"");
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.txlotteryx.com/Daily-4-Day/prizes-and-odds.htm',
            path: 'table.tbl02 tr:contains("Exact Order") td:nth-child(5)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.large-6:nth-child(2) div.gameInfo p',
        transform: async (html) => {
          const text = html.eq(1).text().replace('Daily 4 Night Winning Numbers for ', '');
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'daily4nighttx',
    regions: ['TX'],
    url:"https://www.lotterypost.com/game/324",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.slice(1).eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/texas/',
            path: 'tr:contains("Daily 4") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.resultsDrawDate',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "dddd, MMMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const daily4nighttxNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily4nighttx',
    regions: ['TX'],
    url:"http://www.txlottery.org/export/sites/lottery/Games/Daily_4/",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.txlotteryx.com/Daily-4-Day/prizes-and-odds.htm',
            path: 'table.tbl02 tr:contains("Exact Order") td:nth-child(5)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.large-6:nth-child(2) div.gameInfo p',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/texas/',
            path: 'tr:contains("Daily 4") span.next-draw-date',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text, "ddd, MMM DD, YYYY").format();
              return date;
            }
          });
          return nextDate;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'daily4nighttx',
    regions: ['TX'],
    url:"https://www.lotterypost.com/game/324",
    data: {
      jackpot: {
        path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/texas/',
            path: 'tr:contains("Daily 4") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.resultsNextDrawInfo p',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];