import moment from 'moment';
export const showmecashRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "showmecash",
    regions: ["MO"],
    url: "http://www.molottery.com/numbers/winning_numbers.jsp#smc",
    data: {
      numbers: {
        path: "div#win_num_logo a[href*='show_me_cash']",
        transform: async (html) => {
          let numbers = html.parent().first().next().find("tbody tr").eq(0);
          numbers = numbers.find("td").eq(2).text().split("-");
          return numbers;
        } 
      },
      jackpot: {
        path: "div#win_num_logo a[href*='show_me_cash']",
        transform: async (html) => {
          let jackpot = html.parent().first().next().find("tbody tr").eq(0);
          jackpot = jackpot.find("td").eq(3).text();
          return parseInt(jackpot.replace(/\D/g, ""));
        }
      },
      date: {
        path: "div#win_num_logo a[href*='show_me_cash']",
        transform: async (html) => {
          let date = html.parent().first().next().find("tbody tr").eq(0);
          date = date.find("td").eq(0).text();
          return await moment(date, "ddd, MMM DD, YYYY").format();
        }
      }
    }
  },

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "showmecash",
    regions: ["MO"],
    url: "http://www.lotteryusa.com/missouri/show-me-cash/",
    data: {
      numbers: {
        path: "ul.draw-result",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<5;i++){
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
  }
];


export const showmecashNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "showmecash",
    regions: ["MO"],
    url: "http://www.lotteryusa.com/missouri/",
    data: {
      jackpot: {
        path: "img[alt*='Show Me Cash']",
        transform: async (html) => {
          let game_row = html.first().parent().parent().parent();
          let jackpot = game_row.find("span.next-jackpot-amount");
          jackpot = jackpot.clone().children().remove().end().text();
          return parseInt(jackpot.replace(/[^0-9]+/g, ""));
        }
      },
      date: {
        path: "img[alt*='Show Me Cash']",
        transform: async (html) => {
          let game_row = html.first().parent().parent().parent();
          let date = game_row.find("span.next-draw-date").text();
          return await moment(date, "ddd, MMM DD, YYYY").format();
        }
      }
    }
  },

  // scraper for the next draw (backup)
  {
    lotteryName: "showmecash",
    regions: ["MO"],
    url: "http://www.lottostrategies.com/script/last_results/226/MO/missouri-lottery-results.html",
    data: {
      jackpot: {
        path: "a[title*='Show Me Cash']",
        transform: async (html) => {
          let jackpot = html.first().next().next().next();
          return parseInt(jackpot.text().replace(/[^0-9]+/g, ""));
        }
      },
      date: {
        path: "a[title*='Show Me Cash']",
        transform: async (html) => {
          let date = html.first().next().next();
          date = date.find("b").eq(0).text();
          date = await moment(date, "ddd, MMM DD").format();
          return date;
        }
      }
    }
  },
];