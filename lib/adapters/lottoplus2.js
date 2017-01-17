import moment from 'moment';
export const lottoplus2Recent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "lottoplus2",
    regions: ["IE"],
    url: "https://www.lottery.ie/prizes-and-results/?game=lotto",
    data: {
      numbers: {
        path: "img[src*='LottoPlus2']",
        transform: async (html) => {
          let text_1 = html.first().parent().next();
          let text_2 = text_1.next();

          let numbers = [];
          for(let i=0;i<6;i++){
            numbers[i] = text_1.find("li").eq(i).text();
          }

          numbers.push(text_2.find("ul.lotto-bonus li").eq(0).text());
          return numbers;
        } 
      },
      jackpot: {
        path: "img[src*='LottoPlus2']",
        transform: async (html) => {
          let jackpot = html.first().parent().parent().find("span.jackpot-amount");
          return parseInt(jackpot.eq(0).text().replace(/\D/g, ""));
        }
      },
      date: {
        path: "h2.date-heading",
        transform: async (html) => {
          let date = html.first().text();
          return await moment(date, "DD MMMM YYYY").format();
        }
      }
    }
  },

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "lottoplus2",
    regions: ["IE"],
    url: "https://irish.national-lottery.com/irish-lotto/plus-2",
    data: {
      numbers: {
        path: "div.resultsInner",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<7;i++){
            numbers[i] = html.first().find("div.result").eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: "span.jackpotAmt",
        transform: async (html) => {
          let jackpot = html.first().text();
          return parseInt(jackpot.replace(/\D/g, ""));
        }
      },
      date: {
        path: "div.resultsInner div.resultsHeader",
        transform: async (html) => {
          let date = html.first().text().replace("st", "");
          date = await moment(date, "dddd DD MMMM YYYY").format();
          return date;
        }
      }
    }
  }
];


export const lottoplus2Next = [
  // scraper for the next draw (primary)
  {
    lotteryName: "lottoplus2",
    regions: ["IE"],
    url: "https://www.lottery.ie/prizes-and-results/?game=lotto",
    data: {
      jackpot: {
        path: "img[src*='LottoPlus2']",
        transform: async (html) => {
          let jackpot = html.first().parent().parent().find("span.jackpot-amount");
          return parseInt(jackpot.eq(0).text().replace(/\D/g, ""));
        }
      },
      date: {
        path: "h2.date-heading",
        transform: async (html) => {
          let last_date = html.first().text();
          last_date = moment(last_date, "DD MMMM YYYY");

          let last_weekday = last_date.weekday();

          if (last_weekday == 6){
            return last_date.add(4, "days").format();
          } else {
            return last_date.add(3, "days").format();
          }


        }
      }
    }
  },

  // scraper for the next draw (backup)
  {
    lotteryName: "lottoplus2",
    regions: ["IE"],
    url: "https://irish.national-lottery.com/irish-lotto/plus-2",
    data: {
      jackpot: {
        path: "span.jackpotAmt",
        transform: async (html) => {
          let jackpot = html.first().text();
          return parseInt(jackpot.replace(/\D/g, ""));
        }
      },
      date: {
        path: "div.resultsInner div.resultsHeader",
        transform: async (html) => {
          let last_date = html.first().text().replace("st", "");
          last_date = await moment(last_date, "dddd DD MMMM YYYY");

          let last_weekday = last_date.weekday();

          if (last_weekday == 6){
            return last_date.add(4, "days").format();
          } else {
            return last_date.add(3, "days").format();
          }
        }
      }
    }
  },
];