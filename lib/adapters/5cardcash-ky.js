import moment from 'moment';
import { getData } from '../helpers/getData';
export const fivecardcashkyRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'5cardcashky',
    regions: ['KY'],
    url:"https://www.kylottery.com/apps/draw_games/5cardcash",
    data: {
      numbers: {
        path: 'table tr:nth-child(2)',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i< 5; i++){
            numbers.push(html.children().eq(i).text());
          };
          return numbers;

        }
      },
      jackpot: {
        path: 'div.content_bg div span',
        transform: async (html) => {
          return parseInt(html.eq(1).text().replace(/\D/g, ''));
        }
      },
      date: {
        path: 'span.date',
        transform: async (html) => {
          const text = html.text().replace(/(\s)/g,'');
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'5cardcashky',
    regions: ['KY'],
    url:"http://www.lotteryusa.com/kentucky/5-card-cash/",
    data: {
      numbers: {
        path: 'span.string-results',
        transform: async (html) => {
          const numbers = html.first().text().split(', ');
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ''));
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


export const fivecardcashkyNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'5cardcashky',
    regions: ['KY'],
    url:"https://www.kylottery.com/apps/draw_games/5cardcash",
    data: {
      jackpot: {
        path: 'div.content_bg div span',
        transform: async (html) => {
          return parseInt(html.eq(1).text().replace(/\D/g, ''));
        }
      },
      date: {
        path: 'span.date',
        transform: async (html) => {       
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/398',
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
    lotteryName:'5cardcashky',
    regions: ['KY'],
    url:"http://www.lotteryusa.com/kentucky/",
    data: {
      jackpot: {
        path: 'tr:contains("5 Card Cash") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("5 Card Cash") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];