import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3wiRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3wi',
    regions: ['WI'],
    url:"https://www.wilottery.com/lottogames/pick3.aspx",
    data: {
      numbers: {
        path: 'span.bold',
        transform: async (html) => {
          const numbers = html.first().text().trim().replace(/\s/g,"").split("-");
          return numbers;
        }
      },
      jackpot: {
        path: 'tr.dark:nth-child(2) td:nth-child(2)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/wisconsin/',
            path: 'tr:contains("Daily Pick 3") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = html.first().clone().children().remove().end().text().trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'span#ctl00_ContentPlaceHolder1_DataList1_ctl00_RecDateLabel',
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
    lotteryName:'pick3wi',
    regions: ['WI'],
    url:"http://www.lotteryusa.com/wisconsin/daily-pick-3/",
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


export const pick3wiNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3wi',
    regions: ['WI'],
    url:"https://www.wilottery.com/lottogames/pick3.aspx",
    data: {
      jackpot: {
        path: 'tr.dark:nth-child(2) td:nth-child(2)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/wisconsin/',
            path: 'tr:contains("Daily Pick 3") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = html.first().text().trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr.dark td:nth-child(1) strong',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/wisconsin/',
            path: 'tr:contains("Daily Pick 3") span.next-draw-date',
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
    lotteryName:'pick3wi',
    regions: ['WI'],
    url:"http://www.lotteryusa.com/wisconsin/daily-pick-3/",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/wisconsin/',
            path: 'tr:contains("Daily Pick 3") span.next-jackpot-amount',
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
            url: 'http://www.lotteryusa.com/wisconsin/',
            path: 'tr:contains("Daily Pick 3") span.next-draw-date',
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