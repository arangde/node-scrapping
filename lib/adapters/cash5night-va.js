import moment from 'moment';
import { getData } from '../helpers/getData';
export const cash5nightvaRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash5nightva',
    regions: ['VA'],
    url:"https://www.valottery.com/SearchNumbers/cash5/",
    data: {
      numbers: {
        path: 'td.whiteball',
        transform: async (html) => {
          const numbers = [];
          for(let i=5; i<10; i++){
            numbers[i-5]=html.eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'table.winningtierdesc tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          return parseInt(/(?:[0-9]+ tickets matched .+ \/ .+ paying \$)([0-9,]+)/g.exec(html.first().text())[1].replace(/\D/g,''));
        }
      },
      date: {
        path: 'div#main_0_contentleft_2 tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'cash5nightva',
    regions: ['VA'],
    url:"https://www.lotterypost.com/game/191",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().trim().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/virginia/',
            path: 'tr:contains("Cash 5") span.jackpot-amount',
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


export const cash5nightvaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash5nightva',
    regions: ['VA'],
    url:"https://www.valottery.com/SearchNumbers/cash5/",
    data: {
      jackpot: {
        path: 'table.winningtierdesc tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          return parseInt(/(?:[0-9]+ tickets matched .+ \/ .+ paying \$)([0-9,]+)/g.exec(html.first().text())[1].replace(/\D/g,''));
        }
      },
      date: {
        path: 'div#main_0_contentleft_2 tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/virginia/',
            path: 'tr:contains("Cash 5") span.next-draw-date',
            transform: async (html) => {
              const text = html.last().text();
              const date = await moment(text, "ddd, MMM DD, YYYY").format();
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
    lotteryName:'cash5nightva',
    regions: ['VA'],
    url:"https://www.lotterypost.com/game/191",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/virginia/',
            path: 'tr:contains("Cash 5") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.resultsNextDrawInfo p:nth-child(2)',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM D, YYYY, h:mm a").format();
          return date;
        }
      }
    }
  }
];