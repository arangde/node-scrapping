import moment from 'moment';
import { getData } from '../helpers/getData';
export const play4nightctRecent = [// Scraper for the recently passed draw (Primary)
  {
    lotteryName:'play4nightct',
    regions: ['CT'],
    url:"https://www.ctlottery.org/Modules/Games/default.aspx?id=4&winners=1",
    data: {
      numbers: {
        path: 'table.cnresults tr:nth-child(2) td:nth-child(2)',
        transform: async (html) => {
          const numbers = html.first().text().trim().split(" - ");
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.ctlottery.org/Modules/Games/default.aspx?id=4',
            path: 'tr:contains("Odds: 1 in 10,000") > td:nth-child(5)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'table.cnresults tr:nth-child(2) td:nth-child(1)',
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
    lotteryName:'play4nightct',
    regions: ['CT'],
    url:"http://www.lotteryusa.com/connecticut/play-4/",
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


export const play4nightctNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'play4nightct',
    regions: ['CT'],
    url:"https://www.ctlottery.org/Modules/Games/default.aspx?id=4&winners=1",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.ctlottery.org/Modules/Games/default.aspx?id=4',
            path: 'tr:contains("Odds: 1 in 10,000") > td:nth-child(5)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'table.cnresults tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/18',
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
    lotteryName:'play4nightct',
    regions: ['CT'],
    url:"http://www.lotteryusa.com/connecticut/",
    data: {
      jackpot: {
        path: 'tr:contains("Play 4") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.first().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Play 4") span.next-draw-date',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];