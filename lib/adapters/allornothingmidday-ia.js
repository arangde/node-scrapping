import moment from 'moment';
import { getData } from '../helpers/getData';
export const allornothingmiddayiaRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'allornothingmiddayia',
    regions: ['IA', 'MN'],
    url:"http://www.ialottery.com/Games/Online/AONWinM.asp",
    data: {
      numbers: {
        path: 'tr:nth-child(2) td:nth-child(2)',
        transform: async (html) => {
          const numbers = html.first().text().split(' - ');
          return numbers;
        }
      },
      jackpot: {
        path: 'h2.price',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.ialottery.com/Games/Online/AON.asp',
            path: 'tr.odd td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "M/D/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'allornothingmiddayia',
    regions: ['IA', 'MN'],
    url:"http://www.lotteryusa.com/iowa/midday-all-or-nothing/",
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


export const allornothingmiddayiaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'allornothingmiddayia',
    regions: ['IA', 'MN'],
    url:"http://www.ialottery.com/Games/Online/AONWinM.asp",
    data: {
      jackpot: {
        path: 'tr',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.ialottery.com/Games/Online/AON.asp',
            path: 'tr.odd td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/454',
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
    lotteryName:'allornothingmiddayia',
    regions: ['IA', 'MN'],
    url:"http://www.lotteryusa.com/iowa/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday All or Nothing") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Midday All or Nothing") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];