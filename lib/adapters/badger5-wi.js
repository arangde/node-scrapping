import moment from 'moment';
const gameTitle = 'Badger 5';
const gameURL = 'https://www.wilottery.com/lottogames/badger5.aspx';
const backupURL = 'http://www.lotteryusa.com/wisconsin/';
import { filterGameRow } from '../helpers/lotteryUSA';
export const badger5Recent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'badger5',
    regions: ['WI'],
    url:gameURL,
    data: {
      numbers: {
        path: 'table#ctl00_ContentPlaceHolder1_FormView1 .bold',
        transform: async (html) => {
          const text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: 'span#ctl00_ContentPlaceHolder1_DataList1_ctl02_Label2',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: 'span#ctl00_ContentPlaceHolder1_DataList1_ctl02_RecDateLabel',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "ddd, MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'badger5',
    regions: ['WI'],
    url:backupURL,
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
  }
];


export const badger5Next = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'badger5',
    regions: ['WI'],
    url:gameURL,
    data: {
      jackpot: {
        path: 'span#ctl00_ContentPlaceHolder1_DataList1_ctl00_Label2',
        transform: async (html) => {
          const text = html.text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: 'span#ctl00_ContentPlaceHolder1_DataList1_ctl00_RecDateLabel',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "ddd, MMMM D, YYYY").format();
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'badger5',
    regions: ['WI'],
    url:backupURL,
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
  }
];