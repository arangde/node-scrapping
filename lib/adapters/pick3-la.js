import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3laRecent = [
  // Scraper for the recently passed draw (Primary)
  
  {
    lotteryName:'pick3la',
    regions: ['LA'],
    url:"http://louisianalottery.com/pick-3/tab/how-to-win",
    data: {
      numbers: {
        path: 'div.pad-mask span.numbers span.ball',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!="";i++){
            numbers[i] = html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'td.span1.color5',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ''));
        }
      },
      date: {
        path: 'span.text-error',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "dddd, MMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3la',
    regions: ['LA'],
    url:"http://www.lotteryusa.com/louisiana/pick-3/",
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


export const pick3laNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3la',
    regions: ['LA'],
    url:"http://louisianalottery.com/pick-3/tab/how-to-win",
    data: {
      jackpot: {
        path: 'td.span1.color5',
        transform: async (html) => {  
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'table.next-draw td.text-right',
        transform: async (html) => {
          const text = html.last().text().trim();
          const date = await moment(text, "MMM D, YYYY").format();
          return date;
        }
    }
  }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3la',
    regions: ['LA'],
    url:"http://www.lotteryusa.com/louisiana/pick-3/",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/louisiana/',
            path: 'tr:contains("Pick 3") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = html.first().clone().children().remove().end().text().trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'time',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/louisiana/',
            path: 'tr:contains("Pick 3") span.next-draw-date',
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
  }
];