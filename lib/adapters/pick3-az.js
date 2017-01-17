import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3azRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3az',
    regions: ['AZ'],
    url:"https://www.arizonalottery.com/en/play/draw-games/pick-3",
    data: {
      numbers: {
        path: 'div.winning_numbers:nth-child(1) h2',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!= "" ; i++){
            numbers[i]=html.eq(i).text().trim();
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
        path: 'span.regular',
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
    lotteryName:'pick3az',
    regions: ['AZ'],
    url:"http://www.lotteryusa.com/arizona/pick-3/",
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


export const pick3azNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3az',
    regions: ['AZ'],
    url:"https://www.arizonalottery.com/en/play/draw-games/pick-3",
    data: {
      jackpot: {
        path: 'h2.price',
        transform: async (html) => {
          if(html.first().text().indexOf("Million")>=0){
            return parseInt(parseFloat(html.first().text().replace(" Million","").replace("$",""))*1000000);
          } else{
            return parseInt(html.first().text().replace(/\D/g,""));
          }
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
    lotteryName:'pick3az',
    regions: ['AZ'],
    url:"http://www.lotteryusa.com/arizona/pick-3/",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/arizona/',
            path: 'tr:contains("Pick 3") span.next-jackpot-amount',
            transform: async (html) => {
              let jackpot = html.first().clone().children().remove().end().text().trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'time',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/arizona/',
            path: 'tr:contains("Pick 3") span.next-draw-date',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text, "ddd, MMM DD, YYYY").format();
              return date;
            }
          });
          return nextDate;
        }
      }
    }
  }
];