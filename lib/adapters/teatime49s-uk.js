import moment from 'moment';
import { getData } from '../helpers/getData';
export const teatime49sukRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'teatime49suk',
    regions: ['UK'],
    url:"http://www.lottonumbers.com/uk-49s-teatime.asp",
    data: {
      numbers: {
        path: 'tr:nth-child(2) div.results-l div.result',
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
            url: 'http://www.alllotto.co.uk/',
            path: 'tr:contains("Teatime 49s") > td:contains("£") > div.normal',
            transform: async (html) => {
              return parseInt(html.last().text().replace(/\D/g,""));
            }
          });
          return jackpot;
        } 
      },
      date: {
        path: 'table tr:nth-child(1) table tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "dddd Do MMMM YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'teatime49suk',
    regions: ['UK'],
    url:"http://www.lottostrategies.com/script/winning_of_past_month/100/UKT/UK/UK-National-UK-Teatime-49s-lottery-results.html",
    data: {
      numbers: {
        path: 'table :nth-child(2) tr:nth-child(1) td:nth-child(2) b',
        transform: async (html) => {
          let numbers = html.first().text().split("-");
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://194.154.170.11/49s/HowToPlay.aspx',
            path: 'tr:nth-child(2) td:nth-child(2)',
            transform: async (html) => {
              return parseInt(html.first().text().replace(/\D/g,""));
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
  }
];


export const teatime49sukNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'teatime49suk',
    regions: ['UK'],
    url:"http://www.lottonumbers.com/uk-49s-teatime.asp",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.alllotto.co.uk/',
            path: 'tr:contains("Teatime 49s") > td:contains("£") > div.normal',
            transform: async (html) => {
              return parseInt(html.last().text().replace(/\D/g,""));
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tbody tr:nth-child(1) td',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lottostrategies.co/script/last_results/271/UK/uk-national-lottery-results.html',
            path: 'td:contains("Teatime") span.next_date b',
            transform: async (html) => {
              let text = html.last().text();
              let date = await moment(text,"ddd MMM D").format(); 
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
    lotteryName:'teatime49suk',
    regions: ['UK'],
    url:"http://www.lottostrategies.com/script/winning_of_past_month/100/UKT/UK/UK-National-UK-Teatime-49s-lottery-results.html",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://194.154.170.11/49s/HowToPlay.aspx',
            path: 'tr:nth-child(2) td:nth-child(2)',
            transform: async (html) => {
              return parseInt(html.first().text().replace(/\D/g,""));
            }
          });
          return jackpot;  
        }
      },
      date: {
        path: 'time',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lottostrategies.co/script/last_results/271/UK/uk-national-lottery-results.html',
            path: 'td:contains("Teatime") span.next_date b',
            transform: async (html) => {
              let text = html.last().text();
              let date = await moment(text,"ddd MMM D").format(); 
              return date;
            }
          });
          return nextDate;
        }
      }
    }
  }
];