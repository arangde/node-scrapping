import moment from 'moment';
import { getData } from '../helpers/getData';
export const daily4eveninginRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily4eveningin',
    regions: ['IN'],
    url:"https://www.hoosierlottery.com/games/daily-4",
    data: {
      numbers: {
        path: 'table.drawingsGrid tbody tr:contains("Evening") td:nth-child(2)',
        transform: async (html) => {
          const numbers = html.first().text().replace(/\s/g,"").split("-");
          
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackprizeLowercase',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'table.drawingsGrid tbody tr:contains("Evening") td:nth-child(1)',
        transform: async (html) => {
          let text = '';
          text = html.first().text().replace(/[^0-9-]/g,"");
          const date = await moment(text, "MM/DD/YY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'daily4eveningin',
    regions: ['IN'],
    url:"http://www.lotteryusa.com/indiana/daily-4/",
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
          return parseInt(html.first().text().replace(/\D/g,""));
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


export const daily4eveninginNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily4eveningin',
    regions: ['IN'],
    url:"https://www.hoosierlottery.com/games/daily-4",
    data: {
      jackpot: {
        path: 'span.jackprizeLowercase',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {      
        path: 'table.drawingsGrid tbody tr:contains("Evening") td:nth-child(1)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/57',
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
    lotteryName:'daily4eveningin',
    regions: ['IN'],
    url:"http://www.lotteryusa.com/indiana/",
    data: {
      jackpot: {
        path: 'tr:contains("Daily 4") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Daily 4") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];