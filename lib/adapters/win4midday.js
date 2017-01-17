import moment from 'moment';
export const win4middayRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "win4midday",
    regions: ["NY"],
    url: "http://www.lotteryusa.com/new-york/midday-win-4/",
    data: {
      numbers: {
        path: "ul.draw-result",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<4;i++){
            numbers[i] = html.find("li").eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: "span.jackpot-amount",
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ""));
        }
      },
      date: {
        path: "time",
        transform: async (html) => {
          let date = html.first().text();
          date = await moment(date, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "win4midday",
    regions: ["NY"],
    url: "https://www.lotterypost.com/game/145",
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
          return 5000;
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


export const win4middayNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "win4midday",
    regions: ["NY"],
    url: "http://www.lotteryusa.com/new-york/",
    data: {
      jackpot: {
        path: "div[class='game-title']:contains('Win 4')",
        transform: async (html) => {
          let game_row = html.first().parent().parent();
          let jackpot = game_row.find("span.next-jackpot-amount");
          jackpot = jackpot.clone().children().remove().end().text();
          return parseInt(jackpot.replace(/[^0-9]+/g, ""));
        }
      },
      date: {
        path: "div[class='game-title']:contains('Win 4')",
        transform: async (html) => {
          let game_row = html.first().parent().parent();
          let date = game_row.find("span.next-draw-date").text();
          return await moment(date, "ddd, MMM DD, YYYY").format();
        }
      }
    }
  },

  // scraper for the next draw (backup)
  {
    lotteryName: "win4midday",
    regions: ["NY"],
    url: "https://www.lotterypost.com/game/145",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          return 5000;
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