import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3nightvaRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3nightva',
    regions: ['VA'],
    url:"https://www.valottery.com/SearchNumbers/pick3/",
    data: {
      numbers: {
        path: 'tr:nth-child(2) div:nth-child(2) td:nth-child(3) table tr:nth-child(1) td.whiteball',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!=""; i++){
            numbers[i]=html.eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.valottery.com/GamesAndMore/pick3/',
            path: 'tr:nth-child(2) > td.blacktext:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:nth-child(2) div:nth-child(2) tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3nightva',
    regions: ['VA'],
    url:"http://www.lotteryusa.com/virginia/pick-3/",
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


export const pick3nightvaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3nightva',
    regions: ['VA'],
    url:"https://www.valottery.com/SearchNumbers/pick3/",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.valottery.com/GamesAndMore/pick3/',
            path: 'tr:contains("Exact Order Play") > td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:nth-child(2) div:nth-child(2) tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          let date = await getData({
            url: 'https://www.lotterypost.com/game/195',
            path: 'div.resultsNextDrawInfo p:nth-child(2)',
            transform: async (html) => {
              const text = html.first().text().trim();
              const date = await moment(text, "ddd, MMM DD, YYYY, h:mA").format();
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
    lotteryName:'pick3nightva',
    regions: ['VA'],
    url:"http://www.lotteryusa.com/virginia/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 3") span.next-jackpot-amount',
        transform: async (html) => {
            return parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
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