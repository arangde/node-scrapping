import moment from 'moment';
const gameTitle = 'Lotto';
const gameURL = 'https://www.lottery.ie/prizes-and-results/?game=lotto';
const backupURL = 'https://irish.national-lottery.com/irish-lotto/results';
const nextURL = 'https://www.lotterypost.com/game/293';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getNextJackpot } from '../helpers/lotteryPost';

export const lottoieRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lottoie',
    regions: ['IE'],
    url:gameURL,
    data: {
      numbers: {
        path: '.result-block',
        transform: async (html) => {
          const row = html.eq(0);
          const regex = /\d+/g;
          const numbers = row.find(".rb-col-2 .lotto-winning-numbers").eq(0).text().match(regex);
          const bonus = row.find(".rb-col-3 .lotto-bonus").text().match(regex);
          return numbers.concat(bonus);
        }
      },
      jackpot: {
        path: '.result-block',
        transform: async (html) => {
          const row = html.eq(0);
          const text = row.find('.rb-col-4 .jackpot-amount').text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.date-heading.LotteryRegular',
        transform: async (html) => {
          const text = html.eq(0).text();
          const date = await moment(text, "DD MMMM YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'lottoie',
    regions: ['IE'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsOuter.full .balls',
        transform: async (html) => {
          const regex = /\d+/g;
          return html.text().match(regex);
        }
      },
      jackpot: {
        path: '.resultsOuter.full .jackpotAmt',
        transform: async (html) => {
          const jackpot = parseInt(html.text().replace(/\D/g,''));
          return jackpot;
        }
      },
      date: {
        path: '.resultsOuter.full .resultsHeader',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "dddd Do MMMM YYYY").format();
          return date;
        }
      }
    }
  }
];

export const lottoieNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lottoie',
    regions: ['IE'],
    url: nextURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          return getNextJackpot(html);
        }
      },
      date: {
        path: '.resultsNextDrawInfoUnit:first-child .resultsNextDrawInfo label + p',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "ddd, MMM DD, YYYY").format();
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'lottoie',
    regions: ['IE'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.jackpotArea .jackpotTxt',
        transform: async (html) => {
          const text = html.text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.jackpotArea strong',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "dddd Do MMMM YYYY").format();
        }
      }
    }
  }
];