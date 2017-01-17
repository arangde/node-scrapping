import moment from 'moment';
import { getData } from '../helpers/getData';
export const euromillionseuRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'euromillionseu',
    regions: ['EU'],
    url:"https://www.lottery.ie/prizes-and-results/?game=euromillions",
    data: {
      numbers: {
        path: 'div.result-block:nth-child(3) li',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != "" ; i++){
            numbers[i] = html.eq(i).text().replace(/\D/g,"");
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,''));
        }
      },
      date: {
        path: 'h2.date-heading',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "DD MMMM YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'euromillionseu',
    regions: ['EU'],
    url:"https://irish.national-lottery.com/euromillions/results",
    data: {
      numbers: {
        path: 'div.resultsOuter:nth-child(5) div.resultsInner div.balls div.result',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div.resultsOuter:nth-child(5) span.jackpotAmt',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'div.resultsOuter:nth-child(5) div.resultsHeader',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "dddd Do MMMM YYYY").format();
          return date;
        }
      }
    }
  }
];


export const euromillionseuNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'euromillionseu',
    regions: ['EU'],
    url:"https://www.lottery.ie/prizes-and-results/?game=euromillions",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lotterypost.com/euromillions',
            path: 'p.resultsJackpot span',
            transform: async (html) => {
              let jackpot = parseInt(parseFloat(html.first().clone().children().remove().end().text().trim().replace(/[^0-9.]/g,""))*1000000);
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'h2.date-heading',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/euromillions',
            path: 'div.resultsNextDrawInfo p',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text, "ddd, MMM DD, YYYY, h:mA").format();
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
    lotteryName:'euromillionseu',
    regions: ['EU'],
    url:"https://irish.national-lottery.com/euromillions/results",
    data: {
      jackpot: {
        path: 'span.jackpotTxt',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));  
        }
      },
      date: {
        path: 'div.jackpotArea strong',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "dddd Do MMMM YYYY").format();
          return date;
        }
      }
    }
  }
];