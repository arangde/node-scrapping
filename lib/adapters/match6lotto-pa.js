import moment from 'moment';
const gameTitle = 'Match 6';
const gameURL = 'http://www.lotteryusa.com/pennsylvania/';
const backupURL = 'https://www.lotterypost.com/game/169';
const nextURL = 'https://www.palottery.state.pa.us/Games/Match-6.aspx';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getJackpot, getNextJackpot } from '../helpers/lotteryPost';

export const match6lottoRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'match6lotto',
    regions: ['PA'],
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
    lotteryName:'match6lotto',
    regions: ['PA'],
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

export const match6lottoNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'match6lotto',
    regions: ['PA'],
    url:nextURL,
    data: {
      jackpot: {
        path: '#jackpotDraw .info-area .jackpot-cols strong',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '#jackpotDraw .info-area .date',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "MM-DD-YY").format();
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'match6lotto',
    regions: ['PA'],
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