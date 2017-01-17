import moment from 'moment';
import { getData } from '../helpers/getData';
export const dc5middaydcRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'dc5middaydc',
    regions: ['DC'],
    url:"http://dclottery.com/games/dc5/default.aspx",
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
        path: 'h3',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/district-of-columbia/',
            path: 'tr:contains("Midday DC5") span.jackpot-amount',
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
    lotteryName:'dc5middaydc',
    regions: ['DC'],
    url:"http://www.lotteryusa.com/district-of-columbia/midday-dc5/",
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


export const dc5middaydcNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'dc5middaydc',
    regions: ['DC'],
    url:"http://dclottery.com/games/dc5/default.aspx",
    data: {
      jackpot: {
        path: 'tr',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/district-of-columbia/',
            path: 'tr:contains("Midday DC5") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'li.summary:contains("Evening")',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/358',
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
    lotteryName:'dc5middaydc',
    regions: ['DC'],
    url:"http://www.lotteryusa.com/district-of-columbia/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday DC5") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Midday DC5") span.next-draw-date',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];