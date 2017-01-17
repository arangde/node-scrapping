import moment from 'moment';

export const megaMillionsRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'megamillions',
    regions: ['USA'],
    url:"http://www.lotteryusa.com/mega-millions/",
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
    lotteryName:'megamillions',
    regions: ['USA'],
    url:"http://www.calottery.com/play/draw-games/mega-millions",
    data: {
      numbers: {
        path: '.winning_number_sm',
        transform: async (html) => {
          const regex = /\d+/g;
          return html.html().match(regex);
        }
      },
      jackpot: {
        path: '.draw_games tbody tr:nth-child(1) td:nth-child(3)',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.date',
        transform: async (html) => {
          const regex = /\s\s+/g;
          const text = html.text().split('|')[0].replace(regex, ' ');
          const date = await moment(text, "dddd, MMMM DD, YYYY").format();

          return date;
        }
      }
    }
  }
];


export const megaMillionsNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'megamillions',
    regions: ['USA'],
    url:"http://www.lotteryusa.com/mega-millions/",
    data: {
      jackpot: {
        path: '.next-jackpot-amount',
        transform: async (html) => {
          const text = html.text().split(/[a-zA-Z]+/)[0].replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.next-draw-date',
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
    lotteryName:'megamillions',
    regions: ['USA'],
    url:"http://www.flalottery.com/megaMillions",
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