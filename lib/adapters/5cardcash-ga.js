import moment from 'moment';
import { getData } from '../helpers/getData';
export const fivecardcashgaRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'5cardcashga',
    regions: ['GA'],
    url:"http://www.lotteryusa.com/georgia/5-card-cash/",
    data: {
      numbers: {
        path: 'span.string-results',
        transform: async (html) => {
          const numbers = html.first().text().toUpperCase().split(', ');
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/georgia/',
            path: 'tr:contains("5 Card Cash") span.jackpot-amount',
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
  },
  

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'5cardcashga',
    regions: ['GA'],
    url:"https://www.lotterypost.com/game/493",
    data: {
      numbers: {
        path: 'img.playingcard',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i<5; i++){
            numbers[i]=html.eq(i).attr('src').replace(/((\/\/lp\.vg\/\images\/cards\/card-)|(\.png))/g, '');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div.resultsDrawDate',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.galottery.com/en-us/games/draw-games/5-card-cash.html#oddsAndPrizes',
            path: 'span.jackpot-amount',
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
  }
];


export const fivecardcashgaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'5cardcashga',
    regions: ['GA'],
    url:"http://www.lotteryusa.com/georgia/",
    data: {
      jackpot: {
        path: 'tr:contains("5 Card Cash") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("5 Card Cash") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'5cardcashga',
    regions: ['GA'],
    url:"https://www.lotterypost.com/game/493",
    data: {
      jackpot: {
        path: 'div.resultsDrawDate',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.galottery.com/en-us/games/draw-games/5-card-cash.html#oddsAndPrizes',
            path: 'span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.resultsNextDrawInfo',
        transform: async (html) => {
          const text = html.children().eq(1).text();
          const date = await moment(text, "ddd, MMM D, YYYY, h:m pm").format();
          return date;
        }
      }
    }
  }
];