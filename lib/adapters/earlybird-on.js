import moment from 'moment';
import { getData } from '../helpers/getData';
export const earlybirdonRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'earlybirdon',
    regions: ['ON'],
    url:"http://www.olg.ca/lotteries/games/howtoplay.do?game=lottario",
    data: {
      numbers: {
        path: 'div#winNumContent div:nth-child(5) div',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != "" ; i++){
            numbers[i] = html.eq(i).text().trim().replace(/\D/g,"");
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'td.earlybird:nth-child(2)',
        transform: async (html) => {
          return parseInt(html.first().text().trim().replace(/\D/g,""));
        }
      },
      date: {
        path: 'div#winNumContent p:nth-child(2)',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "DD-MMM-YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'earlybirdon',
    regions: ['ON'],
    url:"https://www.lotterypost.com/game/275",
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
            url: 'http://www.olg.ca/lotteries/games/howtoplay.do?game=lottario',
            path: 'td.earlybird:nth-child(2)',
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


export const earlybirdonNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'earlybirdon',
    regions: ['ON'],
    url:"http://www.olg.ca/lotteries/games/howtoplay.do?game=lottario",
    data: {
      jackpot: {
        path: 'td.earlybird:nth-child(2)',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g,""));
        }
      },
      date: {
        path: 'div#jackpotContent p',
        transform: async (html) => {
          const text = html.first().text().trim().replace("The next Jackpot is ","2016 ");
          const date = await moment(text, "YYYY ddd, MMM DD").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'earlybirdon',
    regions: ['ON'],
    url:"https://www.lotterypost.com/game/275",
    data: {
      jackpot: {
        path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.olg.ca/lotteries/games/howtoplay.do?game=lottario',
            path: 'td.earlybird:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot; 
        }
      },
      date: {
        path: 'div.resultsNextDrawInfo p',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];