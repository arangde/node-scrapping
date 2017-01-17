import moment from 'moment';
import { getData } from '../helpers/getData';
export const atlantic49Recent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'atlantic49',
    regions: ['AC'],
    url:"http://corp.alc.ca/lotto649.aspx?tab=2",
    data: {
      numbers: {
        path: 'table#ctl00_ctl00_contentPlaceHolderMain_contentPlaceHolderMain_tableAtlantic49 span.lotteryWN',
        transform: async (html) => {
          const numbers = /([0-9-]+)/g.exec(html.first().text())[1].split('-');
          
          return numbers;

        }
      },
      jackpot: {
        path: 'table:nth-child(2) tr:nth-child(3) td.chartContentWhiteRight',
        transform: async (html) => {
          let jackpot = parseInt(html.eq(1).text().replace(/\.[0-9]+/g,"").replace(/\D/g, ''));
          return jackpot;
        }
      },
      date: {
        path: 'td.lotteryWNBackgroundv3',
        transform: async (html) => {
          const text = /(?:For the draw of )([A-z]+ [0-9]+, [0-9]+)(?::)/g.exec(html.eq(1).text())[1];
          const date = await moment(text, "MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'atlantic49',
    regions: ['AC'],
    url:"http://www.lotterycanada.com/atlantic-49",
    data: {
      numbers: {
        path: 'td.lotcan-number strong',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ""; i++){
            numbers[i] = html.eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div.col-sm-8:nth-child(1) h4:nth-child(1)',
        transform: async (html) => {
          return parseInt(/(?:Estimated Jackpot for )(?:[A-z]+ [0-9]+, [0-9]+)(?: - )([$0-9,]+)/g.exec(html.first().text())[1].replace(/\D/g, ''));
        }
      },
      date: {
        path: 'div.col-sm-10 h1',
        transform: async (html) => {
          const text = html.text().replace(" - Atlantic 49 Winning Numbers","");
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const atlantic49Next = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'atlantic49',
    regions: ['AC'],
    url:"http://corp.alc.ca/lotto649.aspx?tab=2",
    data: {
      jackpot: {
        path: 'table:nth-child(2) tr:nth-child(3) td.chartContentWhiteRight',
        transform: async (html) => {
          let jackpot = parseInt(html.eq(1).text().replace(/\.[0-9]+/g,"").replace(/\D/g, ''));
          return jackpot;
        }
      },
      date: {
        path: 'td.lotteryWNBackgroundv3',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/234',
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
    lotteryName:'atlantic49',
    regions: ['AC'],
    url:"http://www.lotterycanada.com/atlantic-49",
    data: {
      jackpot: {
        path: 'div.col-sm-8:nth-child(1) h4:nth-child(1)',
        transform: async (html) => {
          return parseInt(/(?:Estimated Jackpot for )(?:[A-z]+ [0-9]+, [0-9]+)(?: - )([$0-9,]+)/g.exec(html.first().text())[1].replace(/\D/g, ''));
        }
      },
      date: {
        path: 'div.col-sm-8:nth-child(1) h4:nth-child(1)',
        transform: async (html) => {
          const text = /(?:Estimated Jackpot for )([A-z]+ [0-9]+, [0-9]+)(?: -)/g.exec(html.first().text())[1];
          const date = await moment(text, "MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];