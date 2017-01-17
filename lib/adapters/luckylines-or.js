import moment from 'moment';
import { getData } from '../helpers/getData';
export const luckylinesorRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'luckylinesor',
    regions: ['OR'],
    url:"http://www.oregonlottery.org/games/draw-games/lucky-lines/past-results",
    data: {
      numbers: {
        path: 'table.responsive tr:nth-child(2)',
        transform: async (html) => {
          const numbers = [];
          for(let i=2; html.first().children().eq(i).text()!=""; i++){
            numbers[i-2]=html.first().children().eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'table.responsive tr:nth-child(2)',
        transform: async (html) => {
          return parseInt(html.first().children().eq(1).text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'table.responsive tr:nth-child(2)',
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
    lotteryName:'luckylinesor',
    regions: ['OR'],
    url:"http://www.lotteryusa.com/oregon/lucky-lines/",
    data: {
      numbers: {
        path: 'span.string-results',
        transform: async (html) => {
          const numbers = html.first().text().replace(", FREE","").split(", ");
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


export const luckylinesorNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'luckylinesor',
    regions: ['OR'],
    url:"http://www.oregonlottery.org/games/draw-games/lucky-lines/past-results#games",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.oregonlottery.org/games/draw-games/lucky-lines',
            path: 'h2 span',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/oregon/',
            path: 'tr:contains("Lucky Lines") span.next-draw-date',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text, "ddd, MMM DD, YYYY").format();
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
    lotteryName:'luckylinesor',
    regions: ['OR'],
    url:"http://www.lotteryusa.com/oregon/",
    data: {
      jackpot: {
        path: 'tr:contains("Lucky Lines") span.next-jackpot-amount',
        transform: async (html) => {
          return parseInt(html.first().clone().children().remove().end().text().replace(/\D/g , ''));
        }
      },
      date: {
        path: 'tr:contains("Lucky Lines") span.next-draw-date',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];
