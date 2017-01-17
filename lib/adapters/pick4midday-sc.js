import moment from 'moment'; 
import { getData } from '../helpers/getData';
export const pick4middayscRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4middaysc',
    regions: ['SC'],
    url:"https://www.lotterypost.com/game/224",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!="";i++){
            numbers[i] = html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.sceducationlottery.com/games2/howtoplay_pick4.asp',
            path: 'td:contains("$") > strong:nth-of-type(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\s.+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.resultsDrawDate',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "dddd, MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4middaysc',
    regions: ['SC'],
    url:"http://www.lotteryusa.com/south-carolina/midday-pick-4/",
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
            return parseInt(html.first().text().trim().replace(/\D/g,""));
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


export const pick4middayscNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick4middaysc',
    regions: ['SC'],
    url:"https://www.lotterypost.com/game/224",
    data: {
      jackpot: {
       path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.sceducationlottery.com/games2/howtoplay_pick4.asp',
            path: 'td:contains("$") > strong:nth-of-type(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\s.+/g,"").replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.resultsNextDrawInfo p:nth-child(2)',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "ddd, MMM D, YYYY, h:mA").format();
          return date;
        }
    }
}
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick4middaysc',
    regions: ['SC'],
    url:"http://www.lotteryusa.com/south-carolina/",
    data: {
      jackpot: {
        path: 'tr:contains("Midday Pick 4") span.next-jackpot-amount',
        transform: async (html) => {
            return parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
        }
      },
      date: {
        path: 'tr:contains("Midday Pick 4") span.next-draw-date',
        transform: async (html) => {
          let text = html.last().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];
