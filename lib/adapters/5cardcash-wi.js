import moment from 'moment';
import { getData } from '../helpers/getData';
export const fivecardcashwiRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'5cardcashwi',
    regions: ['WI'],
    url:"https://www.wilottery.com/lottogames/5CardCash/",
    data: {
      numbers: {
        path: 'div.fiveCardCashnumbers',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i<5; i++){
            numbers[i]=html.eq(i).children().first().text() + html.eq(i).children().last().attr('alt');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div.resultsDrawDate',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.wilottery.com/lottogames/5CardCash/info.aspx',
            path: 'tr td[headers=prizedaily]',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'span#ctl00_ContentPlaceHolder1_FormView1_RecDateLabel',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "dddd, MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'5cardcashwi',
    regions: ['WI'],
    url:"http://www.lotteryusa.com/wisconsin/5-card-cash/",
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


export const fivecardcashwiNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'5cardcashwi',
    regions: ['WI'],
    url:"https://www.wilottery.com/lottogames/5CardCash/",
    data: {
      jackpot: {
        path: 'span',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.wilottery.com/lottogames/5CardCash/info.aspx',
            path: 'tr td[headers=prizedaily]',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'span#ctl00_ContentPlaceHolder1_FormView1_RecDateLabel',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'https://www.lotterypost.com/game/462',
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
    lotteryName:'5cardcashwi',
    regions: ['WI'],
    url:"http://www.lotteryusa.com/wisconsin/",
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