import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick4middaykyRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4middayky',
    regions: ['KY'],
    url:"https://www.kylottery.com/apps/draw_games/pick4/pick4_pastwinning.html",
    data: {
      numbers: {
        path: 'td:contains("Midday") tr:nth-child(1) span.pick4clr',
        transform: async (html) => {
          const numbers = html.first().text().trim().split(" - ");
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.kylottery.com/apps/draw_games/pick4/howtoplay.html',
            path: 'table.greenCustomHeader td:nth-child(6)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\s.+/g,"").replace(/\D/g,""));
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
    lotteryName:'pick4middayky',
    regions: ['KY'],
    url:"http://www.lotteryusa.com/kentucky/midday-pick-4/",
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
            return parseInt(html.first().text().trim().replace(/\D/g,""));
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


export const pick4middaykyNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4middayky',
    regions: ['KY'],
    url:"https://www.kylottery.com/apps/draw_games/pick4/pick4_pastwinning.html",
    data: {
      jackpot: {
       path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.kylottery.com/apps/draw_games/pick4/howtoplay.html',
            path: 'table.greenCustomHeader td:nth-child(6)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\s.+/g,"").replace(/\D/g,""));
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
            url: 'https://www.lotterypost.com/game/75',
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
    lotteryName:'pick4middayky',
    regions: ['KY'],
    url:"http://www.lotteryusa.com/kentucky/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday Pick 4") span.next-jackpot-amount',
        transform: async (html) => {
            return parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
        }
      },
      date: {
        path: 'tr:contains("Midday Pick 4") span.next-draw-date',
        transform: async (html) => {
          let text = html.first().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];
