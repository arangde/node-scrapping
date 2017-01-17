import moment from 'moment';
const gameURL = 'https://loteries.lotoquebec.com/en/lotteries/la-quotidienne';
const secondaryURL = 'http://dk.freelotto.com/lottery_results/QC_Quebec_Lottery_Results.html';
const backupURL = 'https://www.lotterypost.com/game/491';
const jackpotURL = 'https://loteries.espacejeux.com/en/play-online/rules#Quotidienne2';
import { getData } from '../helpers/getData';

export const laquotidienne2Recent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'laquotidienne2',
    regions: ['QC'],
    url:secondaryURL,
    data: {
      numbers: {
        path: ".lottery-game:contains('La Quotidienne 2') .numbers",
        transform: async (html) => {
          let text = html.first().text();
          return text.match(/\d+/g);
        }
      },
      jackpot: {
        path: '',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: gameURL,
            path: '.lqZoneTableauDonnees .lqTableauDonnees tr:nth-child(3) td:nth-child(3)',
            transform: async (html) => {
              const text = html.eq(0).text().replace(/\D/g,'');
              return parseInt(text);
            }
          });
          return nextJackpot;
        }
      },
      date: {
        path: ".lottery-game:contains('La Quotidienne 2') .header .drawdate",
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "dddd MM/DD").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'laquotidienne2',
    regions: ['QC'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultsGrid .resultsRow .sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(var i=0; i<2; i++)
            numbers.push(html.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: "#Quotidienne2",
            transform: async (html) => {
              let jackpot = html.parents(".magnoliaComponent").find("table.lqTableauDonnees.lq4Colonnes").last().find("tr:nth-child(3) td:nth-child(3)").first().text();
              jackpot = parseInt(jackpot.replace(/\D/g, ""));
              return jackpot;
            }
          });
          return nextJackpot;
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

export const laquotidienne2Next = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'laquotidienne2',
    regions: ['QC'],
    url:gameURL,
    data: {
      jackpot: {
        path: '.lqZoneTableauDonnees .lqTableauDonnees tr:nth-child(3) td:nth-child(3)',
        transform: async (html) => {
          const text = html.eq(0).text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '#dateAffichee',
        transform: async (html) => {
          let nextDate = await getData({
            url: secondaryURL,
            path: ".lottery-game:contains('La Quotidienne 2') .nextdraw .drawdate b",
            transform: async (html) => {
              let text = html.first().text();
              return await moment(text, "MM/DD").format();
            }
          });
          return nextDate;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'laquotidienne2',
    regions: ['QC'],
    url:backupURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2) .resultsJackpot',
        transform: async (html) => {
          let nextDate = await getData({
            url: jackpotURL,
            path: "#Quotidienne2",
            transform: async (html) => {
              let jackpot = html.parents(".magnoliaComponent").find("table.lqTableauDonnees.lq4Colonnes").last().find("tr:nth-child(3) td:nth-child(3)").first().text();
              jackpot = parseInt(jackpot.replace(/\D/g, ""));
              return jackpot;
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