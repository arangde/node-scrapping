import moment from 'moment';
import { getData } from '../helpers/getData';
export const pick3wcRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3wc',
    regions: ['WC'],
    url:"https://www.wclc.com/winning-numbers/pick-3-extra.htm",
    data: {
      numbers: {
        path: 'div.pastWinNum:nth-child(1) li.pastWinNumber',
        transform: async (html) => {
          const numbers = [];
          for(let i=0;html.eq(i).text().trim()!="";i++){
            numbers[i] = html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'tr.dark:nth-child(2) td:nth-child(2)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotterycanada.com/western-pick-3',
            path: 'tr:contains("Straight") td:nth-child(2)',
            transform: async (html) => {
              let jackpot = html.first().text().trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.pastWinNumDate h4',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "dddd, MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'pick3wc',
    regions: ['WC'],
    url:"http://www.lotterycanada.com/western-pick-3",
    data: {
      numbers: {
        path: 'h4 span.label-number',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().trim().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'tr:contains("Straight") td:nth-child(2)',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g , ''));
        }
      },
      date: {
        path: 'span.draw-date.small',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "- MMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const pick3wcNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'pick3wc',
    regions: ['WC'],
    url:"https://www.wclc.com/winning-numbers/pick-3-extra.htm",
    data: {
      jackpot: {
        path: 'tr.dark:nth-child(2) td:nth-child(2)',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotterycanada.com/western-pick-3',
            path: 'tr:contains("Straight") td:nth-child(2)',
            transform: async (html) => {
              let jackpot = html.first().text().trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'tr.dark td:nth-child(1) strong',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotterycanada.com/western-pick-3',
            path: 'span strong',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text, "MMM D, YYYY").format();
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
    lotteryName:'pick3wc',
    regions: ['WC'],
    url:"http://www.lotterycanada.com/western-pick-3",
    data: {
      jackpot: {
        path: 'tr:contains("Straight") td:nth-child(2)',
        transform: async (html) => {
          let jackpot = html.first().text().trim().replace(/\D/g,"");
          return parseInt(jackpot);
        }
      },
      date: {
        path: 'span strong',
        transform: async (html) => {
          let text = html.first().text().trim();
          let date = await moment(text, "MMM D, YYYY").format();
          return date;
      }
    }
  }
}
];