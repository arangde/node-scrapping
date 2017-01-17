import moment from 'moment';
import { getData } from '../helpers/getData';
export const play4eveningflRecent = [// Scraper for the recently passed draw (Primary)
  {
    lotteryName:'play4eveningfl',
    regions: ['FL'],
    url:"http://www.flalottery.com/pick4",
    data: {
      numbers: {
        path: 'div.gamePageNumbers:contains("Evening") span.balls',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!= ""; i++){
            numbers[i] = html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.flalottery.com/pick4-howToPlay',
            path: 'table.play4Odds:nth-of-type(2) tr:contains("1:10,000") td:nth-child(5)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.gamePageNumbers:contains("Evening") > p:nth-of-type(2)',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "dddd, MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'play4eveningfl',
    regions: ['FL'],
    url:"http://www.lotteryusa.com/florida/pick-4/",
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


export const play4eveningflNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'play4eveningfl',
    regions: ['FL'],
    url:"http://www.flalottery.com/pick4",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.flalottery.com/pick4-howToPlay',
            path: 'table.play4Odds:nth-of-type(2) tr:contains("1:10,000") td:nth-child(5)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.gamePageNumbers:contains("Evening") > p:nth-of-type(2)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/37',
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
    lotteryName:'play4eveningfl',
    regions: ['FL'],
    url:"http://www.lotteryusa.com/florida/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 4") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Pick 4") span.next-draw-date',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];