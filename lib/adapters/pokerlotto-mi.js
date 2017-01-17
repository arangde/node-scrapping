import moment from 'moment';
import { getData } from '../helpers/getData';
export const pokerlottomiRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pokerlottomi',
    regions: ['MI'],
    url:"https://www.lotterypost.com/game/453",
    data: {
      numbers: {
        path: 'div.resultsRow img',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i<5 != ''; i++){
            numbers[i]=/(?:card-)([0-z]+)(?:\.png)/g.exec(html.eq(i).attr('src'))[1];
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lottosignals.com/lottery/michigan-poker-lotto',
            path: '.content-frame.noredspan p',
            transform: async (html) => {
              let jackpot = parseInt(/([$0-9,]{6,})/g.exec(html.first().text().trim())[1].replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
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
    lotteryName:'pokerlottomi',
    regions: ['MI'],
    url:"http://www.lotteryusa.com/michigan/poker-lotto/",
    data: {
      numbers: {
        path: 'span.string-results',
        transform: async (html) => {
          const numbers = html.first().text().trim().toUpperCase().split(", ");
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


export const pokerlottomiNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pokerlottomi',
    regions: ['MI'],
    url:"https://www.lotterypost.com/game/453",
    data: {
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lottosignals.com/lottery/michigan-poker-lotto',
            path: '.content-frame.noredspan p',
            transform: async (html) => {
              let jackpot = parseInt(/([$0-9,]{6,})/g.exec(html.first().text().trim())[1].replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;  
        }
      },
      date: {
        path: 'div.resultsNextDrawInfo p',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM D, YYYY").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pokerlottomi',
    regions: ['MI'],
    url:"http://www.lotteryusa.com/michigan/",
    data: {
      jackpot: {
        path: 'tr:contains("Poker Lotto") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Poker Lotto") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];