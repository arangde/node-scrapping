import moment from 'moment';
import { getData } from '../helpers/getData';
export const dailymillionieRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'dailymillionie',
    regions: ['IE'],
    url:"https://www.lottery.ie/prizes-and-results.aspx?game=daily-million",
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
          const date = await moment(text, "DD MMMM YYYY, h:mA").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'dailymillionie',
    regions: ['IE'],
    url:"https://www.lotterypost.com/game/419",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://irishlottoresults.ie/dailymillion',
            path: '#dm2_jason_val',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().replace(/\D/g, ""));
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
  }
];


export const dailymillionieNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'dailymillionie',
    regions: ['IE'],
    url:"https://www.lottery.ie/prizes-and-results.aspx?game=daily-million",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,''));
        }
      },
      date: {
        path: 'h2.date-heading',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/419',
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
    lotteryName:'dailymillionie',
    regions: ['IE'],
    url:"https://www.lotterypost.com/game/419",
    data: {
      jackpot: {
        path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://irishlottoresults.ie/dailymillion',
            path: '#dm2_jason_val',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().replace(/\D/g, ""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.resultsNextDrawInfo p',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];