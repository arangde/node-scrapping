import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3eveningkyRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3eveningky',
    regions: ['KY'],
    url:"https://www.kylottery.com/apps/draw_games/pick3/pick3_pastwinning.html",
    data: {
      numbers: {
        path: 'td:contains("Evening") tr span.pick3clr',
        transform: async (html) => {
          const numbers = html.first().text().trim();

          if (numbers.replace(/\D/g,'') == "" ) {
            let numbersReturned = html.eq(1).text().trim().split(" - ");
            return numbersReturned;
          } else {
            return numbers.split(" - ");
          }
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.kylottery.com/apps/draw_games/pick3/howtoplay.html',
            path: 'table.greenCustomHeader td:nth-child(6)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\s.+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Evening")',
        transform: async (html) => {
          const text = html.first().children().first().text();
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3eveningky',
    regions: ['KY'],
    url:"http://www.lotteryusa.com/kentucky/pick-3/",
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
            return parseInt(html.first().text().trim().replace(/\D/g,""));
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


export const pick3eveningkyNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3eveningky',
    regions: ['KY'],
    url:"https://www.kylottery.com/apps/draw_games/pick3/pick3_pastwinning.html",
    data: {
      jackpot: {
       path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.kylottery.com/apps/draw_games/pick3/howtoplay.html',
            path: 'table.greenCustomHeader td:nth-child(6)',
            transform: async (html) => {
              let jackpot = html.first().text().trim().replace(/\s.+/g,"").replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Evening")',
        transform: async (html) => {
          let date = await getData({
            url: 'https://www.lotterypost.com/game/76',
            path: 'div.resultsNextDrawInfo p',
            transform: async (html) => {
              const text = html.first().text();
              const date = await moment(text, "ddd, MMM D, YYYY, h:mA").format();
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
    lotteryName:'pick3eveningky',
    regions: ['KY'],
    url:"http://www.lotteryusa.com/kentucky/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 3") span.next-jackpot-amount',
        transform: async (html) => {
            return parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
        }
      },
      date: {
        path: 'tr:contains("Pick 3") span.next-draw-date',
        transform: async (html) => {
          let text = html.last().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];