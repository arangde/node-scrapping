import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick4eveningncRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4eveningnc',
    regions: ['NC'],
    url:"http://www.nc-educationlottery.org/pick4_past.aspx",
    data: {
      numbers: {
        path: 'tr:contains("Evening") td:nth-child(3)',
        transform: async (html) => {
          const numbers = html.first().text().trim().split(" - ");
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/north-carolina/',
            path: 'tr:contains("Pick 4") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.last().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Evening") td:nth-child(1)',
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
    lotteryName:'pick4eveningnc',
    regions: ['NC'],
    url:"http://www.lotteryusa.com/north-carolina/pick-4/",
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


export const pick4eveningncNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4eveningnc',
    regions: ['NC'],
    url:"http://www.nc-educationlottery.org/pick4_past.aspx",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/north-carolina/',
            path: 'tr:contains("Pick 4") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Evening") td:nth-child(1)',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "MMM DD, YYYY").add({days:1}).format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4eveningnc',
    regions: ['NC'],
    url:"http://www.lotteryusa.com/north-carolina/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 4") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Pick 4") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];
