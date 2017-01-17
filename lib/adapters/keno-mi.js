import moment from 'moment';
const gameTitle = 'Keno';
const gameURL = 'http://www.lotteryusa.com/michigan/';
const backupURL = 'https://www.lotterypost.com/game/104';
const jackpotURL = 'https://www.michiganlottery.com/intro';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getData } from '../helpers/getData';

export const kenomiRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'kenomi',
    regions: ['MI'],
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
    lotteryName:'kenomi',
    regions: ['MI'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<22; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          let nextDate = await getData({
            url: jackpotURL,
            path: '#winning_numbers',
            transform: async (html) => {
              const htmlString = html.html();
              const pos = htmlString.indexOf('<div class="current_winning_numbers_panel keno_panel game_panel second_row shadow" id="keno_panel" name="Q">');
              const pos1 = htmlString.indexOf('<div class="current_winning_numbers_jackpot">', pos);
              const pos2 = htmlString.indexOf('</div>', pos1);
              const text = htmlString.substring(pos1, pos2).replace(/\D/g,'');
              return parseInt(text);
            }
          });
          return nextDate;
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

export const kenomiNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'kenomi',
    regions: ['MI'],
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
    lotteryName:'kenomi',
    regions: ['MI'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2) .resultsJackpot',
        transform: async (html) => {
          let nextDate = await getData({
            url: jackpotURL,
            path: '#winning_numbers',
            transform: async (html) => {
              const htmlString = html.html();
              const pos = htmlString.indexOf('<div class="current_winning_numbers_panel keno_panel game_panel second_row shadow" id="keno_panel" name="Q">');
              const pos1 = htmlString.indexOf('<div class="current_winning_numbers_jackpot">', pos);
              const pos2 = htmlString.indexOf('</div>', pos1);
              const text = htmlString.substring(pos1, pos2).replace(/\D/g,'');
              return parseInt(text);
            }
          });
          return nextDate;
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