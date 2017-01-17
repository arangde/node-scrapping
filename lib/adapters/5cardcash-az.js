import moment from 'moment';
import { getData } from '../helpers/getData';
export const fivecardcashazRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'5cardcashaz',
    regions: ['AZ'],
    url:"https://www.arizonalottery.com/en/play/draw-games/5-card-cash",
    data: {
      numbers: {
        path: 'div.winning_card',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i< 5; i++){
            numbers.push(html.eq(i).text());
          };
          return numbers;

        }
      },
      jackpot: {
        path: 'tr.row-detail.odd:nth-of-type(2) th.white:nth-of-type(1)',
        transform: async (html) => {
          let jackpot = parseInt(html.first().text().replace(/\D/g,""));
          return jackpot;
        }
      },
      date: {
        path: 'div.push-bottom > div > span.regular',
        transform: async (html) => {
          const text = html.text().replace(/(\s)/g,'');
          const date = await moment(text, "dddd, MMMM DD").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'5cardcashaz',
    regions: ['AZ'],
    url:"http://www.lotteryusa.com/arizona/5-card-cash/",
    data: {
      numbers: {
        path: 'span.string-results',
        transform: async (html) => {
          const numbers = html.first().text().toUpperCase().split(', ');
          return numbers;
        }
      },
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ''));
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


export const fivecardcashazNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'5cardcashaz',
    regions: ['AZ'],
    url:"https://www.arizonalottery.com/en/play/draw-games/5-card-cash",
    data: {
      jackpot: {
        path: 'h2.price',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ''));
        }
      },
      date: {
        path: 'div.next-jackpot > span.regular',
        transform: async (html) => {         
          const text = html.first().text().replace(/(\t|\n| {2,})/g,'');
          const date = await moment(text, "dddd, MMMM DD").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'5cardcashaz',
    regions: ['AZ'],
    url:"http://www.lotteryusa.com/arizona/",
    data: {
      jackpot: {
        path: 'tr:contains("5 Card Cash") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("5 Card Cash") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];