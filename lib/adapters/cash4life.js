import moment from 'moment';
import { getData } from '../helpers/getData';
export const cash4lifeRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash4life',
    regions: ['GA', 'IN', 'MD', 'NJ', 'NY', 'PA', 'TN', 'VA'],
    url:"http://www.lottostrategies.com/script/winning_of_past_month/100/134/NJ/New-Jersey-NJ-Cash4Life-lottery-results.html",
    data: {
      numbers: {
        path: 'div.datagrid td:nth-child(2) b',
        transform: async (html) => {
          const numbers = html.first().text().split('-');
          return numbers;
        }
      },
      jackpot: {
        path: 'table',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.nj.gov/lottery/mobile/cash4life-odds.shtml',
            path: 'p strong',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'td code',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd MM/DD/YY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'cash4life',
    regions: ['GA', 'IN', 'MD', 'NJ', 'NY', 'PA', 'TN', 'VA'],
    url:"http://www.lotteryusa.com/new-jersey/cash4life/",
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


export const cash4lifeNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash4life',
    regions: ['GA', 'IN', 'MD', 'NJ', 'NY', 'PA', 'TN', 'VA'],
    url:"http://www.lottostrategies.com/script/winning_of_past_month/100/134/NJ/New-Jersey-NJ-Cash4Life-lottery-results.html",
    data: {
      jackpot: {
        path: 'table.winningtierdesc tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.nj.gov/lottery/mobile/cash4life-odds.shtml',
            path: 'p strong',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'td code',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/cash4life',
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
    lotteryName:'cash4life',
    regions: ['GA', 'IN', 'MD', 'NJ', 'NY', 'PA', 'TN', 'VA'],
    url:"http://www.lotteryusa.com/new-jersey/",
    data: {
      jackpot: {
        path: 'tr:contains("Cash4Life") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Cash4Life") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];