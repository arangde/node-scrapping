import moment from 'moment'; 
import { getJackpot, getNextJackpot } from '../helpers/lotteryPost';
import { getData } from '../helpers/getData';
export const wildmoneyriRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'wildmoneyri',
    regions: ['RI'],
    url:"http://www.rilot.com/wildmoney_search.asp?search=true&dtype=display20",
    data: {
      numbers: {
        path: 'table td table td table:nth-of-type(3) tr:nth-child(3)',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.first().children().eq(1).children().eq(i).attr("src")!=undefined;i++){
            numbers[i] = /(?:\/Images\/Winning_Numbers\/small\/white\/)([0-9]+)/g.exec(html.first().children().eq(1).children().eq(i).attr("src"))[1];
          }
          numbers.push(/(?:\/Images\/Winning_Numbers\/small\/yellow\/)([0-9]+)/g.exec(html.first().children().eq(2).children().first().attr("src"))[1]);
          return numbers;
        }
      },
      jackpot: {
        path: 'table td table td table:nth-of-type(3) tr:nth-child(3) td:nth-child(4)',
        transform: async (html) => {
          let jackpot = parseInt(html.first().text().replace(/\D/g,""));
          return jackpot;
        }
      },
      date: {
        path: 'table td table td table:nth-of-type(3) tr:nth-child(3) td:nth-child(1)',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "M/D/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'wildmoneyri',
    regions: ['RI'],
    url:"http://www.lotteryusa.com/rhode-island/wild-money/",
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


export const wildmoneyriNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'wildmoneyri',
    regions: ['RI'],
    url:"http://www.rilot.com/wildmoney_search.asp?search=true&dtype=display20",
    data: {
      jackpot: {
       path: 'tr.p3pBody:nth-child(3) td:nth-child(4)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lotterypost.com/game/172',
            path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
            transform: async (html) => {
              let jackpot = getNextJackpot(html);
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'table#cpMain_Left_ctl00_GridView1 tr:nth-child(2) td:nth-child(1)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/172',
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
    lotteryName:'wildmoneyri',
    regions: ['RI'],
    url:"http://www.lotteryusa.com/rhode-island/wild-money/",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
            let jackpot = await getData({
            url: 'http://www.lotteryusa.com/rhode-island/',
            path: 'tr:contains("Wild Money") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = html.first().clone().children().remove().end().text().trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'time',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/rhode-island/',
            path: 'tr:contains("Wild Money") span.next-draw-date',
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
