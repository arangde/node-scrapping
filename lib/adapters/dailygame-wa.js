import moment from 'moment';
import { getData } from '../helpers/getData';
export const dailygamewaRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'dailygamewa',
    regions: ['WA'],
    url:"http://www.walottery.com/WinningNumbers/PastDrawings.aspx?gamename=dailygame&unittype=day&unitcount=180",
    data: {
      numbers: {
        path: 'div.table-body:nth-child(3) div.game-balls ul',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.first().children().eq(i).text() != "" ; i++){
            numbers[i] = html.first().children().eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.walottery.com/JackpotGames/DailyGame.aspx',
            path: 'tr:contains("1 in 1.00 Thousand") td:nth-child(5)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/.+ or \$/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.table-body:nth-child(3) h2',
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
    lotteryName:'dailygamewa',
    regions: ['WA'],
    url:"http://www.lotteryusa.com/washington/daily/",
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


export const dailygamewaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'dailygamewa',
    regions: ['WA'],
    url:"http://www.walottery.com/WinningNumbers/PastDrawings.aspx?gamename=dailygame&unittype=day&unitcount=180",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.walottery.com/JackpotGames/DailyGame.aspx',
            path: 'tr:contains("1 in 1.00 Thousand") td:nth-child(5)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/.+ or \$/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.table-body:nth-child(3) h2',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/199',
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
    lotteryName:'dailygamewa',
    regions: ['WA'],
    url:"http://www.lotteryusa.com/washington/",
    data: {
      jackpot: {
        path: 'tr:contains("Daily") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Daily") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];