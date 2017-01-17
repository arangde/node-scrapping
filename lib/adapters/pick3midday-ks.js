import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3middayksRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3middayks',
    regions: ['KS'],
    url:"https://www.kslottery.com/NumbersLookup/PCK3PreviousNumbers.aspx",
    data: {
      numbers: {
        path: 'tr:contains("Midday")',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i<3; i++){
            numbers[i]=html.first().children().eq(i+1).text().trim().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.kslottery.com/Games/PCK3Odds.aspx',
            path: 'tr:contains("(Straight)") td:nth-child(5)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Midday")',
        transform: async (html) => {
          const text = html.first().children().first().text();
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3middayks',
    regions: ['KS'],
    url:"http://www.lotteryusa.com/kansas/midday-pick-3/",
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
            url: 'http://www.lotteryusa.com/kansas/',
            path: 'tr:contains("Pick 3") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.last().text().trim().replace(/\D/g,""));
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


export const pick3middayksNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3middayks',
    regions: ['KS'],
    url:"https://www.kslottery.com/NumbersLookup/PCK3PreviousNumbers.aspx",
    data: {
      jackpot: {
       path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.kslottery.com/Games/PCK3Odds.aspx',
            path: 'tr:contains("(Straight)") td:nth-child(5)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Midday")',
        transform: async (html) => {
          let date = await getData({
            url: 'https://www.lotterypost.com/game/492',
            path: 'div.resultsNextDrawInfo p',
            transform: async (html) => {
              const text = html.first().text();
              const date = await moment(text, "ddd, MMM D, YYYY, h:mA").format();
              return date;
            }
          });
          return date;
        }
    }
}
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3middayks',
    regions: ['KS'],
    url:"http://www.lotteryusa.com/kansas/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 3") span.jackpot-amount',
        transform: async (html) => {
            let jackpot = parseInt(html.last().text().trim().replace(/\D/g,""));
            return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Pick 3") span.next-draw-date',
        transform: async (html) => {
          let text = html.last().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];