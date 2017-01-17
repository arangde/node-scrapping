import moment from 'moment';
import { getData } from '../helpers/getData';
export const daily3mnRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily3mn',
    regions: ['MN'],
    url:"https://www.mnlottery.com/games/lotto_games/daily_3/winning_s/",
    data: {
      numbers: {
        path: 'div.ticket_results_result:nth-child(1) div.ticket_results_group_number > div.ticket_results_group_number',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.first().children().eq(i).text()!="";i++){
              numbers[i] = html.first().children().eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'h3',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.mnlottery.com/games/lotto_games/daily_3/',
            path: 'tr:contains("Straight") td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'h3.ticket_results_date',
        transform: async (html) => {
          const text = html.first().text().replace(/ - [A-Za-z]+/g, '');
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'daily3mn',
    regions: ['MN'],
    url:"http://www.lotteryusa.com/minnesota/daily-3/",
    data: {
      numbers: {
        path: 'ul.draw-result',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.first().children().eq(i).text() != ''; i++){
            numbers[i]=html.first().children().eq(i).text().trim().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g , ''));
        }
      },
      date: {
        path: 'time',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const daily3mnNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily3mn',
    regions: ['MN'],
    url:"https://www.mnlottery.com/games/lotto_games/daily_3/winning_s/",
    data: {
      jackpot: {
        path: 'tr',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.mnlottery.com/games/lotto_games/daily_3/',
            path: 'tr:contains("Straight") td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'h3.ticket_results_date',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/110',
            path: 'div.resultsNextDrawInfo p',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text, "ddd, MMM DD, YYYY, h:mA").format();
              return date;
            }
          });
          return nextDate;
        }
    }
  }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'daily3mn',
    regions: ['MN'],
    url:"http://www.lotteryusa.com/minnesota/",
    data: {
      jackpot: {
        path: 'tr:contains("Daily 3") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Daily 3") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];