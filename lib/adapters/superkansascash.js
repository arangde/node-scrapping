import moment from 'moment';
export const superkansascashRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "superkansascash",
    regions: ["KS"],
    url: "http://www.kslottery.com/numberslookup/kscapreviousnumbers.aspx",
    data: {
      numbers: {
        path: 'table.ResultsTable',
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<6;i++){
            numbers[i] = html.first().children().eq(1).children().eq(i+1).text();
          }
          return numbers;

        } 
      },
      jackpot: {
        path: 'table.ResultsTable',
        transform: async (html) => {
          let jackpot = html.first().children().eq(1).children().eq(7).text();
          jackpot = parseInt(jackpot.replace(/\D/g, ""));
          return jackpot;
        }
      },
      date: {
        path: 'table.ResultsTable',
        transform: async (html) => {
          let text = html.first().children().eq(1).children().first().text()
          text = text.replace(/(\s)/g,'');
          const date = await moment(text, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "superkansascash",
    regions: ["KS"],
    url: "http://www.lotteryusa.com/kansas/super-kansas-cash/",
    data: {
      numbers: {
        path: "span.string-results",
        transform: async (html) => {
          let numbers = [];
          let text = html.first().text().replace("Super Cashball: ", "");
          numbers = text.split(", ");
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


export const superkansascashNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "superkansascash",
    regions: ["KS"],
    url: "http://www.kslottery.com/",
    data: {
      jackpot: {
        path: "div#mainPageJackpots",
        transform: async (html) => {
          let lotteries = html.first().children();
          let jackpot = lotteries.last().children("span").eq(1).text();
          return parseInt(jackpot.replace(/\D/g, ""));
        }
      },
      date: {
        path: "div#mainPageJackpots",
        transform: async (html) => {
          let lotteries = html.first().children();
          let date = lotteries.last().children("span").eq(0).text();
          date = date.replace(/(\s)/g, "");
          date = await moment(date, "MM/DD/YYYY").format();
          return date;
        }
      }
    }
  },
  // scraper for the recently passed draw (backup)
  {
    lotteryName: "superkansascash",
    regions: ["KS"],
    url: "http://www.lotteryusa.com/kansas/",
    data: {
      jackpot: {
        path: "div.game-title:contains('Super Kansas Cash')",
        transform: async (html) => {
          let next_jackpot = html.first().parents("tr").eq(0).children();
          next_jackpot = next_jackpot.last().find("span").eq(0);
          let jackpot_amount = next_jackpot.clone().children().remove().end().text();
          return parseInt(jackpot_amount.replace(/\D/g, ''));
        }
      },
      date: {
        path: "div.game-title:contains('Super Kansas Cash')",
        transform: async (html) => {
          let next_jackpot = html.first().parents("tr").eq(0).children().last();
          let date = next_jackpot.find("span.next-draw-date").eq(0).text();
          date = await moment(date, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];