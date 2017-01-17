import moment from 'moment';
import { getData } from '../helpers/getData';
export const guaranteedmillionacRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'guaranteedmillionac',
    regions: ['AC'],
    url:"http://corp.alc.ca/lotto649.aspx?tab=2",
    data: {
      numbers: {
        path: 'div#ctl00_ctl00_contentPlaceHolderMain_contentPlaceHolderMain_GuaranteedWinningNumberPanel span.lotteryWN',
        transform: async (html) => {
          const numbers = [];
          let text = html.first().text().trim().replace(/\D/g,"").split("");
          for(let i=0; i<text.length;i++){
            numbers.push(text[i]);
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'a[name=GuaranteedDraws] > table:nth-child(1) td.chartContentGrey',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'td.lotteryWNBackgroundv3',
        transform: async (html) => {
          const text = /(?:For the draw of )([A-z]+ [0-9]+, [0-9]+)(?::)/g.exec(html.first().text())[1];
          const date = await moment(text, "MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'guaranteedmillionac',
    regions: ['AC'],
    url:"http://www.lottostrategies.com/script/winning_of_past_month/100/205/AC/Atlantic-Canada-AC-Guaranteed-Million-Draw-lottery-results.html",
    data: {
      numbers: {
        path: 'td > b',
        transform: async (html) => {
          const numbers = [];
          const textString = html.eq(4).text().replace(/\D/g,"");
          let text = textString.split("");
          for(let i=0; i<text.length;i++){
            numbers.push(text[i]);
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.olg.ca/lotteries/games/howtoplay.do?game=lotto649#guaranteedprize',
            path: '.guaranteedPrizeTableContainer tbody tr:nth-child(1) td:nth-child(2)',
            transform: async (html) => {
              let text = parseInt(html.first().text().replace(/\D/g,""));
              return text;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'td code',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "ddd MM/DD/YY").format();
          return date;
        }
      }
    }
  }
];


export const guaranteedmillionacNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'guaranteedmillionac',
    regions: ['AC'],
    url:"http://corp.alc.ca/lotto649.aspx?tab=2",
    data: {
      jackpot: {
        path: 'a[name=GuaranteedDraws] > table:nth-child(1) td.chartContentGrey',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'td.lotteryWNBackgroundv3',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/449',
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
    lotteryName:'guaranteedmillionac',
    regions: ['AC'],
    url:"http://www.lottostrategies.com/script/winning_of_past_month/100/205/AC/Atlantic-Canada-AC-Guaranteed-Million-Draw-lottery-results.html",
    data: {
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.olg.ca/lotteries/games/howtoplay.do?game=lotto649#guaranteedprize',
            path: '.guaranteedPrizeTableContainer tbody tr:nth-child(1) td:nth-child(2)',
            transform: async (html) => {
              let text = parseInt(html.first().text().replace(/\D/g,""));
              return text;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'td code',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotterycanada.com/lotto-649',
            path: 'div.col-sm-8 > h4',
            transform: async (html) => {
              let text = /(?:Estimated Jackpot for )(.+)(?: - )/g.exec(html.first().text().trim())[1];
              let date = await moment(text, "MMMM D, YYYY").format();
              return date;
            }
          });
          return jackpot;
        }
      }
    }
  }
];