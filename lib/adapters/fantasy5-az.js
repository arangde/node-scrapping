import moment from 'moment';
export const fantasy5azRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'fantasy5az',
    regions: ['AZ'],
    url:"https://www.arizonalottery.com/en/play/draw-games/fantasy-5",
    data: {
      numbers: {
        path: 'div.winning_numbers:nth-child(1) h2',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text()!= "" ; i++){
            numbers[i]=html.eq(i).text().trim();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'tbody tr:nth-child(1) td.small-text:nth-child(4)',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ''));
        }
      },
      date: {
        path: 'span.regular',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "DDDD, MMMM DD").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'fantasy5az',
    regions: ['AZ'],
    url:"http://www.lotteryusa.com/arizona/fantasy-5/",
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


export const fantasy5azNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'fantasy5az',
    regions: ['AZ'],
    url:"https://www.arizonalottery.com/en/play/draw-games/fantasy-5",
    data: {
      jackpot: {
        path: 'h2.price',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ''));
        }
      },
      date: {
        path: 'div.next-jackpot span',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "DDDD, MMMM DD").format();
          return date;
        }
    }
  }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'fantasy5az',
    regions: ['AZ'],
    url:"http://www.lotteryusa.com/arizona/",
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