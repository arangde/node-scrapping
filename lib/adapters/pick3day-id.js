import moment from 'moment'; 
import { getData } from '../helpers/getData';
export const pick3dayidRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3dayid',
    regions: ['ID'],
    url:"http://www.idaholottery.com/games/draw/pick3/",
    data: {
      numbers: {
        path: 'p.p3BallsBox.day',
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
          return parseInt(html.first().text().trim().replace(/\D/g,""));
        }
      },
      date: {
        path: 'table#cpMain_Left_ctl00_GridView1 tr:nth-child(2) td:nth-child(1)',
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
    lotteryName:'pick3dayid',
    regions: ['ID'],
    url:"http://www.lotteryusa.com/idaho/midday-pick-3/",
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


export const pick3dayidNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3dayid',
    regions: ['ID'],
    url:"http://www.idaholottery.com/games/draw/pick3/",
    data: {
      jackpot: {
       path: 'tr.p3pBody:nth-child(3) td:nth-child(4)',
        transform: async (html) => {
          return parseInt(html.first().text().trim().replace(/\D/g,""));  
        }
      },
      date: {
        path: 'table#cpMain_Left_ctl00_GridView1 tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/375',
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
    lotteryName:'pick3dayid',
    regions: ['ID'],
    url:"http://www.lotteryusa.com/idaho/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday Pick 3") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Midday Pick 3") span.next-draw-date',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];