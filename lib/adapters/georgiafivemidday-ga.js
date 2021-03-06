import moment from 'moment';
import { getData } from '../helpers/getData';
export const georgiafivemiddaygaRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'georgiafivemiddayga',
    regions: ['GA'],
    url:"https://www.lotterypost.com/game/381",
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
        path: 'div.resultsNextDrawInfo p span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.galottery.com/en-us/games/draw-games/georgia-five.html',
            path: 'table.table-odds-and-prizes tr:contains("All 5 Numbers") td:nth-child(2)',
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
    lotteryName:'georgiafivemiddayga',
    regions: ['GA'],
    url:"http://www.lotteryusa.com/georgia/midday-georgia-five/",
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


export const georgiafivemiddaygaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'georgiafivemiddayga',
    regions: ['GA'],
    url:"https://www.lotterypost.com/game/381",
    data: {
      jackpot: {
        path: 'div.resultsNextDrawInfo p span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.galottery.com/en-us/games/draw-games/georgia-five.html',
            path: 'table.table-odds-and-prizes tr:contains("All 5 Numbers") td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
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
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
      }
    }
  }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'georgiafivemiddayga',
    regions: ['GA'],
    url:"http://www.lotteryusa.com/georgia/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday Georgia FIVE") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Midday Georgia FIVE") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];