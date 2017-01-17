import moment from 'moment';
import { getData } from '../helpers/getData';
export const play4daydeRecent = [// Scraper for the recently passed draw (Primary)
  {
    lotteryName:'play4dayde',
    regions: ['DE'],
    url:"http://www.delottery.com/games/play3play4/index.asp",
    data: {
      numbers: {
        path: '.gelcelbkgrdright h3',
        transform: async (html) => {
          const numbers = /(?:Day \s+)([0-9]+)/g.exec(html.first().text().trim())[1].split("");
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/delaware/',
            path: 'tr:contains("Play 4 Midday") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: '.gelcelbkgrdright h3',
        transform: async (html) => {
          const text = /([0-9\/]{7,8})(?::\s+Day \s+)/g.exec(html.first().text().trim())[1];
          const date = await moment(text, "MM/DD/YY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'play4dayde',
    regions: ['DE'],
    url:"http://www.lotteryusa.com/delaware/play-4-midday/",
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


export const play4daydeNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'play4dayde',
    regions: ['DE'],
    url:"http://www.delottery.com/games/play3play4/index.asp",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/delaware/',
            path: 'tr:contains("Play 4 Midday") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: '.gelcelbkgrdright h3',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/22',
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
    lotteryName:'play4dayde',
    regions: ['DE'],
    url:"http://www.lotteryusa.com/delaware/",
    data: {
      jackpot: {
        path: 'tr:contains("Play 4 Midday") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Play 4 Midday") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];