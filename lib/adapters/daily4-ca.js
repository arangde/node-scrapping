import moment from 'moment';
import { getData } from '../helpers/getData';
export const daily4caRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily4ca',
    regions: ['CA'],
    url:"http://www.calottery.com/play/draw-games/daily-4/winning-numbers",
    data: {
      numbers: {
        path: 'td',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(1).children().eq(i).text() != ""; i++){
            numbers[i] = html.eq(1).children().eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'h3',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.calottery.com/play/draw-games/daily-4',
            path: 'div.drawGameHero h2',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'td',
        transform: async (html) => {
          let text = html.first().text().replace(/ - .+/g, "");
          const date = await moment(text, "MMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'daily4ca',
    regions: ['CA'],
    url:"http://www.lotteryusa.com/california/daily-4/",
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
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/california/',
            path: 'tr:contains("Daily 4") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
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


export const daily4caNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily4ca',
    regions: ['CA'],
    url:"http://www.calottery.com/play/draw-games/daily-4/winning-numbers",
    data: {
      jackpot: {
        path: 'tr',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.calottery.com/play/draw-games/daily-4',
            path: 'div.drawGameHero h2',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {      
        path: 'td',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/337',
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
    lotteryName:'daily4ca',
    regions: ['CA'],
    url:"http://www.lotteryusa.com/california/",
    data: {
      jackpot: {
        path: 'tr:contains("Daily 4") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Daily 4") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];