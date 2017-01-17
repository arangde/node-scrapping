import moment from 'moment';
import { getData } from '../helpers/getData';
export const fivecardcashmdRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'5cardcashmd',
    regions: ['MD'],
    url:"http://www.mdlottery.com/games/5-card-cash/winning-numbers/",
    data: {
      numbers: {
        path: 'tr:nth-child(1) td:nth-child(2) img',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i<5; i++){
            numbers.push((/(?:deck\/)([A-z])(?:[A-Za-z]+_)([0-z])(?:\.png)/g.exec(html.eq(i).attr("src"))[2]+
              /(?:deck\/)([A-z])(?:[A-Za-z]+_)([0-z])(?:\.png)/g.exec(html.eq(i).attr("src"))[1]).toUpperCase());
          };
          return numbers;

        }
      },
      jackpot: {
        path: 'div.content_bg div span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/maryland/',
            path: 'tr:contains("5 Card Cash") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'table.numbers_tabl tr:nth-child(1) td:nth-child(1)',
        transform: async (html) => {
          const text = html.text().replace(/(\s)/g,'');
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'5cardcashmd',
    regions: ['MD'],
    url:"http://www.lotteryusa.com/maryland/5-card-cash/",
    data: {
      numbers: {
        path: 'span.string-results',
        transform: async (html) => {
          const numbers = html.first().text().split(', ');
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


export const fivecardcashmdNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'5cardcashmd',
    regions: ['MD'],
    url:"http://www.mdlottery.com/games/5-card-cash/winning-numbers/",
    data: {
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/maryland/',
            path: 'tr:contains("5 Card Cash") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'table.numbers_tabl tr:nth-child(1) td:nth-child(1)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/425',
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
    lotteryName:'5cardcashmd',
    regions: ['MD'],
    url:"http://www.lotteryusa.com/maryland/",
    data: {
      jackpot: {
        path: 'tr:contains("5 Card Cash") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("5 Card Cash") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];