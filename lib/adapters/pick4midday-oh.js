import moment from 'moment'; 
import { getData } from '../helpers/getData';
export const pick4middayohRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4middayoh',
    regions: ['OH'],
    url:"https://www.ohiolottery.com/mobile/pick-4",
    data: {
      numbers: {
        path: 'li.pick4:contains("Midday") ul.balls',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.first().children().slice(0,4).eq(i).text()!="";i++){
            numbers[i] = html.first().children().slice(0,4).eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.ohiolottery.com/games/drawgames/pick-4.aspx',
            path: 'tr:nth-child(2) td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\s.+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'li.pick4:contains("Midday") span.date',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "dddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4middayoh',
    regions: ['OH'],
    url:"http://www.lotteryusa.com/ohio/midday-pick-4/",
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


export const pick4middayohNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4middayoh',
    regions: ['OH'],
    url:"https://www.lotterypost.com/game/154",
    data: {
      jackpot: {
       path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.ohiolottery.com/games/drawgames/pick-4.aspx',
            path: 'tr:nth-child(2) td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\s.+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.resultsNextDrawInfo p:nth-child(2)',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "ddd, MMM DD, YYYY, h:mA").format();
          return date;
        }
    }
}
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4middayoh',
    regions: ['OH'],
    url:"http://www.lotteryusa.com/ohio/",
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
