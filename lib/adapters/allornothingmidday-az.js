import moment from 'moment';
import { getData } from '../helpers/getData';
export const allornothingmiddayazRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'allornothingmiddayaz',
    regions: ['AZ'],
    url:"https://www.arizonalottery.com/en/play/draw-games/all-or-nothing",
    data: {
      numbers: {
        path: 'div.sequence-1 > div.small-2',
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
        path: '.draw_date.sequence-1',
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
    lotteryName:'allornothingmiddayaz',
    regions: ['AZ'],
    url:"http://www.lotteryusa.com/arizona/morning-all-or-nothing/",
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


export const allornothingmiddayazNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'allornothingmiddayaz',
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
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/465',
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
    lotteryName:'allornothingmiddayaz',
    regions: ['AZ'],
    url:"http://www.lotteryusa.com/arizona/",
    data: {
      jackpot: {
        path: 'tr:contains("Morning All or Nothing") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Morning All or Nothing") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];