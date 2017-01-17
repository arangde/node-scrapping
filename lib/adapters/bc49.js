import moment from 'moment';
import { getData } from '../helpers/getData';
export const bc49Recent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'bc49',
    regions: ['BC'],
    url:"https://www.lotterypost.com/game/236",
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
            url: 'http://www.lottolore.com/bc49.html',
            path: 'tr:contains("1st") > td:nth-child(3) > b',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\..+/g,"").replace(/\D/g,""));
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
    lotteryName:'bc49',
    regions: ['BC'],
    url:"http://www.lotterycanada.com/bc-49",
    data: {
      numbers: {
        path: 'table.table-bordered tr:nth-child(1) > td> strong',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i< html.length - 1; i++){
            numbers[i] = html.eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div.col-sm-8:nth-child(1) h4:nth-child(1)',
        transform: async (html) => {
          return parseInt(/(?:Estimated Jackpot for )(?:[A-z]+ [0-9]+, [0-9]+)(?: - )([$0-9,]+)/g.exec(html.first().text())[1].replace(/\D/g, ''));
        }
      },
      date: {
        path: 'div.col-sm-10 h1',
        transform: async (html) => {
          const text = /([A-z]+ [0-9]+, [0-9]+)(?: - [A-z]+)/g.exec(html.first().text())[1];
          const date = await moment(text, "MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const bc49Next = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'bc49',
    regions: ['BC'],
    url:"https://www.lotterypost.com/game/236",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lottolore.com/bc49.html',
            path: 'tr:contains("1st") > td:nth-child(3) > b',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\..+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.resultsNextDrawInfo p:nth-child(2)',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM D, YYYY, h:mm a").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'bc49',
    regions: ['BC'],
    url:"http://www.lotterycanada.com/bc-49",
    data: {
      jackpot: {
        path: 'div.col-sm-8:nth-child(1) h4:nth-child(1)',
        transform: async (html) => {
          return parseInt(/(?:Estimated Jackpot for )(?:[A-z]+ [0-9]+, [0-9]+)(?: - )([$0-9,]+)/g.exec(html.first().text())[1].replace(/\D/g, ''));
        }
      },
      date: {
        path: 'div.col-sm-8:nth-child(1) h4:nth-child(1)',
        transform: async (html) => {
          const text = /(?:Estimated Jackpot for )([A-z]+ [0-9]+, [0-9]+)(?: -)/g.exec(html.first().text())[1];
          const date = await moment(text, "MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];