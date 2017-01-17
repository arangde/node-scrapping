import moment from 'moment';
import { getData } from '../helpers/getData';
export const pokerlottoonRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pokerlottoon',
    regions: ['ON'],
    url:"https://www.lotterypost.com/game/383",
    data: {
      numbers: {
        path: 'div.resultsRow img',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i<5 != ''; i++){
            numbers[i]=/(?:card-)([0-z]+)(?:\.png)/g.exec(html.eq(i).attr('src'))[1];
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.canadawin.com/canadian-lotteries/poker-lotto/',
            path: 'table:nth-of-type(2) tr:contains("5 of 5 cards") td:nth-child(2)',
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
          const text = html.first().text();
          const date = await moment(text, "dddd, MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pokerlottoon',
    regions: ['ON'],
    url:"http://www.lotterycanada.com/ontario-poker-lotto",
    data: {
      numbers: {
        path: 'div.col-xs-12 > span',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i) != ""; i++){
            numbers[i] = html.eq(i).attr("title");
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div.panel-body > ul',
        transform: async (html) => {
          return parseInt(/([\$0-9,]{7,})/mig.exec(html.first().text()).slice(-1)[0].replace(/\D/g,""));
        }
      },
      date: {
        path: 'span.draw-date',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "- MMMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const pokerlottoonNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pokerlottoon',
    regions: ['ON'],
    url:"https://www.lotterypost.com/game/383",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.canadawin.com/canadian-lotteries/poker-lotto/',
            path: 'table:nth-of-type(2) tr:contains("5 of 5 cards") td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
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
    lotteryName:'pokerlottoon',
    regions: ['ON'],
    url:"http://www.lotterycanada.com/ontario-poker-lotto",
    data: {
      jackpot: {
        path: 'div.panel-body > ul',
        transform: async (html) => {
          return parseInt(/([\$0-9,]{7,})/mig.exec(html.first().text()).slice(-1)[0].replace(/\D/g,""));
        }
      },
      date: {
        path: 'span strong',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];