import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3middayilRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3middayil',
    regions: ['IL'],
    url:"https://www.lotterypost.com/game/53",
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
            url: 'http://www.lotteryusa.com/illinois/',
            path: 'tr:contains("Midday 3") span.jackpot-amount',
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
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3middayil',
    regions: ['IL'],
    url:"http://www.lotteryusa.com/illinois/midday-3/",
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


export const pick3middayilNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3middayil',
    regions: ['IL'],
    url:"https://www.lotterypost.com/game/53",
    data: {
      jackpot: {
       path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/illinois/',
            path: 'tr:contains("Midday 3") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
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
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3middayil',
    regions: ['IL'],
    url:"http://www.lotteryusa.com/illinois/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday 3") span.next-jackpot-amount',
        transform: async (html) => {
            let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
            return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Midday 3") span.next-draw-date',
        transform: async (html) => {
          let text = html.first().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];