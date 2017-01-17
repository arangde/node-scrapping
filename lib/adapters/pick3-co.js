import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3coRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3co',
    regions: ['CO'],
    url:"https://www.coloradolottery.com/en/games/pick3/",
    data: {
      numbers: {
        path: 'p.draw span',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!="";i++){
            numbers[i] = html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'p.jackpot span',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ''))/5;
        }
      },
      date: {
        path: 'div.winningNumbers > p:nth-child(1) > strong',
        transform: async (html) => {
          const text = html.first().text().replace(" Winning Numbers");
          const date = await moment(text, "DDDD, M/D").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3co',
    regions: ['CO'],
    url:"http://www.lotteryusa.com/colorado/pick-3/",
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


export const pick3coNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3co',
    regions: ['CO'],
    url:"https://www.coloradolottery.com/en/games/pick3/",
    data: {
      jackpot: {
        path: 'p:nth-child(1) strong.punch-up',
        transform: async (html) => {  
          return parseInt(html.first().text().replace(/\D/g,""))/5;
        }
      },
      date: {
        path: 'p:nth-child(2) strong.punch-up',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "DDDD, M/D").format();
          return date;
        }
    }
  }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3co',
    regions: ['CO'],
    url:"http://www.lotteryusa.com/colorado/pick-3/",
    data: {
      jackpot: {
        path: 'span.jackpot-amount',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/colorado/',
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
            url: 'http://www.lotteryusa.com/colorado/',
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