import moment from 'moment';
import { getData } from '../helpers/getData';
export const gimme5meRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'gimme5me',
    regions: ['ME'],
    url:"http://www.mainelottery.com/games/gimme5.html",
    data: {
      numbers: {
        path: 'div.ball span',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().trim().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'span.cash',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'div.windrawnums h2',
        transform: async (html) => {
          const text = html.first().text().replace(/[A-z ]+/g,"");
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'gimme5me',
    regions: ['ME'],
    url:"http://www.lotteryusa.com/maine/gimme-5/",
    data: {
      numbers: {
        path: 'ul.draw-result',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.first().children().eq(i).text() != ""; i++){
            numbers[i]=html.first().children().eq(i).text().trim().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/maine/',
            path: 'tr:contains("Gimme 5") span.jackpot-amount',
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
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const gimme5meNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'gimme5me',
    regions: ['ME'],
    url:"http://www.mainelottery.com/games/gimme5.html",
    data: {
      jackpot: {
        path: 'span.cash',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'div.windrawnums h2',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/429',
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
    lotteryName:'gimme5me',
    regions: ['ME'],
    url:"http://www.lotteryusa.com/maine/",
    data: {
      jackpot: {
        path: 'tr:contains("Gimme 5") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Gimme 5") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];