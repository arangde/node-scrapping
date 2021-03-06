import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick4eveningmoRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4eveningmo',
    regions: ['MO'],
    url:"http://www.molottery.com/numbers/winning_numbers.jsp",
    data: {
      numbers: {
        path: 'div#p4Table > table tr:contains("Evening") td:nth-child(3)',
        transform: async (html) => {
          const numbers = html.first().text().trim().split("-");
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.molottery.com/pick4/pick4.jsp',
            path: 'tr:contains("Exact Order") td:nth-child(5)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\s.+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div#p4Table > table tr:contains("Evening") td:nth-child(1)',
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
    lotteryName:'pick4eveningmo',
    regions: ['MO'],
    url:"http://www.lotteryusa.com/missouri/pick-4/",
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


export const pick4eveningmoNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4eveningmo',
    regions: ['MO'],
    url:"http://www.molottery.com/numbers/winning_numbers.jsp",
    data: {
      jackpot: {
       path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.molottery.com/pick4/pick4.jsp',
            path: 'tr:contains("Exact Order") td:nth-child(5)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\s.+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div#p4Table > table tr:contains("Evening") td:nth-child(1)',
        transform: async (html) => {
          let date = await getData({
            url: 'https://www.lotterypost.com/game/116',
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
    lotteryName:'pick4eveningmo',
    regions: ['MO'],
    url:"http://www.lotteryusa.com/missouri/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 4") span.next-jackpot-amount',
        transform: async (html) => {
            return parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
        }
      },
      date: {
        path: 'tr:contains("Pick 4") span.next-draw-date',
        transform: async (html) => {
          let text = html.last().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];
