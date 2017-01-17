import moment from 'moment';
import { getJackpot, getNextJackpot } from '../helpers/lotteryPost';
import { getData } from '../helpers/getData';
export const thepickazRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'thepickaz',
    regions: ['AZ'],
    url:"https://www.arizonalottery.com/en/play/draw-games/the-pick",
    data: {
      numbers: {
        path: 'div.winning_numbers:nth-child(1) h2',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!= "" ; i++){
            numbers[i]=html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'tbody tr:nth-child(1) td.small-text:nth-child(4)',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ''));
        }
      },
      date: {
        path: 'span.regular',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "DDDD, MMMM DD").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'thepickaz',
    regions: ['AZ'],
    url:"http://www.lotteryusa.com/arizona/the-pick/",
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
          let nextJackpot = await getData({
            url: 'https://www.lotterypost.com/game/3',
            path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
            transform: async (html) => {
              const text = getJackpot(html);
              return text;
            }
          });
          return nextJackpot;
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


export const thepickazNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'thepickaz',
    regions: ['AZ'],
    url:"https://www.arizonalottery.com/en/play/draw-games/the-pick",
    data: {
      jackpot: {
        path: 'h2.price',
        transform: async (html) => {
          return parseInt(parseFloat(html.first().text().replace(" Million","").replace("$",""))*1000000);
        }
      },
      date: {
        path: 'div.next-jackpot span',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "DDDD, MMMM DD").format();
          return date;
        }
    }
  }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'thepickaz',
    regions: ['AZ'],
    url:"http://www.lotteryusa.com/arizona/the-pick/",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: 'https://www.lotterypost.com/game/3',
            path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
            transform: async (html) => {
              const text = getNextJackpot(html);
              return text;
            }
          });
          return nextJackpot;
        }
      },
      date: {
        path: 'time',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/arizona/',
            path: 'tr:contains("The Pick") span.next-draw-date',
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