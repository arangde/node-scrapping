import moment from 'moment';
import { getData } from '../helpers/getData';
export const allornothingeveningtxRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'allornothingeveningtx',
    regions: ['TX'],
    url:"http://www.txlottery.org/export/sites/lottery/Games/All_or_Nothing/",
    data: {
      numbers: {
        path: 'div.large-6:nth-child(1) ol',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i<6 ; i++){
            numbers[i] = html.eq(2).children().eq(i).text().replace(/\D/g,"");
            numbers[i+6] = html.eq(3).children().eq(i).text().replace(/\D/g,"");
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'h3',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lottoreport.com/AllorNothing.htm',
            path: 'tr:contains("0 Numbers") > td:nth-child(3) > b',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.large-6:nth-child(1) a',
        transform: async (html) => {
          const text = html.eq(1).text().replace('Evening Winning Numbers for ', '');
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'allornothingeveningtx',
    regions: ['TX'],
    url:"https://www.lotterypost.com/game/415",
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
            url: 'http://www.lotteryusa.com/texas/',
            path: 'tr:contains("Evening All or Nothing") span.jackpot-amount',
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
  }
];


export const allornothingeveningtxNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'allornothingeveningtx',
    regions: ['TX'],
    url:"http://www.txlottery.org/export/sites/lottery/Games/All_or_Nothing/",
    data: {
      jackpot: {
        path: 'tr',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lottoreport.com/AllorNothing.htm',
            path: 'tr:contains("0 Numbers") > td:nth-child(3) > b',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.large-6:nth-child(1) a',
        transform: async (html) => {
          let date = await getData({
            url: 'http://www.lotteryusa.com/texas/',
            path: 'tr:contains("Evening All or Nothing") span.next-draw-date',
            transform: async (html) => {
              const text = html.last().text();
              const date = await moment(text, "ddd, MMM DD, YYYY").format();
              return date;
            }
          });
          return date;
        }
    }
  }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'allornothingeveningtx',
    regions: ['TX'],
    url:"https://www.lotterypost.com/game/415",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/texas/',
            path: 'tr:contains("Evening All or Nothing") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
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
  }
];