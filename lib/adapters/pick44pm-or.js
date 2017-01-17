import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick44pmorRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick44pmor',
    regions: ['OR'],
    url:"http://www.oregonlottery.org/games/draw-games/pick-4/past-results",
    data: {
      numbers: {
        path: 'tr:contains("04:00PM")',
        transform: async (html) => {
          const numbers = [];
          for(let i=2; html.first().children().eq(i).text()!=""; i++){
            numbers[i-2]=html.first().children().eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/oregon/',
            path: 'tr:contains("Pick 4 4pm") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("04:00PM")',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "MM/DD/YYYY hh:mmA").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick44pmor',
    regions: ['OR'],
    url:"http://www.lotteryusa.com/oregon/pick-4-4pm/",
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


export const pick44pmorNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick44pmor',
    regions: ['OR'],
    url:"http://www.oregonlottery.org/games/draw-games/pick-4/past-results",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/oregon/',
            path: 'tr:contains("Pick 4 4pm") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("04:00PM")',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/162',
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
    lotteryName:'pick44pmor',
    regions: ['OR'],
    url:"http://www.lotteryusa.com/oregon/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 4 4pm") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Pick 4 4pm") span.next-draw-date',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];