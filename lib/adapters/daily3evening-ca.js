import moment from 'moment';
import { getData } from '../helpers/getData';
export const daily3eveningcaRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily3eveningca',
    regions: ['CA'],
    url:"http://www.calottery.com/play/draw-games/daily-3/winning-numbers",
    data: {
      numbers: {
        path: 'tr',
        transform: async (html) => {
          const numbers = [];
          for(let i=2; i<4; i++){
            if(html.eq(i).text().search("Evening")!=-1){
              for(let j=0; html.eq(i).children().eq(1).children().eq(j).text()!="";j++){
                  numbers[j]=parseInt(html.eq(i).children().eq(1).children().eq(j).text().replace(/\D/g,"")).toString();
              }
            }
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'h3',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.calottery.com/play/draw-games/daily-3',
            path: 'div.drawGameHero h2',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr',
        transform: async (html) => {
          let text = '';
          for(let i=2; i<4; i++){
            if(html.eq(i).text().search("Evening")!=-1){
              text = html.eq(i).children().eq(0).children().first().text().split(" - ")[0];
            }
          }
          const date = await moment(text, "MMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'daily3eveningca',
    regions: ['CA'],
    url:"http://www.lotteryusa.com/california/daily-3/",
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
          let jackpot = await getData({
            url: 'http://www.lotteryusa.com/california/',
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


export const daily3eveningcaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'daily3eveningca',
    regions: ['CA'],
    url:"http://www.calottery.com/play/draw-games/daily-3/winning-numbers",
    data: {
      jackpot: {
        path: 'tr',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.calottery.com/play/draw-games/daily-3',
            path: 'div.drawGameHero h2',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {      
        path: 'tr',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/5',
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
    lotteryName:'daily3eveningca',
    regions: ['CA'],
    url:"http://www.lotteryusa.com/california/",
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