import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3middayiaRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3middayia',
    regions: ['IA'],
    url:"http://www.ialottery.com/Games/Online/Pick3MWin.asp",
    data: {
      numbers: {
        path: 'tr:nth-child(2) td:nth-child(2)',
        transform: async (html) => {
          const numbers = html.first().text().split(' - ');
          return numbers;
        }
      },
      jackpot: {
        path: 'h2.price',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.ialottery.com/Games/Online/Pick3.asp',
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
        path: 'tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "M/D/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3middayia',
    regions: ['IA'],
    url:"http://www.lotteryusa.com/iowa/midday-3/",
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


export const pick3middayiaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3middayia',
    regions: ['IA'],
    url:"http://www.ialottery.com/Games/Online/Pick3MWin.asp",
    data: {
      jackpot: {
        path: 'tr',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.ialottery.com/Games/Online/Pick3.asp',
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
        path: 'tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/iowa/',
            path: 'tr:contains("Midday 3") span.next-draw-date',
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
    lotteryName:'pick3middayia',
    regions: ['IA'],
    url:"http://www.lotteryusa.com/iowa/",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/iowa/',
            path: 'tr:contains("Midday 3") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = html.first().clone().children().remove().end().text().trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
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