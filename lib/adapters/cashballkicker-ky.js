import moment from 'moment';
import { getData } from '../helpers/getData';
export const cashballkickerkyRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cashballkickerky',
    regions: ['KY'],
    url:"https://www.kylottery.com/apps/draw_games/cashball",
    data: {
      numbers: {
        path: 'p img',
        transform: async (html) => {
          const numbers = html.eq(2).attr("alt").split('-');
          return numbers;

        }
      },
      jackpot: {
        path: 'div.single div > span',
        transform: async (html) => {
          return parseInt(html.eq(1).text().replace(/\D/g, ''));
        }
      },
      date: {
        path: 'span.date',
        transform: async (html) => {
          const text = html.text().replace(/(\s)/g,'');
          const date = await moment(text, " - MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'cashballkickerky',
    regions: ['KY'],
    url:"https://www.lotterypost.com/game/372",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().trim().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lottery.net/kentucky',
            path: 'table.bordered tr:contains("5 Numbers, Exact Order") td:nth-child(2)',
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


export const cashballkickerkyNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cashballkickerky',
    regions: ['KY'],
    url:"https://www.kylottery.com/apps/draw_games/cashball",
    data: {
      jackpot: {
        path: 'div.content_bg div span',
        transform: async (html) => {
          return parseInt(html.eq(2).text().replace(/\D/g, ''));
        }
      },
      date: {
        path: 'span.date',
        transform: async (html) => {       
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/kentucky/',
            path: 'tr:contains("Cashball") span.next-draw-date',
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
    lotteryName:'cashballkickerky',
    regions: ['KY'],
    url:"https://www.lotterypost.com/game/372",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lottery.net/kentucky',
            path: 'table.bordered tr:contains("5 Numbers, Exact Order") td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      
      date: {
        path: 'div.resultsNextDrawInfo p:nth-child(2)',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM D, YYYY, h:mm a").format();
          return date;
        }
      }
    }
  }
];