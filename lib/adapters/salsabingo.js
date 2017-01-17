import moment from 'moment';
import { getData } from '../helpers/getData';
export const salsabingoRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "salsabingo",
    regions: ["AC"],
    url: "http://corp.alc.ca/SalsaBingo.aspx?tab=2&vc=hide",
    data: {
      numbers: {
        path: "span.lotteryWN",
        transform: async (html) => {
          let numbers = html.first().text().split(/[\s,-]+/);
          return numbers;
        } 
      },
      jackpot: {
        path: "h2:contains('Prize Payout')",
        transform: async (html) => {
          let jackpot = html.first().parent().parent().next().next();
          jackpot = jackpot.children().last().text().replace(".00", "");
          return parseInt(jackpot.replace(/\D/g, ""));
        }
      },
      date: {
        path: "td.lotteryWNKenoBackground",
        transform: async (html) => {
          let date = html.first().text().split("of")[1].split(":")[0];
          return await moment(date, "MMMM DD, YYYY").format();
        }
      }
    }
  },

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "salsabingo",
    regions: ["AC"],
    url: "https://www.lotterypost.com/game/343",
    data: {
      numbers: {
        path: "div.resultsPlain",
        transform: async (html) => {
          return html.first().text().split(", ");
        }
      },
      jackpot: {
        path: "td.info",
        transform: async (html) => {
          let jackpot_1 = html.first().find("p.resultsJackpot").text();
          jackpot_1 = parseInt(jackpot_1.split("US")[0].replace(/\D/g, ""));
          
          let jackpot_2 = html.first().find("span.jackpotchange").text();
          jackpot_2 = parseInt(jackpot_2.split("US")[0].replace(/\D/g, ""));

          let change = html.first().find("ins.sprite-jackpot-up-16").length;

          if (change == 1){
            return jackpot_1 - jackpot_2;
          } else {
            return jackpot_1 + jackpot_2;
          }
        }
      },
      date: {
        path: "div.resultsDrawDate",
        transform: async (html) => {
          return await moment(html.first().text(), "dddd, MMMM DD, YYYY").format();
        }
      }
    }
  }
];

export const salsabingoNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "salsabingo",
    regions: ["AC"],
    url: "http://www.lotterycanada.com/atlantic-salsa-bingo",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          return await getData({
            url: "http://corp.alc.ca/SalsaBingo.aspx?tab=2&vc=hide",
            path: "b:contains('ESTIMATED JACKPOT')",
            transform: async (html) => {
              let jackpot = html.first().text().split("DRAW")[1];
              return parseInt(jackpot.replace(/\D/g, ""));
            }
          });
        }
      },
      date: {
        path: "div.panel-footer div div:contains('Next Draw Date')",
        transform: async (html) => {
          let date = html.first().find("strong").text();
          return await moment(date, "MMMM DD, YYYY").format();
        }
      }
    }
  },

  // scraper for the next draw (backup)
  {
    lotteryName: "salsabingo",
    regions: ["AC"],
    url: "https://www.lotterypost.com/game/343",
    data: {
      jackpot: {
        path: "td.info",
        transform: async (html) => {
          let jackpot = html.first().find("p.resultsJackpot").text();
          return parseInt(jackpot.split("US")[0].replace(/\D/g, ""));
        }
      },
      date: {
        path: "div.resultsNextDrawInfo",
        transform: async (html) => {
          let date = html.first().find("p").eq(0).text();
          date = await moment(date, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  },
];