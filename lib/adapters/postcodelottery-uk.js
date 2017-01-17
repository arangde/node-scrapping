import moment from 'moment';
import { getData } from '../helpers/getData';
export const postcodelotteryukRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'postcodelotteryuk',
    regions: ['UK'],
    url:"https://www.postcodelottery.co.uk/winners/daily-prize",
    data: {
      numbers: {
        path: '#winners-archive > table',
        transform: async (html) => {
          const numbers = [];
          const numbersHtml = html.children().first().children().nextAll(0);
          const text = html.children().first().children().nextAll(0).each(function(index, elem){
            numbers[index] = numbersHtml.eq(index).text();
          });
          return numbers;

        }
      },
      jackpot: {
        path: 'h1',
        transform: async (html) => {
          let jackpot = parseInt(html.first().text().replace(/\D/g,""));
          return jackpot;
        }
      },
      date: {
        path: '#winners-archive > table',
        transform: async (html) => {
          const text = html.children().first().children().first().text();
          const date = await moment(text, "MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'postcodelotteryuk',
    regions: ['UK'],
    url:"https://www.lottery.co.uk/postcode-lottery/results",
    data: {
      numbers: {
        path: 'span.postcodeMain',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i<5; i++){
            numbers[i] = html.eq(i).text().replace('\t','');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'span.postcodeMain',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lottery.co.uk/postcode-lottery',
            path: 'li:contains("Daily Prize")',
            transform: async (html) => {
              return parseInt(/([£0-9,]{3,})/mig.exec(html.first().text()).slice(-1)[0].replace(/\D/g,""));
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'th',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "ddd Do MMM YYYY").format();
          return date;
        }
      }
    }
  }
];


export const postcodelotteryukNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'postcodelotteryuk',
    regions: ['UK'],
    url:"https://www.postcodelottery.co.uk/winners/daily-prize",
    data: {
      jackpot: {
        path: 'h1',
        transform: async (html) => {
          let jackpot = parseInt(html.first().text().replace(/\D/g,""));
          return jackpot;
        }
      },
      date: {
        path: '#winners-archive > table',
        transform: async (html) => {         
          let nextDate = await getData({
            url: 'http://www.freelotto.com/lottery_results/UK_United_Kingdom_Lottery_Results.html',
            path: 'div.lottery-game:contains("1,000 Daily Prizes") span.drawdate b',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text, "MM/DD").format();
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
    lotteryName:'postcodelotteryuk',
    regions: ['UK'],
    url:"https://www.lottery.co.uk/postcode-lottery/results",
    data: {
      jackpot: {
        path: 'span.postcodeMain',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lottery.co.uk/postcode-lottery',
            path: 'li:contains("Daily Prize")',
            transform: async (html) => {
              return parseInt(/([£0-9,]{3,})/mig.exec(html.first().text()).slice(-1)[0].replace(/\D/g,""));
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'th',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.freelotto.com/lottery_results/UK_United_Kingdom_Lottery_Results.html',
            path: 'div.lottery-game:contains("1,000 Daily Prizes") span.drawdate b',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text, "MM/DD").format();
              return date;
            }
          });
          return nextDate;
        }
      }
    }
  }
];