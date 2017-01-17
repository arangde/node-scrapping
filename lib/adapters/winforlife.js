import moment from 'moment';
export const winforlifeRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "winforlife",
    regions: ["OR"],
    url: "http://www.lotteryusa.com/oregon/",
    data: {
      numbers: {
        path: "img[alt*='Win For Life']",
        transform: async (html) => {
          let game_row = html.first().parent().parent().parent();
          let numbers = [];
          for(let i=0;i<4;i++){
            numbers[i] = game_row.find("ul.draw-result li").eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: "img[alt*='Win For Life']",
        transform: async (html) => {
          let game_row = html.first().parent().parent().parent();
          let jackpot = game_row.find("span.jackpot-amount").text();
          return parseInt(jackpot.replace(/\D/g, ""));
        }
      },
      date: {
        path: "img[alt*='Win For Life']",
        transform: async (html) => {
          let game_row = html.first().parent().parent().parent();
          let date = game_row.find("time").eq(0).text();
          date = await moment(date, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "winforlife",
    regions: ["OR"],
    url: "https://www.lotterypost.com/game/164",
    data: {
      numbers: {
        path: "div.resultsRow",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<4;i++){
            numbers[i] = html.first().find("ins").eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: "",
        transform: async (html) => {
          return 1000;
        }
      },
      date: {
        path: "div.resultsDrawDate",
        transform: async (html) => {
          let date = html.first().text();
          date = await moment(date, "dddd, MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const winforlifeNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "winforlife",
    regions: ["OR"],
    url: "http://www.lottostrategies.com/script/last_results/238/OR/oregon-lottery-results.html",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          return 1000;
        }
      },
      date: {
        path: "a[title*='Win for Life']",
        transform: async (html) => {
          let date = html.first().next().next().find("b").text();
          return await moment(date, "ddd, MMM DD").format();
        }
      }
    }
  },

  // scraper for the next draw (backup)
  {
    lotteryName: "winforlife",
    regions: ["OR"],
    url: "https://www.lotterypost.com/game/164",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          return 1000;
        }
      },
      date: {
        path: "div.resultsNextDrawInfo p",
        transform: async (html) => {
          let date = html.first().text();
          date = await moment(date, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },
];