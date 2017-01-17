import moment from 'moment';
export const texastwostepRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "texastwostep",
    regions: ["TX"],
    url: "http://www.txlottery.org/export/sites/lottery/Games/Texas_Two_Step/",
    data: {
      numbers: {
        path: "h3:contains('Texas Two Step')",
        transform: async (html) => {
          let number_list = html.first().next();
          let numbers = [];
          for(let i=0;i<5;i++){
            numbers[i] = number_list.find("span").eq(i).text();
          }
          return numbers;

        } 
      },
      jackpot: {
        path: "caption:contains('Texas Two Step')",
        transform: async (html) => {
          let jackpot = html.first().next().next().find("tr").eq(0);
          jackpot = jackpot.find("td").eq(1).text();
          return parseInt(jackpot.replace(/\D/g, ""));
        }
      },
      date: {
        path: "h3:contains('Texas Two Step Winning')",
        transform: async (html) => {
          let date = html.first().text().split("for")[1].split("are")[0];
          return await moment(date, "MM/DD/YYYY").format();
        }
      }
    }
  },

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "texastwostep",
    regions: ["TX"],
    url: "http://www.lotteryusa.com/texas/texas-two-step/",
    data: {
      numbers: {
        path: "td.result ul",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<5;i++){
            let number = html.first().find("li").eq(i).text();
            numbers[i] = number.replace(/([a-zA-z ])/g, "");
          }
          return numbers;
        }
      },
      jackpot: {
        path: "span.jackpot-amount",
        transform: async (html) => {
          let jackpot = html.first().text();
          return parseInt(jackpot.replace(/\D/g, ""));
        }
      },
      date: {
        path: "time",
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];

export const texastwostepNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "texastwostep",
    regions: ["TX"],
    url: "http://www.txlottery.org/export/sites/lottery/Games/Texas_Two_Step/",
    data: {
      jackpot: {
        path: "p:contains('Current Advertised Jackpot')",
        transform: async (html) => {
          let next_jackpot = html.first().parent().next().text();
          return parseInt(next_jackpot.replace(/\D/g, ""));
        }
      },
      date: {
        path: "p:contains('Current Advertised Jackpot')",
        transform: async (html) => {
          let date = html.first().text().split("for")[1].split("is")[0];
          date = await moment(date, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // scraper for the next draw (backup)
  {
    lotteryName: "texastwostep",
    regions: ["TX"],
    url: "http://www.lotteryusa.com/texas/",
    data: {
      jackpot: {
        path: "div.game-title:contains('Texas Two Step')",
        transform: async (html) => {
          let next_jackpot = html.first().parents("tr").eq(0).children();
          next_jackpot = next_jackpot.last().find("span").eq(0);
          let jackpot_amount = next_jackpot.clone().children().remove().end().text();
          return parseInt(jackpot_amount.replace(/\D/g, ''));
        }
      },
      date: {
        path: "div.game-title:contains('Texas Two Step')",
        transform: async (html) => {
          let next_jackpot = html.first().parents("tr").eq(0).children().last();
          let date = next_jackpot.find("span.next-draw-date").eq(0).text();
          date = await moment(date, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },
];