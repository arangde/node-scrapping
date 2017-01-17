import moment from 'moment';
import { getData } from '../helpers/getData';
export const healthlotteryukRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'healthlotteryuk',
    regions: ['UK'],
    url:"https://www.lottery.co.uk/health-lottery",
    data: {
      numbers: {
        path: 'div.result',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!="";i++){
            numbers[i] = html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'span.resultJackpot',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'span.smallerHeading',
        transform: async (html) => {
          const text = html.last().text().trim();
          const date = await moment(text, "Do MMMM YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'healthlotteryuk',
    regions: ['UK'],
    url:"https://www.national-lottery.com/health-lottery/results",
    data: {
      numbers: {
        path: 'div.result.fluid',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!="";i++){
            numbers[i] = html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpotAmt',
        transform: async (html) => {
          let jackpot = parseInt(html.first().text().replace(/\D/g,""));
          return jackpot;
        }
      },
      date: {
        path: '.resultsHeader',
        transform: async (html) => {
          const text =/(.+ [0-9]{4,4})/g.exec(html.first().text().trim())[1];
          const date = await moment(text, "dddd Do MMMM YYYY").format();
          return date;
        }
      }
    }
  }
];


export const healthlotteryukNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'healthlotteryuk',
    regions: ['UK'],
    url:"https://www.lottery.co.uk/health-lottery",
    data: {
      jackpot: {
        path: 'span.resultJackpot',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'span.smallerHeading',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.national-lottery.com/health-lottery/results',
            path: '.jackpotArea strong',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text, "dddd Do MMMM YYYY").format();
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
    lotteryName:'healthlotteryuk',
    regions: ['UK'],
    url:"https://www.national-lottery.com/health-lottery/results",
    data: {
      jackpot: {
        path: 'span.jackpotTxt',
        transform: async (html) => {
          let jackpot = parseInt(html.first().text().replace(/\D/g,""));
          return jackpot;
        }
      },
      date: {
        path: '.jackpotArea strong',
        transform: async (html) => {
          let text = html.first().text().trim();
          const date = await moment(text, "dddd Do MMMM YYYY").format();
          return date;
        }
      }
    }
  }
];