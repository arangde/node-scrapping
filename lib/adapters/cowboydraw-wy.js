import moment from 'moment';
import { getJackpot, getNextJackpot } from '../helpers/lotteryPost';
export const cowboydrawwyRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cowboydrawwy',
    regions: ['WY'],
    url:"https://www.lotterypost.com/game/484",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().trim().replace(/\D/g,'');
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
    lotteryName:'cowboydrawwy',
    regions: ['WY'],
    url:"http://www.lotteryusa.com/wyoming/cowboy-draw/",
    data: {
      numbers: {
        path: 'ul.draw-result',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.first().children().eq(i).text()!="";i++){
            numbers[i] = html.first().children().eq(i).text();
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


export const cowboydrawwyNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cowboydrawwy',
    regions: ['WY'],
    url:"https://www.lotterypost.com/game/484",
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
    lotteryName:'cowboydrawwy',
    regions: ['WY'],
    url:"http://www.lotteryusa.com/wyoming/",
    data: {
      jackpot: {
        path: 'tr:contains("Cowboy Draw") span.next-jackpot-amount',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/[A-z]{3,3}.+/g,"").replace(/\D/g , ''));
        }
      },
      date: {
        path: 'tr:contains("Cowboy Draw") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];