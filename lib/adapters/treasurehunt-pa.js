import moment from 'moment';
import { getData } from '../helpers/getData';
export const treasurehuntpaRecent = [// Scraper for the recently passed draw (Primary)
  {
    lotteryName:'treasurehuntpa',
    regions: ['PA'],
    url:"https://www.palottery.state.pa.us/Games/Treasure-Hunt.aspx#winningnumbers",
    data: {
      numbers: {
        path: 'div#jackpotDraw ul li',
        transform: async (html) => {
          const numbers = [];
          for(let i=0;html.eq(i).text()!="";i++){
            numbers[i]=html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/pennsylvania/',
            path: 'tr:contains("Treasure Hunt") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = html.first().text().trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div#jackpotDraw span.dailydrawtime',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "MMM. DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'treasurehuntpa',
    regions: ['PA'],
    url:"http://www.lotteryusa.com/pennsylvania/treasure-hunt/",
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


export const treasurehuntpaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'treasurehuntpa',
    regions: ['PA'],
    url:"https://www.palottery.state.pa.us/Games/Treasure-Hunt.aspx#winningnumbers",
    data: {
      jackpot: {
        path: 'div.col p strong',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'div#jackpotDraw span.dailydrawtime',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "MMM. DD, YYYY").add({days:1}).format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'treasurehuntpa',
    regions: ['PA'],
    url:"http://www.lotteryusa.com/pennsylvania/treasure-hunt/",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/pennsylvania/',
            path: 'tr:contains("Treasure Hunt") span.next-jackpot-amount',
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
            url: 'http://www.lotteryusa.com/pennsylvania/',
            path: 'tr:contains("Treasure Hunt") span.next-draw-date',
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
