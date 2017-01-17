import moment from 'moment';
import { getData } from '../helpers/getData';
export const dc3middaydcRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'dc3middaydc',
    regions: ['DC'],
    url:"http://dclottery.com/games/dc3/default.aspx",
    data: {
      numbers: {
        path: 'li.summary:contains("Mid-Day")',
        transform: async (html) => {
          const numbers = [];
          for(let i=0;html.first().children("ul").first().children().eq(i).text()!="";i++){
            numbers.push(html.first().children("ul").first().children().eq(i).text());
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'tr:contains("DC Lucky Midday") span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/district-of-columbia/',
            path: 'tr:contains("DC Lucky Midday") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'li.summary:contains("Mid-Day")',
        transform: async (html) => {
          const text = html.first().text().replace(/ - (Evening|Mid-Day).+/g,"");
          const date = await moment(text, "M/D/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'dc3middaydc',
    regions: ['DC'],
    url:"http://www.lotteryusa.com/district-of-columbia/dc-lucky-midday/",
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
          let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
          return jackpot;  
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


export const dc3middaydcNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'dc3middaydc',
    regions: ['DC'],
    url:"http://dclottery.com/games/dc3/default.aspx",
    data: {
      jackpot: {
        path: 'tr:nth-child(1) td:nth-child(5)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/district-of-columbia/',
            path: 'tr:contains("DC Lucky Midday") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'li.summary:contains("Mid-Day")',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/29',
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
    lotteryName:'dc3middaydc',
    regions: ['DC'],
    url:"http://www.lotteryusa.com/district-of-columbia/",
    data: {
      jackpot: {
        path: 'tr:contains("DC Lucky Midday") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("DC Lucky Midday") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];