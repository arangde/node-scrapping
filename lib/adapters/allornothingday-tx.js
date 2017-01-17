import moment from 'moment';
import { getData } from '../helpers/getData';
export const allornothingdaytxRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'allornothingdaytx',
    regions: ['TX'],
    url:"http://www.txlottery.org/export/sites/lottery/Games/All_or_Nothing/",
    data: {
      numbers: {
        path: 'ol.winningNumberBalls',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i<6; i++){
            numbers[i]=html.eq(6).children().eq(i).text();
            numbers[i+6]=html.eq(21).children().eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div.large-9 > p:nth-of-type(1)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lottoreport.com/AllorNothing.htm',
            path: 'tr:contains("0 Numbers") > td:nth-child(3) > b',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'a.detailsLink',
        transform: async (html) => {
          const text = html.eq(1).text().replace("Day Winning Numbers for ",'');
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'allornothingdaytx',
    regions: ['TX'],
    url:"http://www.lotteryusa.com/texas/day-all-or-nothing/",
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


export const allornothingdaytxNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'allornothingdaytx',
    regions: ['TX'],
    url:"http://www.txlottery.org/export/sites/lottery/Games/All_or_Nothing/",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lottoreport.com/AllorNothing.htm',
            path: 'tr:contains("0 Numbers") > td:nth-child(3) > b',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'a.detailsLink',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/414',
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
    lotteryName:'allornothingdaytx',
    regions: ['TX'],
    url:"http://www.lotteryusa.com/texas/",
    data: {
      jackpot: {
        path: 'tr:contains("Day All or Nothing") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Day All or Nothing") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];
