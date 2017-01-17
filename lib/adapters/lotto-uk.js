import moment from 'moment';
const gameURL = 'https://www.national-lottery.co.uk/results/lotto/draw-history';
const backupURL = 'https://www.lotterypost.com/game/253';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getJackpot, getNextJackpot, getFloatValue } from '../helpers/lotteryPost';

export const lottoukRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lottouk',
    regions: ['UK'],
    url:gameURL,
    data: {
      numbers: {
        path: '#draw_history_lotto >ul >li:nth-child(2) >ul:nth-child(2)',
        transform: async (html) => {
          let text = html.find('>li:nth-child(3) >.table_cell_padding >.table_cell_block').text();
          const numbers = text.match(/\d+/g);

          text = html.find('>li:nth-child(4) >.table_cell_padding >.table_cell_block').text();
          const bonus = text.match(/\d+/g);

          for(var i=0; i<bonus.length; i++) {
            numbers.push(bonus[i]);
          }
          return numbers;
        }
      },
      jackpot: {
        path: '#draw_history_lotto >ul >li:nth-child(2) >ul:nth-child(2) >li:nth-child(2) >.table_cell_padding >.table_cell_block',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '#draw_history_lotto >ul >li:nth-child(2) >ul:nth-child(2) >li:first-child >.table_cell_padding >.table_cell_block',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "ddd DD MMM YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'lottouk',
    regions: ['UK'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<7; i++)
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

export const lottoukNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lottouk',
    regions: ['UK'],
    url:gameURL + '/draw-details/2170',
    data: {
      jackpot: {
        path: '.playslip_header_content .amount',
        transform: async (html) => {
          return getFloatValue(html.text());
        }
      },
      date: {
        path: '.playslip_header_content .headline',
        transform: async (html) => {
          const text = html.text().replace("This ", "");
          return await moment().day(text).format("YYYY-MM-DDT00:00:00Z");
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'lottouk',
    regions: ['UK'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',// .resultsJackpot .jackpotnative
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