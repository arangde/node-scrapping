import moment from 'moment';
export const powerballRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'powerball',
    regions: ['USA'],
    url:"http://www.lotteryusa.com/powerball/",
    data: {
      numbers: {
        path: '.result .draw-result',
        transform: async (html) => {
          const text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: '.jackpot-amount',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.date',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'powerball',
    regions: ['USA'],
    url:"http://www.flalottery.com/powerball",
    data: {
      numbers: {
        path: '.gamePageBalls p',
        transform: async (html) => {
          let text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: '.games tbody tr:nth-child(1) td:nth-child(3)',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text)*1000000;
        }
      },
      date: {
        path: '.gamePageNumbers p:nth-child(2)',
        transform: async (html) => {
          const text = html.html();
          const date = await moment(text, "dddd, MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const powerballNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'powerball',
    regions: ['USA'],
    url:"http://www.lotteryusa.com/powerball/",
    data: {
      jackpot: {
        path: '.next-jackpot-amount',
        transform: async (html) => {
          const text = html.text().split(/[a-zA-Z]/)[0].replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.next-draw-date',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "ddd, MMM DD, YYYY").format();
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'powerball',
    regions: ['USA'],
    url:"http://www.flalottery.com/powerball",
    data: {
      jackpot: {
        path: '.nextJackpot .gameJackpot',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text)*1000000;
        }
      },
      date: {
        path: '.nextJackpot p:nth-child(2) ',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "dddd, MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];