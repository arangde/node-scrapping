import moment from 'moment';
import { getData } from '../helpers/getData';
export const take5nyRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'take5ny',
    regions: ['NY'],
    url:"https://www.lotterypost.com/game/148",
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
          let jackpot = await getData({
            url: 'http://www.nylotteryx.com/Take-5/news-and-payout.htm',
            path: 'tr:contains("5 of 5") > td.td0:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
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
    lotteryName:'take5ny',
    regions: ['NY'],
    url:"http://www.lotteryusa.com/new-york/take-5/",
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
            url: 'http://www.lotteryusa.com/new-york/',
            path: 'tr:contains("Take 5") span.jackpot-amount',
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


export const take5nyNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'take5ny',
    regions: ['NY'],
    url:"https://www.lotterypost.com/game/148",
    data: {
      jackpot: {
        path: 'div.resultsNextDrawInfoUnit:nth-child(2) p span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://nylottery.ny.gov/wps/portal/Home/Lottery/Home/Daily+Games/TAKE+5/Take+5+-+Chances+of+Winning',
            path: 'tr:contains("5 of 5") > td:nth-child(4)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\..+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot; 
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
    lotteryName:'take5ny',
    regions: ['NY'],
    url:"http://www.lotteryusa.com/new-york/",
    data: {
      jackpot: {
        path: 'tr:contains("Take 5") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Take 5") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];