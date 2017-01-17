import moment from 'moment';
import { getData } from '../helpers/getData';

export const pokerpickokRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pokerpickok',
    regions: ['OK'],
    url:"https://www.lotterypost.com/game/490",
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
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lottery.ok.gov/pokerpick.asp',
            path: 'tr:contains("5 of 5") td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
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
    lotteryName:'pokerpickok',
    regions: ['OK'],
    url:"http://www.lotteryusa.com/oklahoma/poker-pick/",
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
          let jackpot = await getData({
            url: 'https://www.lottosignals.com/lottery/oklahoma-poker-pick',
            path: 'tr:contains("5 of 5") td:contains("$")',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
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
          const date = await moment(text, "ddd, MMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const pokerpickokNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pokerpickok',
    regions: ['OK'],
    url:"https://www.lotterypost.com/game/490",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lottery.ok.gov/pokerpick.asp',
            path: 'tr:contains("5 of 5") td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.resultsNextDrawInfo p:nth-child(2)',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM D, YYYY, h:mm a").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pokerpickok',
    regions: ['OK'],
    url:"http://www.lotteryusa.com/oklahoma/",
    data: {
      jackpot: {
        path: 'tr:contains("Poker Pick") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lottosignals.com/lottery/oklahoma-poker-pick',
            path: 'tr:contains("5 of 5") td:contains("$")',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Poker Pick") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];