import moment from 'moment';
const gameTitle = 'Hot Lotto';
const gameURL = 'http://www.lotteryusa.com/district-of-columbia/';
const backupURL = 'https://www.lotterypost.com/hotlotto';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getJackpot, getNextJackpot } from '../helpers/lotteryPost';

export const hotlottoRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'hotlotto',
    regions: ['DC', 'DE', 'IA', 'ID', 'KS', 'ME', 'MN', 'MT', 'ND', 'NH', 'NM', 'OK', 'SD', 'TN', 'VT', 'WV'],
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
          const row = filterGameRow(gameTitle, html);
          const text = row.find('.jackpot-amount').text().replace(/\D/g,'');
          return parseInt(text);
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
    lotteryName:'hotlotto',
    regions: ['DC', 'DE', 'IA', 'ID', 'KS', 'ME', 'MN', 'MT', 'ND', 'NH', 'NM', 'OK', 'SD', 'TN', 'VT', 'WV'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<6; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          return getJackpot(html);
        }
      },
      date: {
        path: '.resultsGrid .resultsDrawDate',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "dddd, MMMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];

export const hotlottoNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'hotlotto',
    regions: ['DC', 'DE', 'IA', 'ID', 'KS', 'ME', 'MN', 'MT', 'ND', 'NH', 'NM', 'OK', 'SD', 'TN', 'VT', 'WV'],
    url:gameURL,
    data: {
      jackpot: {
        path: '.state-results',
        transform: async (html) => {
          const row = filterGameRow(gameTitle, html);
          const text = row.find('.next-jackpot-amount').text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
          return parseInt(text);
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
    lotteryName:'hotlotto',
    regions: ['DC', 'DE', 'IA', 'ID', 'KS', 'ME', 'MN', 'MT', 'ND', 'NH', 'NM', 'OK', 'SD', 'TN', 'VT', 'WV'],
    url:backupURL,
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
  }
];