import moment from 'moment';
import { getData } from '../helpers/getData';
export const encoreonRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'encoreon',
    regions: ['ON'],
    url:"http://www.lotterycanada.com/ontario-encore",
    data: {
      numbers: {
        path: 'h4 span.label-number',
        transform: async (html) => {
          const numbers = html.first().text().replace(/\D/g,"").split("");
          return numbers;
        }
      },
      jackpot: {
        path: 'tbody tr:nth-child(4) td:nth-child(2) em strong',
        transform: async (html) => {
          return parseInt(html.first().text().trim().replace(/\D/g,""));
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
    lotteryName:'encoreon',
    regions: ['ON'],
    url:"https://www.lotterypost.com/game/274",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i] =   html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.olg.ca/lotteries/games/encore.jsp',
            path: 'table.prizeTable tr:contains("All 7 Digits") td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
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


export const encoreonNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'encoreon',
    regions: ['ON'],
    url:"http://www.lotterycanada.com/ontario-encore",
    data: {
      jackpot: {
        path: 'tbody tr:nth-child(4) td:nth-child(2) em strong',
        transform: async (html) => {
          return parseInt(html.first().text().trim().replace(/\D/g,""));
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
    lotteryName:'encoreon',
    regions: ['ON'],
    url:"https://www.lotterypost.com/game/274",
    data: {
      jackpot: {
        path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.olg.ca/lotteries/games/encore.jsp',
            path: 'table.prizeTable tr:contains("All 7 Digits") td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
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