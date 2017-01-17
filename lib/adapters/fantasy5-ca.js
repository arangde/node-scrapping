import moment from 'moment';
import { getJackpot, getNextJackpot } from '../helpers/lotteryPost';
import { getData } from '../helpers/getData';
export const fantasy5caRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'fantasy5ca',
    regions: ['CA'],
    url:"http://www.calottery.com/play/draw-games/fantasy-5",
    data: {
      numbers: {
        path: 'ul.winning_number_sm li',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'tbody tr:nth-child(1) td:nth-child(3)',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ""));
        }
      },
      date: {
        path: 'h3.date',
        transform: async (html) => {
          const text = html.first().text().trim().replace(/ | W.+/g,"");
          const date = await moment(text, "dddd, MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'fantasy5ca',
    regions: ['CA'],
    url:"https://www.lotterypost.com/game/7",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().replace(/\D/g,'');
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
  }
];


export const fantasy5caNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'fantasy5ca',
    regions: ['CA'],
    url:"http://www.calottery.com/play/draw-games/fantasy-5",
    data: {
      jackpot: {
        path: 'div#heroImage1 h2',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ''));
        }
      },
      date: {
        path: 'h3.date',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/california/',
            path: 'tr:contains("Fantasy 5") span.next-draw-date',
            transform: async (html) => {
              const text = html.last().text();
              const date = await moment(text, "ddd, MMM DD, YYYY").format();
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
    lotteryName:'fantasy5ca',
    regions: ['CA'],
    url:"https://www.lotterypost.com/game/7",
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
  }
];