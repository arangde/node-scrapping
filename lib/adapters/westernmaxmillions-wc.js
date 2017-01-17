import moment from 'moment'; 
import { getData } from '../helpers/getData';
export const westernmaxmillionswcRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'westernmaxmillionswc',
    regions: ['WC'],
    url:"https://www.wclc.com/winning-numbers/western-max-extra.htm",
    data: {
      numbers: {
        path: 'div.pastWinNum:nth-child(1) div.pastWinNumWMGroup ul.pastWinNumbers',
        transform: async (html) => {
          let numbers = [];
          for(var i=0; html.eq(i).text()!="";i++){
            numbers[i] = [];
            for(var j=0; html.eq(i).children().eq(j).text()!="";j++){
              numbers[i][j]= html.eq(i).children().eq(j).text();
            }
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'tr.p3pBody:nth-child(3) td:nth-child(4)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotterycanada.com/western-max',
            path: 'div.panel-body table:nth-child(1) tbody tr:nth-child(1) td:nth-child(3)',
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
    lotteryName:'westernmaxmillionswc',
    regions: ['WC'],
    url:"http://www.lotterycanada.com/western-max",
    data: {
      numbers: {
        path: 'div#mod-TL3 div.panel-body table.table-striped tbody tr td:nth-child(1)',
        transform: async (html) => {
          let numbers = [];
          for(var i=0; html.eq(i).text()!="";i++){
            numbers[i] = [];
            for(var j=0; html.eq(i).children().eq(j).text()!="";j++){
              numbers[i][j]= html.eq(i).children().eq(j).text();
            }
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
            let jackpot = await getData({
            url: 'http://www.lotterycanada.com/western-max',
            path: 'div.panel-body table:nth-child(1) tbody tr:nth-child(1) td:nth-child(3)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\$|\.00/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.col-sm-10 h1',
        transform: async (html) => {
          const text = html.first().text().replace(" - Western Max Winning Numbers");
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const westernmaxmillionswcNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'westernmaxmillionswc',
    regions: ['WC'],
    url:"https://www.wclc.com/winning-numbers/western-max-extra.htm",
    data: {
      jackpot: {
       path: 'tr.p3pBody:nth-child(3) td:nth-child(4)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotterycanada.com/western-max',
            path: 'div.panel-body table:nth-child(1) tbody tr:nth-child(1) td:nth-child(3)',
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
            url: 'http://www.lotterycanada.com/western-max',
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
    lotteryName:'westernmaxmillionswc',
    regions: ['WC'],
    url:"http://www.lotterycanada.com/western-max",
    data: {
      jackpot: {
       path: 'div.panel-body table:nth-child(1) tbody tr:nth-child(1) td:nth-child(3)',
        transform: async (html) => {
          let jackpot = parseInt(html.first().text().trim().replace(/\$|\.00/g,"").replace(/\D/g,""));    
          return jackpot;
        }
      },
      date: {
        path: 'div.col-sm-8 h4',
        transform: async (html) => {
              let text = /(?:Estimated Jackpot for )(.+)(?: - )/g.exec(html.first().text().trim())[1];
              let date = await moment(text, "MMMM D, YYYY").format();
              
          return date;
        }
      }
    }
  }
];