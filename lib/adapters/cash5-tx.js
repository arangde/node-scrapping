import moment from 'moment';
const gameTitle = 'Cash 5';
const gameURL = 'http://www.lotteryusa.com/texas/';
import { filterGameRow } from '../helpers/lotteryUSA';

export const cash5txRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash5tx',
    regions: ['TX'],
    url:gameURL,
    data: {
      numbers: {
        path: '.state-results',
        transform: async (html) => {
          const row = filterGameRow(gameTitle, html);
          const text = row.find('.result .draw-result').text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: '.state-results',
        transform: async (html) => {
          return 0;
        }
      },
      date: {
        path: '.state-results',
        transform: async (html) => {
          const row = filterGameRow(gameTitle, html);
          const text = row.find('.date').text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'cash5tx',
    regions: ['TX'],
    url:'http://www.txlottery.org/export/sites/lottery/Games/Cash_Five/index.html',
    data: {
      numbers: {
        path: '#content .winningNumberBalls',
        transform: async (html) => {
          const text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: '#content table tbody tr:nth-child(1) td:nth-child(2)',
        transform: async (html) => {
          return 0;
        }
      },
      date: {
        path: '#content h3.sans',
        transform: async (html) => {
          const text = html.text().replace("Cash Five Winning Numbers for ", "").replace(" are:", "");
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  }
];


export const cash5txNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash5tx',
    regions: ['TX'],
    url:gameURL,
    data: {
      jackpot: {
        path: '.state-results',
        transform: async (html) => {
          return 0;
        }
      },
      date: {
        path: '.state-results',
            transform: async (html) => {
          const row = filterGameRow(gameTitle, html);
          const text = row.find('.next-draw-date').text();
          return await moment(text, "ddd, MMM DD, YYYY").format();
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'cash5tx',
    regions: ['TX'],
    url:'https://www.lotterypost.com/game/182',
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2) .resultsJackpot',
        transform: async (html) => {
          return 0;
        }
      },
      date: {
        path: '.resultsNextDrawInfoUnit:first-child .resultsNextDrawInfo label + p',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "ddd, MMM DD, YYYY, H:m a").format();
        }
      }
    }
  }
];