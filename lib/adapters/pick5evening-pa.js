import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick5eveningpaRecent = [// Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick5eveningpa',
    regions: ['PA'],
    url:"https://www.palottery.state.pa.us/Games/PICK-5.aspx",
    data: {
      numbers: {
        path: 'div#eveningDraw ul li',
        transform: async (html) => {
          const numbers = [];
          for(let i=0;html.eq(i).text()!="";i++){
            numbers[i]=html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'li',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.palottery.state.pa.us/Games/PICK-5/Prizes-Chances.aspx',
            path: 'tr:nth-child(1) > td:nth-child(4)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div#eveningDraw span.dailydrawtime',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "MMM. DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick5eveningpa',
    regions: ['PA'],
    url:"http://www.lotteryusa.com/pennsylvania/pick-5/",
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


export const pick5eveningpaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick5eveningpa',
    regions: ['PA'],
    url:"https://www.palottery.state.pa.us/Games/PICK-5.aspx",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.palottery.state.pa.us/Games/PICK-5/Prizes-Chances.aspx',
            path: 'tr:nth-child(1) > td:nth-child(4)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div#eveningDraw span.dailydrawtime',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/341',
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
    lotteryName:'pick5eveningpa',
    regions: ['PA'],
    url:"http://www.lotteryusa.com/pennsylvania/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 5") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Pick 5") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];
