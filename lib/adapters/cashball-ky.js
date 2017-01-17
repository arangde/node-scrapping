import moment from 'moment';
import { getData } from '../helpers/getData';
export const cashballkyRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cashballky',
    regions: ['KY'],
    url:"https://www.kylottery.com/apps/draw_games/cashball",
    data: {
      numbers: {
        path: 'p img',
        transform: async (html) => {
          const numbers = html.first().attr("alt").split('-');
          return numbers;

        }
      },
      jackpot: {
        path: 'div.content_bg div span',
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
    lotteryName:'cashballky',
    regions: ['KY'],
    url:"http://www.lotteryusa.com/kentucky/cashball/",
    data: {
      numbers: {
        path: 'span.string-results',
        transform: async (html) => {
          const numbers = html.first().text().replace(/(Cashball: |, K: [0-9]+)/g,'').split(', ');
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ''));
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


export const cashballkyNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cashballky',
    regions: ['KY'],
    url:"https://www.kylottery.com/apps/draw_games/cashball",
    data: {
      jackpot: {
        path: 'div.content_bg div span',
        transform: async (html) => {
          return parseInt(html.eq(1).text().replace(/\D/g, ''));
        }
      },
      date: {
        path: 'span.date',
        transform: async (html) => {       
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/73',
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
    lotteryName:'cashballky',
    regions: ['KY'],
    url:"http://www.lotteryusa.com/kentucky/",
    data: {
      jackpot: {
        path: 'tr:contains("Cashball") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Cashball") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];