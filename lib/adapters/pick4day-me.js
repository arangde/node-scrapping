import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick4daymeRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4dayme',
    regions: ['ME', 'NH', 'VT'],
    url:"http://www.mainelottery.com/games/pickFourHistory.shtml",
    data: {
      numbers: {
        path: 'tr:contains("Day")',
        transform: async (html) => {
          const numbers = [];
          for(let i=2; html.eq(1).children().eq(i).text()!=""; i++){
            numbers[i-2]=html.eq(1).children().eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/maine/',
            path: 'tr:contains("Midday 4") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Day")',
        transform: async (html) => {
          const text = html.eq(1).children().first().text().trim();
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4dayme',
    regions: ['ME', 'NH', 'VT'],
    url:"http://www.lotteryusa.com/maine/midday-4/",
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


export const pick4daymeNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4dayme',
    regions: ['ME', 'NH', 'VT'],
    url:"http://www.mainelottery.com/games/pickFourHistory.shtml",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/maine/',
            path: 'tr:contains("Midday 4") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Day")',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/226',
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
    lotteryName:'pick4dayme',
    regions: ['ME', 'NH', 'VT'],
    url:"http://www.lotteryusa.com/maine/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday 4") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Midday 4") span.next-draw-date',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];