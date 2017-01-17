import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick4eveningilRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4eveningil',
    regions: ['IL'],
    url:"https://www.lotterypost.com/game/50",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!="";i++){
            numbers[i] = html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/illinois/',
            path: 'tr:contains("Daily 4") span.jackpot-amount',
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
          const text = html.first().text().trim();
          const date = await moment(text, "dddd, MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4eveningil',
    regions: ['IL'],
    url:"http://www.lotteryusa.com/illinois/daily-4/",
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


export const pick4eveningilNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4eveningil',
    regions: ['IL'],
    url:"https://www.lotterypost.com/game/50",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/illinois/',
            path: 'tr:contains("Daily 4") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: '.resultsNextDrawInfo p:nth-child(2)',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM D, YYYY, h:m a").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4eveningil',
    regions: ['IL'],
    url:"http://www.lotteryusa.com/illinois/",
    data: {
      jackpot: {
        path: 'tr:contains("Daily 4") span.next-jackpot-amount',
        transform: async (html) => {
            let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
            return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Daily 4") span.next-draw-date',
        transform: async (html) => {
          let text = html.first().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];