import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3morningtxRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3morningtx',
    regions: ['TX'],
    url:"http://www.txlottery.org/export/sites/lottery/Games/Pick_3/",
    data: {
      numbers: {
        path: 'div.large-6:nth-child(1) ol',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.first().children().eq(i).text()!=""; i++){
            numbers[i]=html.first().children().eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'p strong',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'div.large-6:nth-child(1) div.gameInfo p',
        transform: async (html) => {
          const text = html.first().text().replace("Pick 3 Morning Winning Numbers for ",'');
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3morningtx',
    regions: ['TX'],
    url:"http://www.lotteryusa.com/texas/morning-pick-3/",
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


export const pick3morningtxNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3morningtx',
    regions: ['TX'],
    url:"http://www.txlottery.org/export/sites/lottery/Games/Pick_3/",
    data: {
      jackpot: {
        path: 'p strong',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'div.large-6:nth-child(1) div.gameInfo p',
        transform: async (html) => {
          let date = await getData({
            url: 'https://www.lotterypost.com/game/435',
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
    lotteryName:'pick3morningtx',
    regions: ['TX'],
    url:"http://www.lotteryusa.com/texas/",
    data: {
      jackpot: {
        path: 'tr:contains("Morning Pick 3") span.next-jackpot-amount',
        transform: async (html) => {
            return parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
        }
      },
      date: {
        path: 'tr:contains("Morning Pick 3") span.next-draw-date',
        transform: async (html) => {
          let text = html.first().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];