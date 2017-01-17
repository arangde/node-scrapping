import moment from 'moment';
import { getData } from '../helpers/getData';
export const extraqcRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'extraqc',
    regions: ['QC'],
    url:"http://www.lotterycanada.com/quebec-extra",
    data: {
      numbers: {
        path: 'h4 span.label-number',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=   html.eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'tr:nth-child(2) td:nth-child(2)',
        transform: async (html) => {
          return parseInt(html.first().text().trim().replace(/\.[0-9]+/g,"").replace(/\D/g,""));
        }
      },
      date: {
        path: 'span.draw-date.small',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "- MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'extraqc',
    regions: ['QC'],
    url:"https://www.lotterypost.com/game/249",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            if(i == 0){
              numbers[0]=   html.eq(i).text();
            }else{
              numbers[0]= numbers[0]+html.eq(i).text();
            }
            
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://loteries.lotoquebec.com/en/lotteries/extra',
            path: 'tr.donnees:nth-of-type(2) td:nth-child(2)',
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


export const extraqcNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'extraqc',
    regions: ['QC'],
    url:"http://www.lotterycanada.com/quebec-extra",
    data: {
      jackpot: {
        path: 'tr:nth-child(2) td:nth-child(2)',
        transform: async (html) => {
          return parseInt(html.first().text().trim().replace(/\.[0-9]+/g,"").replace(/\D/g,""));
        }
      },
      date: {
        path: 'div.panel-footer strong',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'extraqc',
    regions: ['QC'],
    url:"https://www.lotterypost.com/game/249",
    data: {
      jackpot: {
        path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://loteries.lotoquebec.com/en/lotteries/extra',
            path: 'tr.donnees:nth-of-type(2) td:nth-child(2)',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
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