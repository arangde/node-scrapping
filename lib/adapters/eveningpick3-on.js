import moment from 'moment';
import { getData } from '../helpers/getData';
export const eveningpick3onRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'eveningpick3on',
    regions: ['ON'],
    url:"http://www.lotterycanada.com/ontario-pick-3",
    data: {
      numbers: {
        path: 'h4 span.label-number',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=   html.eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'tr:nth-child(1) td:nth-child(3)',
        transform: async (html) => {
          return parseInt(html.first().text().trim().replace(/\.[0-9]+/g,"").replace(/\D/g,""));
        }
      },
      date: {
        path: 'span.draw-date.small',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "- MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'eveningpick3on',
    regions: ['ON'],
    url:"https://www.lotterypost.com/game/245",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=   html.eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotterycanada.com/ontario-pick-3',
            path: 'tr:nth-child(1) td:nth-child(3)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\.[0-9]+/g,"").replace(/\D/g,""));
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


export const eveningpick3onNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'eveningpick3on',
    regions: ['ON'],
    url:"http://www.lotterycanada.com/ontario-pick-3",
    data: {
      jackpot: {
        path: 'tr:nth-child(1) td:nth-child(3)',
        transform: async (html) => {
          return parseInt(html.first().text().trim().replace(/\.[0-9]+/g,"").replace(/\D/g,""));
        }
      },
      date: {
        path: 'div.panel-footer strong',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'eveningpick3on',
    regions: ['ON'],
    url:"https://www.lotterypost.com/game/245",
    data: {
      jackpot: {
        path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotterycanada.com/ontario-pick-3',
            path: 'tr:nth-child(1) td:nth-child(3)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\.[0-9]+/g,"").replace(/\D/g,""));
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
  }
];