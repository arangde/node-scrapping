import moment from 'moment';
const gameTitle = 'Road Runner Cash';
const gameURL = 'http://www.lotteryusa.com/new-mexico/';
const backupURL = 'https://www.lotterypost.com/game/141';
import { filterGameRow } from '../helpers/lotteryUSA';

export const roadrunnercashRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'roadrunnercash',
    regions: ['NM'],
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
    lotteryName:'roadrunnercash',
    regions: ['NM'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<5; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          const jackpot = parseInt(html.find(".resultsJackpot").text().replace(/\D/g,''));
          if(html.find(".jackpotchange ins").hasClass("sprite-jackpot-down-16") || html.find(".jackpotchange ins").hasClass("sprite-jackpot-up-16")) {
            const jackpotChange = parseInt(html.find(".jackpotchange").text().replace(/\D/g, ''));
            const direction = html.find(".jackpotchange ins").hasClass("sprite-jackpot-down-16") ? -1 : 1;
            return jackpot - (jackpotChange * direction);
          }
          else {
            return jackpot;
          }
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


export const roadrunnercashNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'roadrunnercash',
    regions: ['NM'],
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
    lotteryName:'roadrunnercash',
    regions: ['NM'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2) .resultsJackpot',
        transform: async (html) => {
          const text = html.text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
          return parseInt(text);
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