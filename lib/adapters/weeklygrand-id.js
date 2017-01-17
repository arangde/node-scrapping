import moment from 'moment'; 
import { getData } from '../helpers/getData';
export const weeklygrandidRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'weeklygrandid',
    regions: ['ID'],
    url:"http://www.idaholottery.com/games/draw/weeklygrand/",
    data: {
      numbers: {
        path: 'p.ballsBox',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.first().children().eq(i).text()!="";i++){
            numbers[i] = html.first().children().eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'tr.p3pBody:nth-child(3) td:nth-child(4)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://lotterycorner.com/results/id/weekly-grand-winning-numbers.html',
            path: '.table-bordered > tbody > tr:nth-child(1) > td:nth-child(3)',
            transform: async (html) => {
              let jackpot = html.first().text().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'table#cpMain_Left_ctl01_GridView1 tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "M/D/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'weeklygrandid',
    regions: ['ID'],
    url:"http://www.lotteryusa.com/idaho/weekly-grand/",
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
            return parseInt(html.first().text().trim().replace(/\D/g,""));
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


export const weeklygrandidNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'weeklygrandid',
    regions: ['ID'],
    url:"http://www.idaholottery.com/games/draw/weeklygrand/",
    data: {
      jackpot: {
       path: 'tr.p3pBody:nth-child(3) td:nth-child(4)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://lotterycorner.com/results/id/weekly-grand-winning-numbers.html',
            path: '.table-bordered > tbody > tr:nth-child(1) > td:nth-child(3)',
            transform: async (html) => {
              let jackpot = html.first().text().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'table#cpMain_Left_ctl00_GridView1 tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/396',
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
    lotteryName:'weeklygrandid',
    regions: ['ID'],
    url:"http://www.lotteryusa.com/idaho/weekly-grand/",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
            let jackpot = await getData({
            url: 'http://www.lotteryusa.com/idaho/',
            path: 'tr:contains("Weekly Grand") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = html.first().clone().children().remove().end().text().trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'time',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/idaho/',
            path: 'tr:contains("Weekly Grand") span.next-draw-date',
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
  }
];
