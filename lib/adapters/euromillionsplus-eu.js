import moment from 'moment';
import { getData } from '../helpers/getData';
export const euromillionspluseuRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'euromillionspluseu',
    regions: ['EU'],
    url:"https://www.lottery.ie/prizes-and-results/?game=euromillions",
    data: {
      numbers: {
        path: '.euromillionsplus-results .rb-col-2 .euromillionsplus-winning-numbers',
        transform: async (html) => {
          const numbers = html.text().trim().split('\n');
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          return parseInt(html.eq(1).text().replace(/\D/g,''));
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
    lotteryName:'euromillionspluseu',
    regions: ['EU'],
    url:"http://irishlottoresults.ie/euromillions",
    data: {
      numbers: {
        path: 'div.lotto-content div.lc-numbers ul',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(1).children().eq(i).text() != ''; i++){
            numbers[i]=html.eq(1).children().eq(i).text().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div.lotto-content div.lc-inner-haeder span.lc-value',
        transform: async (html) => {
          return parseInt(html.last().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'div.lotto-content div.lc-date-h3-div span.lc-date-h3',
        transform: async (html) => {
          const text = html.last().text().trim();
          const date = await moment(text, "dddd Do MMM YYYY").format();
          return date;
        }
      }
    }
  }
];


export const euromillionspluseuNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'euromillionspluseu',
    regions: ['EU'],
    url:"https://www.lottery.ie/prizes-and-results/?game=euromillions",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          return parseInt(html.last().text().replace(/\D/g,''));
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
    lotteryName:'euromillionspluseu',
    regions: ['EU'],
    url:"http://irishlottoresults.ie/euromillions",
    data: {
      jackpot: {
        path: 'div.lotto-content div.lc-inner-haeder span.lc-value',
        transform: async (html) => {
          return parseInt(html.last().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'div.lotto-content div.lc-date-h3-div span.lc-date-h3',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://irish.national-lottery.com/euromillions/results',
            path: 'div.jackpotArea strong',
            transform: async (html) => {
              const text = html.first().text();
              const date = await moment(text, "dddd Do MMMM YYYY").format();
              return date;
            }
          });
          return nextDate;
        }
      }
    }
  }
];