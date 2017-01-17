import moment from 'moment';
import { getData } from '../helpers/getData';
export const daily4daytxRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily4daytx',
    regions: ['TX'],
    url:"http://www.txlottery.org/export/sites/lottery/Games/Daily_4/Winning_Numbers/",
    data: {
      numbers: {
        path: 'tr td:nth-child(4)',
        transform: async (html) => {
          const numbers = html.first().text().replace(/\s/g,"").split("-");
          
          return numbers;
        }
      },
      jackpot: {
        path: 'table.tbl02 tr:contains("Exact Order") td:nth-child(5)',
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
        path: 'a.detailsLink',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'daily4daytx',
    regions: ['TX'],
    url:"http://www.lotteryusa.com/texas/midday-4/",
    data: {
      numbers: {
        path: 'ul.draw-result',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.first().children().eq(i).text() != ''; i++){
            numbers[i]=html.first().children().eq(i).text().trim().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g , ''));
        }
      },
      date: {
        path: 'time',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const daily4daytxNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily4daytx',
    regions: ['TX'],
    url:"http://www.txlottery.org/export/sites/lottery/Games/Daily_4/Winning_Numbers/",
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
        path: 'a.detailsLink',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/323',
            path: 'div.resultsNextDrawInfo p',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text, "ddd, MMM DD, YYYY, h:mA").format();
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
    lotteryName:'daily4daytx',
    regions: ['TX'],
    url:"http://www.lotteryusa.com/texas/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday 4") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Midday 4") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];