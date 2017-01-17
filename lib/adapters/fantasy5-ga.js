import moment from 'moment';
export const fantasy5gaRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'fantasy5ga',
    regions: ['GA'],
    url:"https://www.lotterypost.com/game/41",
    data: {
      numbers: {
        path: 'ins.sprite-results',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().trim().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div.resultsNextDrawInfo p span',
        transform: async (html) => {
          return parseInt(html.first().text().trim().replace(/\D/g,""))-parseInt(html.last().text().trim().replace(/\D/g,""));
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
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'fantasy5ga',
    regions: ['GA'],
    url:"http://www.lotteryusa.com/georgia/fantasy-5/",
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


export const fantasy5gaNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'fantasy5ga',
    regions: ['GA'],
    url:"https://www.lotterypost.com/game/41",
    data: {
      jackpot: {
        path: 'div.resultsNextDrawInfo p span',
        transform: async (html) => {
          return parseInt(html.first().text().trim().replace(/\D/g,""));
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
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'fantasy5ga',
    regions: ['GA'],
    url:"http://www.lotteryusa.com/georgia/",
    data: {
      jackpot: {
        path: 'tr:contains("Fantasy 5") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.last().clone().children().remove().end().text().trim().replace(/\D/g,""));
          return jackpot;  
        }
      },
      date: {
        path: 'tr:contains("Fantasy 5") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];