import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3eveningmdRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3eveningmd',
    regions: ['MD'],
    url:"http://www.mdlottery.com/games/pick-3/winning-numbers/",
    data: {
      numbers: {
        path: 'tr:nth-child(2) td:nth-child(3) strong',
        transform: async (html) => {
          const numbers = html.first().text().trim().split("");
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/maryland/',
            path: 'tr:contains("Pick 3") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.last().text().trim().replace(/\s.+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'table.numbers_tabl tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3eveningmd',
    regions: ['MD'],
    url:"http://www.lotteryusa.com/maryland/pick-3/",
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


export const pick3eveningmdNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3eveningmd',
    regions: ['MD'],
    url:"http://www.mdlottery.com/games/pick-3/winning-numbers/",
    data: {
      jackpot: {
       path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/maryland/',
            path: 'tr:contains("Pick 3") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\s.+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot; 
        }
      },
      date: {
        path: 'table.numbers_tabl tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          let date = await getData({
            url: 'https://www.lotterypost.com/game/93',
            path: 'div.resultsNextDrawInfo p',
            transform: async (html) => {
              const text = html.first().text();
              const date = await moment(text, "ddd, MMM D, YYYY, h:mA").format();
              return date;
            }
          });
          return date;
        }
    }
}
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3eveningmd',
    regions: ['MD'],
    url:"http://www.lotteryusa.com/maryland/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 3") span.next-jackpot-amount',
        transform: async (html) => {
            return parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
        }
      },
      date: {
        path: 'tr:contains("Pick 3") span.next-draw-date',
        transform: async (html) => {
          let text = html.last().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];