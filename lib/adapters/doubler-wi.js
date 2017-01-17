import moment from 'moment';
import { getData } from '../helpers/getData';
export const doublerwiRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'doublerwi',
    regions: ['WI'],
    url:"https://www.wilottery.com/lottogames/supercash.aspx",
    data: {
      numbers: {
        path: 'table#ctl00_ContentPlaceHolder1_GridView1 tbody tr:nth-child(1) td',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.slice(1).eq(i).text() != "" ; i++){
            numbers[i] = html.slice(1).eq(i).text().trim();
          }
          numbers.pop();
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.wilottery.com/lottogames/supercashinfo.aspx',
            path: 'td[headers="6of6 win"]',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'table#ctl00_ContentPlaceHolder1_GridView1 tbody tr:nth-child(1) td:nth-child(1)',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'doublerwi',
    regions: ['WI'],
    url:"https://www.lotterypost.com/game/214",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/wisconsin/',
            path: 'tr:contains("Super Cash") span.jackpot-amount',
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
          const text = html.first().text();
          const date = await moment(text, "dddd, MMMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const doublerwiNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'doublerwi',
    regions: ['WI'],
    url:"https://www.wilottery.com/lottogames/supercash.aspx",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.wilottery.com/lottogames/supercashinfo.aspx',
            path: 'td[headers="6of6 win"]',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'table#ctl00_ContentPlaceHolder1_GridView1 tbody tr:nth-child(1) td:nth-child(1)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/214',
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
    lotteryName:'doublerwi',
    regions: ['WI'],
    url:"http://www.lotteryusa.com/wisconsin/",
    data: {
      jackpot: {
        path: 'tr:contains("Super Cash") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Super Cash") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];