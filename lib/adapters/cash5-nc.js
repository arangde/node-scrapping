import moment from 'moment';
const gameTitle = 'Cash 5';
const gameURL = 'http://www.lotteryusa.com/north-carolina/';
import { filterGameRow } from '../helpers/lotteryUSA';

export const cash5ncRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash5nc',
    regions: ['NC'],
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
    lotteryName:'cash5nc',
    regions: ['NC'],
    url:'http://www.nc-educationlottery.org/cash5_past.aspx',
    data: {
      numbers: {
        path: '.datatable tbody tr:first-child td:nth-child(2)',
        transform: async (html) => {
          const text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: '.datatable tbody tr:first-child td:nth-child(3)',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.datatable tbody tr:first-child td:nth-child(1)',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const cash5ncNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'cash5nc',
    regions: ['NC'],
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
    lotteryName:'cash5nc',
    regions: ['NC'],
    url:'http://www.nc-educationlottery.org/cash5.aspx',
    data: {
      jackpot: {
        path: '#ctl00_MainContent_lblCash5EstTopPrize',
        transform: async (html) => {
          const text = html.text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '#ctl00_MainContent_lblCash5NextDrawDate',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "dddd, MMM DD, YYYY").format();
        }
      }
    }
  }
];