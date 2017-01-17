import moment from 'moment'; 
import { getData } from '../helpers/getData';
export const western649wcRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'western649wc',
    regions: ['WC'],
    url:"https://www.wclc.com/winning-numbers/western-649-extra.htm",
    data: {
      numbers: {
        path: 'ul.pastWinNumbers',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.first().children().eq(i).text()!="";i++){
            numbers[i] = html.first().children().eq(i).text().trim().replace(/\D/g,"");
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'tr.p3pBody:nth-child(3) td:nth-child(4)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotterycanada.com/western-649',
            path: 'div.panel-body table:nth-child(1) tr:nth-child(1) td:nth-child(3)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\$|\.00/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.pastWinNumDate h4',
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
    lotteryName:'western649wc',
    regions: ['WC'],
    url:"http://www.lottostrategies.com/script/winning_of_past_month/100/WC1/WC/Western-Canada-WC-Western-49-lottery-results.html",
    data: {
      numbers: {
        path: 'div.datagrid tr:nth-child(1) td:nth-child(2) b',
        transform: async (html) => {
          const numbers = html.first().text().trim().replace(/\s/g,"").split("-");
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
            let jackpot = await getData({
            url: 'http://www.lotterycanada.com/western-649',
            path: 'div.panel-body table:nth-child(1) tr:nth-child(1) td:nth-child(3)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\$|\.00/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'td code',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd MM/DD/YY").format();
          return date;
        }
      }
    }
  }
];


export const western649wcNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'western649wc',
    regions: ['WC'],
    url:"https://www.wclc.com/winning-numbers/western-649-extra.htm",
    data: {
      jackpot: {
       path: 'tr.p3pBody:nth-child(3) td:nth-child(4)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotterycanada.com/western-649',
            path: 'div.panel-body table:nth-child(1) tr:nth-child(1) td:nth-child(3)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\$|\.00/g,"").replace(/\D/g,""));
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
            url: 'http://www.lotterycanada.com/western-649',
            path: 'div.col-sm-8 h4',
            transform: async (html) => {
              let text = /(?:Estimated Jackpot for )(.+)(?: - )/g.exec(html.first().text().trim())[1];
              let date = await moment(text, "MMMM D, YYYY").format();
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
    lotteryName:'western649wc',
    regions: ['WC'],
    url:"http://www.lottostrategies.com/script/winning_of_past_month/100/WC1/WC/Western-Canada-WC-Western-49-lottery-results.html",
    data: {
      jackpot: {
       path: 'tr.p3pBody:nth-child(3) td:nth-child(4)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotterycanada.com/western-649',
            path: 'div.panel-body table:nth-child(1) tr:nth-child(1) td:nth-child(3)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\$|\.00/g,"").replace(/\D/g,""));
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
            url: 'http://www.lotterycanada.com/western-649',
            path: 'div.col-sm-8 h4',
            transform: async (html) => {
              let text = /(?:Estimated Jackpot for )(.+)(?: - )/g.exec(html.first().text().trim())[1];
              let date = await moment(text, "MMMM D, YYYY").format();
              return date;
            }
          });
          return nextDate;
        }
      }
    }
  }
];