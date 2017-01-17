import moment from 'moment';
export const luckymoneyflRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'luckymoneyfl',
    regions: ['FL'],
    url:"http://www.flalottery.com/luckyMoney",
    data: {
      numbers: {
        path: 'div.gamePageBalls span.balls',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != "" ; i++){
            numbers[i]=html.eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'tr:nth-child(1) td.columnLast',
        transform: async (html) => {
          if(html.first().text().indexOf("Million")<0){
          return parseInt(html.first().text().replace(/\..+/g,"").replace(/\D/g, ''));
        } else{
          return parseInt(parseFloat(html.first().text().replace("$","").replace(" Million",""))*1000000);
        }
        }
      },
      date: {
        path: 'div.gamePageNumbers > p:nth-of-type(2)',
        transform: async (html) => {
          const text = html.first().text().trim();
          const date = await moment(text, "dddd, MMMM D, YYYY").format();
          return date;
        }
      }
    }
  },


  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'luckymoneyfl',
    regions: ['FL'],
    url:"http://www.lotteryusa.com/florida/lucky-money/",
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
          return parseInt(html.first().text().replace(/\..+/g,"").replace(/\D/g , ''));
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


export const luckymoneyflNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'luckymoneyfl',
    regions: ['FL'],
    url:"http://www.flalottery.com/luckyMoney",
    data: {
      jackpot: {
        path: 'p.gameJackpot',
        transform: async (html) => {
          if(html.first().text().indexOf("Million")<0){
          return parseInt(html.first().text().replace(/\..+/g,"").replace(/\D/g, ''));
        } else{
          return parseInt(parseFloat(html.first().text().replace("$","").replace(" Million",""))*1000000);
        }
        }
      },
      date: {
        path: 'div.nextJackpot p:nth-child(2)',
        transform: async (html) => {
          const text = html.first().text().trim().replace(/[A-z]+, /,"");
          const date = await moment(text, "MMMM DD, YYYY").format();
          return date;
        }
    }
  }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'luckymoneyfl',
    regions: ['FL'],
    url:"http://www.lotteryusa.com/florida/",
    data: {
      jackpot: {
        path: 'tr:contains("Lucky Money") span.next-jackpot-amount',
        transform: async (html) => {
          let jackpot = parseInt(html.first().clone().children().remove().end().text().replace(/\D/g,""));
          return jackpot;
        }
      },
      date: {
        path: 'tr:contains("Lucky Money") span.next-draw-date',
        transform: async (html) => {
          let text = html.first().text().trim();
          let date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];