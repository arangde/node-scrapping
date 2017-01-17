import moment from 'moment';
import { getData } from '../helpers/getData';
export const tbytksRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'2by2',
    regions: ['KS', 'ND', 'NE'],
    url:"http://www.powerball.com/2by2/2by2_numbers.asp",
    data: {
      numbers: {
        path: 'tr:nth-child(2) td[background]',
        transform: async (html) => {
          const numbers = [];
          for(let i=0;html.eq(i).text()!="";i++){
            numbers[i] = html.eq(i).text();
          }
          return numbers;

        } 
      },
      jackpot: {
        path: 'font > strong',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'tr:nth-child(2) > td[width="69"]:nth-child(2) > font',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "M/D/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'2by2',
    regions: ['KS', 'ND', 'NE'],
    url:"http://www.lotteryusa.com/kansas/2by2/",
    data: {
      numbers: {
        path: 'span.string-results',
        transform: async (html) => {
          const numbers = [];
          const textString = html.first().text();
          numbers[0] = /(?:Red: \()([0-9]+)(?:, [0-9]+\))/g.exec(textString)[1];
          numbers[1] = /(?:\([0-9]+, )([0-9]+)(?:\), W)/g.exec(textString)[1];
          numbers[2] = /(?:White: \()([0-9]+)(?:, [0-9]+\))/g.exec(textString)[1];
          numbers[3] = /(?:White\: \([0-9]+, )([0-9]+)(?:\))/g.exec(textString)[1];
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ''));
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


export const tbytksNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'2by2',
    regions: ['KS', 'ND', 'NE'],
    url:"http://www.powerball.com/2by2/2by2_numbers.asp",
    data: {
      jackpot: {
        path: 'font > strong',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'table.ResultsTable',
        transform: async (html) => {         
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/2by2',
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
    lotteryName:'2by2',
    regions: ['KS', 'ND', 'NE'],
    url:"http://www.lotteryusa.com/kansas/",
    data: {
      jackpot: {
        path: 'tr:contains("2by2") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("2by2") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];