import moment from 'moment';
export const easy5laRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'easy5la',
    regions: ['LA'],
    url:"http://louisianalottery.com/easy-5/tab/winning-numbers",
    data: {
      numbers: {
        path: 'div.pad-mask span.ball',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ''; i++){
            numbers[i]=html.eq(i).text().replace(/\D/g,'');
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'span.text-info',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ""));
        }
      },
      date: {
        path: 'span.text-error',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "dddd, MMM D, YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'easy5la',
    regions: ['LA'],
    url:"http://www.lotteryusa.com/louisiana/easy-5/",
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


export const easy5laNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'easy5la',
    regions: ['LA'],
    url:"http://louisianalottery.com/easy-5/tab/winning-numbers",
    data: {
      jackpot: {
        path: 'table.next-draw tr:nth-child(3) td.text-right',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ""));  
        }
      },
      date: {
        path: 'table.next-draw tr:nth-child(2) td.text-right',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'easy5la',
    regions: ['LA'],
    url:"http://www.lotteryusa.com/louisiana/",
    data: {
      jackpot: {
        path: 'tr:contains("Easy 5") span.next-jackpot-amount',
        transform: async (html) => {
          return parseInt(html.first().text().replace(/[A-z]{2,3}.+/g,"").replace(/\D/g , ''));
          }    
        
      },
      date: {
        path: 'tr:contains("Easy 5") span.next-draw-date',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];