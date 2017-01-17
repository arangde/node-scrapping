import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick4laRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4la',
    regions: ['LA'],
    url:"http://louisianalottery.com/pick-4/tab/winning-numbers",
    data: {
      numbers: {
        path: 'div.pad-mask span.winning-numbers-item span.numbers span.ball',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!=""; i++){
            numbers[i]=html.eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'td.span1.color5',
        transform: async (html) => {
          let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
          return jackpot;
        }
      },
      date: {
        path: 'span.text-error',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "dddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4la',
    regions: ['LA'],
    url:"http://www.lotteryusa.com/louisiana/pick-4/",
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


export const pick4laNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4la',
    regions: ['LA'],
    url:"http://louisianalottery.com/pick-4/tab/winning-numbers",
    data: {
      jackpot: {
        path: 'td.span1.color5',
        transform: async (html) => {
          let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
          return jackpot;
        }
      },
      date: {
        path: 'table.next-draw tr:nth-child(2) td.text-right',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "MMM D, YYYY").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4la',
    regions: ['LA'],
    url:"http://www.lotteryusa.com/louisiana/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 4") span.next-jackpot-amount',
        transform: async (html) => {
            let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
            return jackpot;
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