import moment from 'moment';
export const hoosierlottoplusRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "hoosierlottoplus",
    regions: ["IN"],
    url: "https://www.hoosierlottery.com/games/hoosier-lotto",
    data: {
      numbers: {
        path: "table.drawingsGrid",
        transform: async (html) => {
          let date = html.first().find("td:contains('PLUS')").eq(0);
          let numbers = date.parent().find("td.numbers span").text();
          return numbers.split("-");
        } 
      },
      jackpot: {
        path: "thead.payoutsGrid",
        transform: async (html) => {
          let jackpot = html.first().next().children().last();
          jackpot = jackpot.find("td").eq(3).text();
          return parseInt(jackpot.replace(/\D/g, ""));
        }
      },
      date: {
        path: "table.drawingsGrid",
        transform: async (html) => {
          let date = html.first().find("td:contains('PLUS')").eq(0);
          date = date.text().replace("+PLUS", "");
          return await moment(date, "MM/DD/YYYY").format();
        }
      }
    }
  },

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "hoosierlottoplus",
    regions: ["IN"],
    url: "http://www.lotteryusa.com/indiana/lotto/",
    data: {
      numbers: {
        path: "td.result ul",
        transform: async (html) => {
          let numbers = [];
          for(let i=1;i<7;i++){
            numbers[i-1] = html.eq(1).find("li").eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: "",
        transform: async (html) => {
          return 1000000;
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


export const hoosierlottoplusNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "hoosierlottoplus",
    regions: ["IN"],
    url: "https://www.hoosierlottery.com/games/hoosier-lotto",
    data: {
      jackpot: {
        path: "thead.payoutsGrid",
        transform: async (html) => {
          let jackpot = html.first().next().children().last();
          jackpot = jackpot.find("td").eq(3).text();
          return parseInt(jackpot.replace(/\D/g, ""));
        }
      },
      date: {
        path: "div.jackprize span",
        transform: async (html) => {
          let date = html.first().text();
          return await moment(date, "MMM DD").format();
        }
      }
    }
  },

  // scraper for the next draw (backup)
  {
    lotteryName: "hoosierlottoplus",
    regions: ["IN"],
    url: "http://www.lotteryusa.com/indiana/",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          return 1000000;
        }
      },
      date: {
        path: "div.game-title:contains('Lotto')",
        transform: async (html) => {
          let lottery = html.first().parent().parent();
          let date = lottery.find("td").last().find("span.next-draw-date").eq(0);
          date = await moment(date.text(), "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },
];