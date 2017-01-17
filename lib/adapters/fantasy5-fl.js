import moment from 'moment';
import { getData } from '../helpers/getData';
export const fantasy5flRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'fantasy5-fl',
    regions: ['FL'],
    url:"http://www.flalottery.com/site/fantasy5",
    data: {
      numbers: {
        path: 'div.gamePageBalls span.balls',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != "" ; i++){
            numbers[i]=html.eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'p.gameJackpot',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.flalottery.com/fantasy5-howToPlay',
            path: 'table#fantasy5Odds tbody tr:nth-child(1) td:contains("$")',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.gamePageNumbers p:nth-child(3)',
        transform: async (html) => {
          const text = html.first().text().trim().replace(/[A-z]+, /,"");
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'fantasy5-fl',
    regions: ['FL'],
    url:"http://www.lotteryusa.com/florida/fantasy-5/",
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
          return parseInt(html.first().text().replace(/\..+/g,"").replace(/\D/g , ''));   
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


export const fantasy5flNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'fantasy5-fl',
    regions: ['FL'],
    url:"http://www.flalottery.com/site/fantasy5",
    data: {
      jackpot: {
        path: 'p.gameJackpot',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.flalottery.com/fantasy5-howToPlay',
            path: 'table#fantasy5Odds tbody tr:nth-child(1) td:contains("$")',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.gamePageNumbers p:nth-child(3)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/34',
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
    lotteryName:'fantasy5-fl',
    regions: ['FL'],
    url:"http://www.lotteryusa.com/florida/",
    data: {
      jackpot: {
        path: 'tr:contains("Fantasy 5") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Fantasy 5") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];