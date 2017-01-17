import moment from 'moment';
import { getData } from '../helpers/getData';
export const dailyderbycaRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'dailyderbyca',
    regions: ['CA'],
    url:"http://www.calottery.com/play/draw-games/daily-derby/",
    data: {
      numbers: {
        path: 'dl',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; html.first().children("dt").eq(i).text() != ""; i++){
            numbers[i] = html.first().children("dd").eq(i).text()+": "+html.first().children("dt").eq(i).text();
          }
          numbers[i] = html.first().children().last().text()
          return numbers;
        }
      },
      jackpot: {
        path: 'div.resultsNextDrawInfoUnit span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lotterypost.com/game/6',
            path: 'div.resultsNextDrawInfoUnit span',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().replace(/\D/g, ""))-parseInt(html.last().text().replace(/\D/g, ""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'h3.date',
        transform: async (html) => {
          let text = html.first().text().replace(/\s/g, "").replace(/\|.+/g, "");
          const date = await moment(text, "dddd,MMMMDD,YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'dailyderbyca',
    regions: ['CA'],
    url:"http://www.lotteryusa.com/california/daily-derby/",
    data: {
      numbers: {
        path: 'span.string-results',
        transform: async (html) => {

          const numbers = html.first().text().split(", ");
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
            return parseInt(html.first().text().replace(/\D/g,""));
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


export const dailyderbycaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'dailyderbyca',
    regions: ['CA'],
    url:"http://www.calottery.com/play/draw-games/daily-derby/",
    data: {
      jackpot: {
        path: 'div.drawGameHero h2',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'h3.date',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/6',
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
    lotteryName:'dailyderbyca',
    regions: ['CA'],
    url:"http://www.lotteryusa.com/california/",
    data: {
      jackpot: {
        path: 'tr:contains("Daily Derby") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Daily Derby") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];