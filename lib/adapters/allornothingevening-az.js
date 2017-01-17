import moment from 'moment';
import { getData } from '../helpers/getData';
export const allornothingeveningazRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'allornothingeveningaz',
    regions: ['AZ'],
    url:"https://www.arizonalottery.com/en/play/draw-games/all-or-nothing",
    data: {
      numbers: {
        path: 'div.sequence-2 > div.small-2',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != "" ; i++){
            numbers[i]=html.eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'h2.price',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ''));
        }
      },
      date: {
        path: '.draw_date.sequence-2',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "DDDD, MMMM DD").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'allornothingeveningaz',
    regions: ['AZ'],
    url:"https://www.lotterypost.com/game/466",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().trim().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'ins',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/arizona/',
            path: 'tr:contains("All or Nothing") span.jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.resultsDrawDate',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "dddd, MMMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const allornothingeveningazNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'allornothingeveningaz',
    regions: ['AZ'],
    url:"https://www.arizonalottery.com/en/play/draw-games/all-or-nothing",
    data: {
      jackpot: {
        path: 'h2.price',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ''));
        }
      },
      date: {
        path: 'div.next-jackpot span',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "DDDD, MMMM DD").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'allornothingeveningaz',
    regions: ['AZ'],
    url:"https://www.lotterypost.com/game/466",
    data: {
      jackpot: {
        path: 'ins',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/arizona/',
            path: 'tr:contains("All or Nothing") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.resultsNextDrawInfo p',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];