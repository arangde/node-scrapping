import moment from 'moment';
export const lotto47miRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lotto47mi',
    regions: ['MI'],
    url:"https://www.lotterypost.com/game/280",
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
        path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
        transform: async (html) => {
          return parseInt((parseFloat(/([0-9.]+)(?: Million)/g.exec(html.first().text())[1]))*1000000)-parseInt(html.eq(1).text().replace(/\D/g,""));
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
    lotteryName:'lotto47mi',
    regions: ['MI'],
    url:"http://www.lotteryusa.com/michigan/classic-lotto-47/",
    data: {
      numbers: {
        path: 'ul.draw-result',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.first().children().eq(i).text()!="";i++){
            numbers[i] = html.first().children().eq(i).text();
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


export const lotto47miNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lotto47mi',
    regions: ['MI'],
    url:"https://www.lotterypost.com/game/280",
    data: {
      jackpot: {
        path: 'div.resultsNextDrawInfoUnit:nth-child(2) div.resultsNextDrawInfo',
        transform: async (html) => {
          return parseInt((parseFloat(/([0-9.]+)(?: Million)/g.exec(html.first().text())[1]))*1000000);  
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
    lotteryName:'lotto47mi',
    regions: ['MI'],
    url:"http://www.lotteryusa.com/michigan/",
    data: {
      jackpot: {
        path: 'tr:contains("Classic Lotto 47") span.next-jackpot-amount',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/[A-z]{3,3}.+/g,"").replace(/\D/g , ''));
        }
      },
      date: {
        path: 'tr:contains("Classic Lotto 47") span.next-draw-date',
        transform: async (html) => {
          const text = html.last().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];