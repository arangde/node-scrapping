import moment from 'moment';
const gameURL = 'http://corp.alc.ca/Bucko.aspx?tab=2';
const backupURL = 'http://m.alc.ca/game.jsp?id=BUCKO';
const nextDateURL = 'https://www.lotterypost.com/game/298';
import { getData } from '../helpers/getData';
export const buckoRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'bucko',
    regions: ['AC'],
    url:gameURL,
    data: {
      numbers: {
        path: '.lotteryWN',
        transform: async (html) => {
          const text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: '.oneColumnContentArea table table table:first-child tr:nth-child(3) td:last-child',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.lotteryWNBackground',
        transform: async (html) => {
          html.find("br").remove();
          html.find("img").remove();
          html.find("span").remove();
          const text = html.text().replace("For the draw of ", "");
          const date = await moment(text, "MMMM D, YYYY:").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'bucko',
    regions: ['AC'],
    url:backupURL,
    data: {
      numbers: {
        path: '.nums',
        transform: async (html) => {
          const text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: '#payout table',
        transform: async (html) => {
          const text = html.first().find("tbody tr:first-child td:last-child").text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '#winningNumbersDate',
        transform: async (html) => {
          const text = html.val();
          const date = await moment(text, "YYYY-MM-DD").format();
          return date;
        }
      }
    }
  }
];

export const buckoNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'bucko',
    regions: ['AC'],
    url:gameURL,
    data: {
      date: {
        path: '#jackpot .content > h2:first-child',
        transform: async (html) => {
          let nextDate = await getData({
            url: nextDateURL,
            path: '.resultsNextDrawInfoUnit:first-child .resultsNextDrawInfo label + p',
            transform: async (html) => {
              const text = html.text();
              return await moment(text, "ddd, MMM DD, YYYY").format();
            }
          });
          return nextDate;
        }
      },
      jackpot: {
        path: '.oneColumnContentArea table table table:first-child tr:nth-child(3) td:last-child',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'bucko',
    regions: ['AC'],
    url:backupURL,
    data: {
      date: {
        path: '#jackpot .content > h2:first-child',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "Jackpot: DD MMM YYYY").format();
        }
      },
      jackpot: {
        path: '#jackpot .content > h2.emph',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      }
    }
  }
];