import moment from 'moment';
import { getData } from '../helpers/getData';
export const cash5dayvaRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash5dayva',
    regions: ['VA'],
    url:"https://www.valottery.com/SearchNumbers/cash5/",
    data: {
      numbers: {
        path: 'td.whiteball',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i<5; i++){
            numbers[i]=html.eq(i).text();
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
    lotteryName:'cash5dayva',
    regions: ['VA'],
    url:"http://www.lotteryusa.com/virginia/midday-cash-5/",
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


export const cash5dayvaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash5dayva',
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
            url: 'https://www.lotterypost.com/game/194',
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
    lotteryName:'cash5dayva',
    regions: ['VA'],
    url:"http://www.lotteryusa.com/virginia/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday Cash 5") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Midday Cash 5") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];