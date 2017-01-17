import moment from 'moment';
import { getData } from '../helpers/getData';
export const thunderballukRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'thunderballuk',
    regions: ['UK'],
    url:"https://www.national-lottery.co.uk/results/thunderball/draw-history",
    data: {
      numbers: {
        path: 'ul.list_table.list_table_presentation:contains("Draw details")',
        transform: async (html) => {
          let text = html.first().children().eq(2).text().trim().replace(/\s|(Ball numbers)/g,"")+"-"+
                      html.first().children().eq(3).text().trim().replace(/\s|(Thunderball)/g,"");
          const numbers = text.split("-");
          return numbers;
        }
      },
      jackpot: {
        path: 'ul.list_table.list_table_presentation:contains("Draw details")',
        transform: async (html) => {
          let jackpot = parseInt(html.first().children().eq(1).text().trim().replace(/\D/g,""));
          return jackpot;
        } 
      },
      date: {
        path: 'ul.list_table.list_table_presentation:contains("Draw details") li:nth-child(1)',
        transform: async (html) => {
          const text = html.first().text().trim().replace(/\n|\t|\r|(Date)/g,"");
          const date = await moment(text, "ddd DD MMM YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'thunderballuk',
    regions: ['UK'],
    url:"http://www.results.co.uk/thunderball-results",
    data: {
      numbers: {
        path: 'tr:nth-child(2) td:nth-child(2) span',
        transform: async (html) => {
          let numbers = [];
          for(let i=0; html.eq(i).text()!="";i++){
            numbers[i] = html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'tr:nth-child(2) td:nth-child(3) strong',
        transform: async (html) => {
          let jackpot = parseInt(html.first().text().replace(/\D/g,""));
          return jackpot;
        }
      },
      date: {
        path: 'a.linky',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "dddd Do MMMM YYYY").format();
          return date;
        }
      }
    }
  }
];


export const thunderballukNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'thunderballuk',
    regions: ['UK'],
    url:"https://www.national-lottery.co.uk/results/thunderball/draw-history",
    data: {
      jackpot: {
        path: 'ul.list_table.list_table_presentation:contains("Draw details")',
        transform: async (html) => {
          let jackpot = parseInt(html.first().children().eq(1).text().trim().replace(/\D/g,""));
          return jackpot;
        } 
      },
      date: {
        path: 'td',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/256',
            path: 'div.resultsNextDrawInfo p:nth-child(2)',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text, "ddd, MMM D, YYYY, h:mA").format();
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
    lotteryName:'thunderballuk',
    regions: ['UK'],
    url:"http://www.results.co.uk/thunderball-results",
    data: {
      jackpot: {
        path: 'tr:nth-child(2) td:nth-child(3) strong',
        transform: async (html) => {
          let jackpot = html.first().text().replace(/\D/g,"")
          return parseInt(jackpot);
        }
      },
      date: {
        path: 'time',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/256',
            path: 'div.resultsNextDrawInfo p:nth-child(2)',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text, "ddd, MMM D, YYYY, h:mA").format();
              return date;
            }
          });
          return nextDate;
        }
      }
    }
  }
];