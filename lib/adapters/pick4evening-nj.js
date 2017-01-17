import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick4eveningnjRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4eveningnj',
    regions: ['NJ'],
    url:"https://www.lotterypost.com/game/137",
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
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.state.nj.us/lottery/mobile/pick4-odds.shtml',
            path: '.odds-tbl tr:contains("Straight") td:nth-child(5)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\..+/g,"").replace(/\D/g,""));
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
          const date = await moment(text, "dddd, MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4eveningnj',
    regions: ['NJ'],
    url:"http://www.lotteryusa.com/new-jersey/pick-4/",
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
            url: 'http://www.lottery.com/news/official_rules.cfm/GameID/NJ4M',
            path: 'td:nth-child(3) tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) tr:contains("Straight") td:contains("$")',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\..+/g,"").replace(/\D/g,""));
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


export const pick4eveningnjNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4eveningnj',
    regions: ['NJ'],
    url:"https://www.lotterypost.com/game/137",
    data: {
      jackpot: {
       path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.state.nj.us/lottery/mobile/pick4-odds.shtml',
            path: '.odds-tbl tr:contains("Straight") td:nth-child(5)',
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
          const text = html.first().text().trim();
          const date = await moment(text, "ddd, MMM D, YYYY, h:mA").format();
          return date;
        }
    }
}
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4eveningnj',
    regions: ['NJ'],
    url:"http://www.lotteryusa.com/new-jersey/",
    data: {
      jackpot: {
        path: 'tr:contains("Pick 4") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lottery.com/news/official_rules.cfm/GameID/NJ4M',
            path: 'td:nth-child(3) tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) tr:contains("Straight") td:contains("$")',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\..+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Pick 4") span.next-draw-date',
        transform: async (html) => {
          let text = html.last().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];
