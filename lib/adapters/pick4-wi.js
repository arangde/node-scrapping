import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick4wiRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4wi',
    regions: ['WI'],
    url:"https://www.wilottery.com/lottogames/pick4history.aspx",
    data: {
      numbers: {
        path: 'tbody tr:nth-child(1) td',
        transform: async (html) => {
          const numbers = [];
          for(let i=1; html.eq(i).text()!=""; i++){
            numbers[i-1]=html.eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.wilottery.com/lottogames/pick4info.aspx',
            path: 'td[headers="straight prize $1"]',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tbody tr:nth-child(1) td',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4wi',
    regions: ['WI'],
    url:"http://www.lotteryusa.com/wisconsin/daily-pick-4/",
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


export const pick4wiNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4wi',
    regions: ['WI'],
    url:"https://www.wilottery.com/lottogames/pick4history.aspx",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.wilottery.com/lottogames/pick4info.aspx',
            path: 'td[headers="straight prize $1"]',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tbody tr:nth-child(1) td',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/213',
            path: 'div.resultsNextDrawInfo p',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text, "ddd, MMM DD, YYYY").format();
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
    lotteryName:'pick4wi',
    regions: ['WI'],
    url:"http://www.lotteryusa.com/wisconsin/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 4") span.next-jackpot-amount',
        transform: async (html) => {
            let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
            return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Pick 4") span.next-draw-date',
        transform: async (html) => {
          let text = html.first().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];