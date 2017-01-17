import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick5neRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick5ne',
    regions: ['NE'],
    url:"https://www.nelottery.com/homeapp/lotto/31/gamedetail",
    data: {
      numbers: {
        path: 'td.tableCell:nth-child(2)',
        transform: async (html) => {
          const numbers = html.first().text().trim().split(", ");
          return numbers;
        }
      },
      jackpot: {
        path: 'table.numbertable:nth-of-type(2) tr:nth-child(2) td:nth-child(2)',
        transform: async (html) => {
          return parseInt(html.first().text().trim().replace(/\D/g,""));
        }
      },
      date: {
        path: 'td strong',
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
    lotteryName:'pick5ne',
    regions: ['NE'],
    url:"http://www.lotteryusa.com/nebraska/pick-5/",
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


export const pick5neNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick5ne',
    regions: ['NE'],
    url:"https://www.nelottery.com/homeapp/lotto/31/gamedetail",
    data: {
      jackpot: {
        path: 'p span',
        transform: async (html) => {
          return parseInt(html.first().text().trim().replace(/\D/g,""));
        }
      },
      date: {
        path: 'body',
        transform: async (html) => {
          const text = /(?:Jackpot for )([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{3,4})(?: is)/g.exec(html.first().text())[1];
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick5ne',
    regions: ['NE'],
    url:"http://www.lotteryusa.com/nebraska/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 5") span.next-jackpot-amount',
        transform: async (html) => {
            return parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
        }
      },
      date: {
        path: 'tr:contains("Pick 5") span.next-draw-date',
        transform: async (html) => {
          let text = html.last().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];