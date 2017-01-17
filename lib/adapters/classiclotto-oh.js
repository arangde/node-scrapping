import moment from 'moment';
import { getData } from '../helpers/getData';
export const classiclottoohRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'classiclottooh',
    regions: ['OH'],
    url:"https://www.ohiolottery.com/games/drawgames/classic-lotto.aspx",
    data: {
      numbers: {
        path: 'div#classiclotto_winning_numbers ul.balls li',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!=""; i++){
            numbers[i] = html.eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div#classiclotto_winning_numbers p:nth-child(5) span',
        transform: async (html) => {
          return parseInt((parseFloat(/([0-9.]+)(?: Million)/g.exec(html.first().text())[1])-0.1)*1000000);
        }
      },
      date: {
        path: 'div#classiclotto_winning_numbers span.date',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'classiclottooh',
    regions: ['OH'],
    url:"http://www.lotteryusa.com/ohio/classic-lotto/",
    data: {
      numbers: {
        path: 'span.string-results',
        transform: async (html) => {
          const numbers = html.first().text().replace(/, K: [0-9]+/g, '').split(', ');
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


export const classiclottoohNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'classiclottooh',
    regions: ['OH'],
    url:"https://www.ohiolottery.com/games/drawgames/classic-lotto.aspx",
    data: {
      jackpot: {
        path: 'div#classiclotto_winning_numbers p:nth-child(5) span',
        transform: async (html) => {
          return parseInt(parseFloat(/([0-9.]+)(?: Million)/g.exec(html.first().text())[1])*1000000);
        }
      },
      date: {
        path: 'div#classiclotto_winning_numbers span.date',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/313',
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
    lotteryName:'classiclottooh',
    regions: ['OH'],
    url:"http://www.lotteryusa.com/ohio/",
    data: {
      jackpot: {
        path: 'tr:contains("Classic Lotto") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Classic Lotto") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];