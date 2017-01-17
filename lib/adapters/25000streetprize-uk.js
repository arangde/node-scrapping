import moment from 'moment';
import { getData } from '../helpers/getData';
export const streetprizeukRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'25000streetprizeuk',
    regions: ['UK'],
    url:"http://www.freelotto.com/lottery_results/UK_United_Kingdom_Lottery_Results.html",
    data: {
      numbers: {
        path: 'div.numbers > span.number',
        transform: async (html) => {
          const numbers = [];
          const textString = html.last().text().replace(/( {2,})/g,'');
          numbers[0] = /([A-Z 0-9]+)(?: in [A-Za-z ]+,)/g.exec(textString)[1];
          numbers[1] = /(?:[A-Za-z]+, )([A-Z 0-9]+)(?: in [A-Za-z ]+)/g.exec(textString)[1];
          return numbers;

        }
      },
      jackpot: {
        path: 'tr',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.postcodelottery.co.uk/winners/street-prize',
            path: 'p strong',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.header > span.drawdate',
        transform: async (html) => {
          const text = html.last().text().replace(/( {2,})/g,'');
          const date = await moment(text, "ddd MM/DD").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'25000streetprizeuk',
    regions: ['UK'],
    url:"http://www.lottostrategies.com/script/winning_of_past_month/100/UKW/UK/UK-National-UK-25,000-Street-Prize-lottery-results.html",
    data: {
      numbers: {
        path: 'td > b',
        transform: async (html) => {
          const numbers = [];
          const textString = html.eq(4).text();
          numbers[0] = /([A-Z 0-9]+)(?: in [A-Za-z ]+,)/g.exec(textString)[1];
          numbers[1] = /(?:[A-Za-z]+, )([A-Z 0-9]+)(?: in [A-Za-z ]+)/g.exec(textString)[1];
          return numbers;
        }
      },
      jackpot: {
        path: 'td > b',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.postcodelottery.co.uk/winners/street-prize',
            path: 'p strong',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'td > code',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd MM/DD/YY").format();
          return date;
        }
      }
    }
  }
];


export const streetprizeukNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'25000streetprizeuk',
    regions: ['UK'],
    url:"http://www.freelotto.com/lottery_results/UK_United_Kingdom_Lottery_Results.html",
    data: {
      jackpot: {
        path: 'div',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.postcodelottery.co.uk/winners/street-prize',
            path: 'p strong',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'div.nextdraw > span.drawdate',
        transform: async (html) => {         
          const text = html.last().children().first().text().replace(/(\s)/g,'');
          const date = await moment(text, "MM/DD").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'25000streetprizeuk',
    regions: ['UK'],
    url:"http://www.lottostrategies.com/script/winning_of_past_month/100/UKW/UK/UK-National-UK-25,000-Street-Prize-lottery-results.html",
    data: {
      jackpot: {
        path: 'td > b',
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.postcodelottery.co.uk/winners/street-prize',
            path: 'p strong',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: 'td > code',
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.freelotto.com/lottery_results/UK_United_Kingdom_Lottery_Results.html',
            path: 'div.nextdraw > span.drawdate',
            transform: async (html) => {
              const text = html.last().children().first().text().replace(/(\s)/g,'');
              const date = await moment(text, "MM/DD").format();
              return date;
            }
          });
          return nextDate;
        }
      }
    }
  }
];