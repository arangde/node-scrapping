import moment from 'moment';
import { getData } from '../helpers/getData';
export const tennesseecashtnRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'tennesseecashtn',
    regions: ['TN'],
    url:"https://www.lotterypost.com/game/385",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!="";i++){
            numbers[i] = html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div.resultsNextDrawInfoUnit:nth-child(2) p span',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""))-parseInt(html.last().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'div.resultsDrawDate',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "dddd, MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'tennesseecashtn',
    regions: ['TN'],
    url:"http://www.lotteryusa.com/tennessee/tennessee-cash/",
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


export const tennesseecashtnNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'tennesseecashtn',
    regions: ['TN'],
    url:"https://www.lotterypost.com/game/385",
    data: {
      jackpot: {
        path: 'div.resultsNextDrawInfoUnit:nth-child(2) p span',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'div.resultsNextDrawInfo p:nth-child(2)',
        transform: async (html) => {
          let text = html.first().text().trim();
          let date = await moment(text, "ddd, MMM D, YYYY, h:mA").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'tennesseecashtn',
    regions: ['TN'],
    url:"http://www.lotteryusa.com/tennessee/tennessee-cash/",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/tennessee/',
            path: 'tr:contains("Tennessee Cash") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'time',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/tennessee/',
            path: 'tr:contains("Tennessee Cash") span.next-draw-date',
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
  }
];