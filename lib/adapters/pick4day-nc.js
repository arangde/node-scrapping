import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick4dayncRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4daync',
    regions: ['NC'],
    url:"http://www.nc-educationlottery.org/pick4_past.aspx",
    data: {
      numbers: {
        path: 'tr:contains("Daytime") td:nth-child(3)',
        transform: async (html) => {
          const numbers = html.first().text().trim().split(" - ");
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/north-carolina/',
            path: 'tr:contains("Midday Pick 4") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Daytime") td:nth-child(1)',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4daync',
    regions: ['NC'],
    url:"http://www.lotteryusa.com/north-carolina/midday-pick-4/",
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


export const pick4dayncNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4daync',
    regions: ['NC'],
    url:"http://www.nc-educationlottery.org/pick4_past.aspx",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/north-carolina/',
            path: 'tr:contains("Midday Pick 4") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Daytime") td:nth-child(1)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/389',
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
    lotteryName:'pick4daync',
    regions: ['NC'],
    url:"http://www.lotteryusa.com/north-carolina/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday Pick 4") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Midday Pick 4") span.next-draw-date',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];