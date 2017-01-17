import moment from 'moment';
const gameTitle = 'Keno Atlantic';
const gameURL = 'http://www.lotterycanada.com/atlantic-keno';
const backupURL = 'https://www.lotterypost.com/game/231';
const jackpotURL = 'http://corp.alc.ca/KenoAtlantic.aspx?tab=2';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getData } from '../helpers/getData';

export const kenoatlanticRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'kenoatlantic',
    regions: ['AC'],
    url:gameURL,
    data: {
      numbers: {
        path: '.panel-body .well .row .col-xs-12.text-center h4',
        transform: async (html) => {
          const text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: 'strong:contains("10 Numbers")',
        transform: async (html) => {
          const text = html.parents("tr").find("td:nth-child(3)").text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.panel-title .lottery-name .draw-date.small',
        transform: async (html) => {
          const text = html.text().replace("- ", "");
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'kenoatlantic',
    regions: ['AC'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<20; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          let nextDate = await getData({
            url: jackpotURL,
            path: '.chartPadding table:first-child tr:nth-child(3) td:last-child',
            transform: async (html) => {
              const text = html.text().replace(/\D/g,'');
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

export const kenoatlanticNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'kenoatlantic',
    regions: ['AC'],
    url:gameURL,
    data: {
      jackpot: {
        path: 'strong:contains("10 Numbers")',
        transform: async (html) => {
          const text = html.parents("tr").find("td:nth-child(3)").text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.panel-footer .col-xs-8 span strong',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'kenoatlantic',
    regions: ['AC'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2) .resultsJackpot',
        transform: async (html) => {
          let nextDate = await getData({
            url: jackpotURL,
            path: '.chartPadding table:first-child tr:nth-child(3) td:last-child',
            transform: async (html) => {
              const text = html.text().replace(/\D/g,'');
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