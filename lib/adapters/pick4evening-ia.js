import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick4eveningiaRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4eveningia',
    regions: ['IA'],
    url:"http://www.ialottery.com/Games/Online/Pick4Win.asp",
    data: {
      numbers: {
        path: 'tr:nth-child(2) td:nth-child(2) span',
        transform: async (html) => {
          const numbers = html.first().text().split(" - ");
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.ialottery.com/Games/Online/Pick4.asp',
            path: 'tr.odd:nth-child(2) td:nth-child(4)',
            transform: async (html) => {
              let jackpot = html.first().text().trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:nth-child(2) td:nth-child(1) span',
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
    lotteryName:'pick4eveningia',
    regions: ['IA'],
    url:"http://www.lotteryusa.com/iowa/pick-4/",
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


export const pick4eveningiaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4eveningia',
    regions: ['IA'],
    url:"http://www.ialottery.com/Games/Online/Pick4Win.asp",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.ialottery.com/Games/Online/Pick4.asp',
            path: 'tr.odd:nth-child(2) td:nth-child(4)',
            transform: async (html) => {
              let jackpot = html.first().text().trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:nth-child(2) td:nth-child(1) span',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/iowa/',
            path: 'tr:contains("Pick 4") span.next-draw-date',
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
    lotteryName:'pick4eveningia',
    regions: ['IA'],
    url:"http://www.lotteryusa.com/iowa/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 4") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = html.first().clone().children().remove().end().text().trim().replace(/\D/g,"");
          return parseInt(jackpot);
        }
      },
      date: {
        path: 'tr:contains("Pick 4") span.next-draw-date',
        transform: async (html) => {
          let text = html.first().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];