import moment from 'moment';
import { getData } from '../helpers/getData';
export const daily3wvRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily3wv',
    regions: ['WV'],
    url:"http://www.wvlottery.com/draw-games/historical-search/daily-3/6",
    data: {
      numbers: {
        path: 'tbody tr td:nth-child(2)',
        transform: async (html) => {
          const numbers = html.last().text().replace(/\s/g, "").split("-");
          
          return numbers;
        }
      },
      jackpot: {
        path: 'h3',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/west-virginia/',
            path: 'tr:contains("Daily 3") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tbody tr td:nth-child(1)',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'daily3wv',
    regions: ['WV'],
    url:"http://www.lotteryusa.com/west-virginia/daily-3/",
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


export const daily3wvNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily3wv',
    regions: ['WV'],
    url:"http://www.wvlottery.com/draw-games/historical-search/daily-3/6",
    data: {
      jackpot: {
        path: 'tr',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/west-virginia/',
            path: 'tr:contains("Daily 3") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tbody tr td:nth-child(1)',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/206',
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
    lotteryName:'daily3wv',
    regions: ['WV'],
    url:"http://www.lotteryusa.com/west-virginia/",
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