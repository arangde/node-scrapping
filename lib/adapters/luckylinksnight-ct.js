import moment from 'moment';
import {getData} from '../helpers/getData';
export const luckylinksnightctRecent = [// Scraper for the recently passed draw (Primary)
  {
    lotteryName:'luckylinksnightct',
    regions: ['CT'],
    url:"https://www.ctlottery.org/Modules/Games/default.aspx?id=15&winners=1",
    data: {
      numbers: {
        path: 'table.cnresults tr:nth-child(2) td:nth-child(2)',
        transform: async (html) => {
          const numbers = html.first().text().trim().split(" - ");
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/connecticut/',
            path: 'tr:contains("Night Lucky Links") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'table.cnresults tr:nth-child(2) td:nth-child(1)',
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
    lotteryName:'luckylinksnightct',
    regions: ['CT'],
    url:"http://www.lotteryusa.com/connecticut/night-lucky-links/",
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


export const luckylinksnightctNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'luckylinksnightct',
    regions: ['CT'],
    url:"https://www.ctlottery.org/Modules/Games/default.aspx?id=15&winners=1",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/connecticut/',
            path: 'tr:contains("Night Lucky Links") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'table.cnresults tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/connecticut/',
            path: 'tr:contains("Night Lucky Links") span.next-draw-date',
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
    lotteryName:'luckylinksnightct',
    regions: ['CT'],
    url:"http://www.lotteryusa.com/connecticut/",
    data: {
      jackpot: {
        path: 'tr:contains("Night Lucky Links") span.jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.first().text().replace(/\D/g,""));
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Night Lucky Links") span.next-draw-date',
        transform: async (html) => {
          let text = html.first().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];
