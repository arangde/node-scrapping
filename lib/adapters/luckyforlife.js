import moment from 'moment';
import { getData } from '../helpers/getData';
export const luckyforlifeRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'luckyforlife',
    regions: ['AR', 'CO', 'CT', 'DE', 'DC', 'ID', 'IA', 'KY', 'ME', 'MA', 'MI', 'MN', 'MO', 'MT', 'NH', 'NC', 'ND', 'OH', 'RI', 'SC', 'VT'],
    url: 'http://www.lotteryusa.com/arkansas/lucky-4-life/',
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
            return parseInt(html.first().text().trim().replace(/\D/g,""));
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
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'luckyforlife',
    regions: ['AR', 'CO', 'CT', 'DE', 'DC', 'ID', 'IA', 'KY', 'ME', 'MA', 'MI', 'MN', 'MO', 'MT', 'NH', 'NC', 'ND', 'OH', 'RI', 'SC', 'VT'],
    url:'http://myarkansaslottery.com/games/lucky-for-life',
    data: {
      numbers: {
        path: 'div.view-content > div:nth-child(1) div.winner-entry > div span',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!=""; i++)
              numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          const jackpot = await getData({
            url: 'http://www.lotteryusa.com/arkansas/',
            path: 'tr:contains("Lucky For Life") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'span.date-display-single',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const luckyforlifeNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'luckyforlife',
    regions: ['AR', 'CO', 'CT', 'DE', 'DC', 'ID', 'IA', 'KY', 'ME', 'MA', 'MI', 'MN', 'MO', 'MT', 'NH', 'NC', 'ND', 'OH', 'RI', 'SC', 'VT'],
    url: 'http://www.lotteryusa.com/arkansas/',
    data: {
      jackpot: {
        path: 'tr:contains("Lucky For Life") span.next-jackpot-amount',
        transform: async (html) => {
            let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
            return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Lucky For Life") span.next-draw-date',
        transform: async (html) => {
          let text = html.first().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'luckyforlife',
    regions: ['AR', 'CO', 'CT', 'DE', 'DC', 'ID', 'IA', 'KY', 'ME', 'MA', 'MI', 'MN', 'MO', 'MT', 'NH', 'NC', 'ND', 'OH', 'RI', 'SC', 'VT'],
    url:'https://www.lotterypost.com/game/371',
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
            let jackpot = await getData({
            url: 'http://www.lotteryusa.com/arkansas/',
            path: 'tr:contains("Lucky For Life") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'time',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/arkansas/',
            path: 'tr:contains("Lucky For Life") span.next-draw-date',
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
  }
];