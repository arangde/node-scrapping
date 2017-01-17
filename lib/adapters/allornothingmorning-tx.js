import moment from 'moment';
import { getData } from '../helpers/getData';
export const allornothingmorningtxRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'allornothingmorningtx',
    regions: ['TX'],
    url:"http://www.txlottery.org/export/sites/lottery/Games/All_or_Nothing/",
    data: {
      numbers: {
        path: 'div.large-6:nth-child(1) ol',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i<6 ; i++){
            numbers[i] = html.eq(0).children().eq(i).text().replace(/\D/g,"");
            numbers[i+6] = html.eq(1).children().eq(i).text().replace(/\D/g,"");
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
          const text = html.eq(0).text().replace('Morning Winning Numbers for ', '');
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'allornothingmorningtx',
    regions: ['TX'],
    url:"http://www.lotteryusa.com/texas/morning-all-or-nothing/",
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


export const allornothingmorningtxNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'allornothingmorningtx',
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
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/413',
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
    lotteryName:'allornothingmorningtx',
    regions: ['TX'],
    url:"http://www.lotteryusa.com/texas/",
    data: {
      jackpot: {
        path: 'tr:contains("Morning All or Nothing") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Morning All or Nothing") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];