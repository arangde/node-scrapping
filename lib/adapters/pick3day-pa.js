import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3daypaRecent = [// Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3daypa',
    regions: ['PA'],
    url:"https://www.palottery.state.pa.us/Games/PICK-3",
    data: {
      numbers: {
        path: 'div#middayDraw ul li',
        transform: async (html) => {
          const numbers = [];
          for(let i=0;html.eq(i).text()!="";i++){
            numbers[i]=html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.palottery.state.pa.us/Games/PICK-3/Prizes-Chances.aspx',
            path: 'tr:nth-child(1) > td:nth-child(4)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div#middayDraw span.dailydrawtime',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "MMM. DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3daypa',
    regions: ['PA'],
    url:"http://www.lotteryusa.com/pennsylvania/midday-pick-3/",
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


export const pick3daypaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3daypa',
    regions: ['PA'],
    url:"https://www.palottery.state.pa.us/Games/PICK-3",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.palottery.state.pa.us/Games/PICK-3/Prizes-Chances.aspx',
            path: 'tr:nth-child(1) > td:nth-child(4)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div#middayDraw span.dailydrawtime',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/218',
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
    lotteryName:'pick3daypa',
    regions: ['PA'],
    url:"http://www.lotteryusa.com/pennsylvania/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday Pick 3") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Midday Pick 3") span.next-draw-date',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];