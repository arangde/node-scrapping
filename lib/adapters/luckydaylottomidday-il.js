import moment from 'moment';
import { getJackpot, getNextJackpot } from '../helpers/lotteryPost';
import {getData} from '../helpers/getData';
export const luckydaylottomiddayilRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'luckydaylottomiddayil',
    regions: ['IL'],
    url:"https://www.lotterypost.com/game/430",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!="";i++){
            numbers[i] = html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
        transform: async (html) => {
          return getJackpot(html);
        }
      },
      date: {
        path: 'div.resultsDrawDate',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "dddd, MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'luckydaylottomiddayil',
    regions: ['IL'],
    url:"http://www.lotteryusa.com/illinois/midday-lucky-day-lotto/",
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
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/illinois/',
            path: 'tr:contains("Midday Lucky Day Lotto") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().replace(/\D/g,""));
              return jackpot;
            }
          });
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


export const luckydaylottomiddayilNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'luckydaylottomiddayil',
    regions: ['IL'],
    url:"https://www.lotterypost.com/game/430",
    data: {
      jackpot: {
       path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
        transform: async (html) => {
          return getNextJackpot(html);
        }
      },
      date: {
        path: 'div.resultsNextDrawInfo p',
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
    lotteryName:'luckydaylottomiddayil',
    regions: ['IL'],
    url:"http://www.lotteryusa.com/illinois/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday Lucky Day Lotto") span.next-jackpot-amount',
        transform: async (html) => {
            let jackpot = html.first().clone().children().remove().end().text().trim().replace(/\D/g,"");
            return parseInt(jackpot);
        }
      },
      date: {
        path: 'tr:contains("Midday Lucky Day Lotto") span.next-draw-date',
        transform: async (html) => {
          let text = html.first().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];
