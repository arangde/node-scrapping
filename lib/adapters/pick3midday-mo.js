import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3middaymoRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3middaymo',
    regions: ['MO'],
    url:"http://www.molottery.com/numbers/winning_numbers.jsp",
    data: {
      numbers: {
        path: 'div#p3Table > table tr:contains("Midday") td:nth-child(3)',
        transform: async (html) => {
          const numbers = html.first().text().trim().split("-");
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.molottery.com/pick3/pick3.jsp',
            path: 'tr:contains("Straight Match") td:nth-child(6)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\s.+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div#p3Table > table tr:contains("Midday") td:nth-child(1)',
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
    lotteryName:'pick3middaymo',
    regions: ['MO'],
    url:"http://www.lotteryusa.com/missouri/midday-pick-3/",
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


export const pick3middaymoNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3middaymo',
    regions: ['MO'],
    url:"http://www.molottery.com/numbers/winning_numbers.jsp",
    data: {
      jackpot: {
       path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.molottery.com/pick3/pick3.jsp',
            path: 'tr:contains("Straight Match") td:nth-child(6)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\s.+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div#p3Table > table tr:contains("Midday") td:nth-child(1)',
        transform: async (html) => {
          let date = await getData({
            url: 'https://www.lotterypost.com/game/263',
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
    lotteryName:'pick3middaymo',
    regions: ['MO'],
    url:"http://www.lotteryusa.com/missouri/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday Pick 3") span.next-jackpot-amount',
        transform: async (html) => {
            return parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
        }
      },
      date: {
        path: 'tr:contains("Midday Pick 3") span.next-draw-date',
        transform: async (html) => {
          let text = html.first().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];