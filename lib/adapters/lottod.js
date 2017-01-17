import moment from 'moment';
import { getData } from '../helpers/getData';
export const lottodRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "lottod",
    regions: ["QC"],
    url: "https://loteries.lotoquebec.com/en/lotteries/lottod",
    data: {
      numbers: {
        path: "div.numeros",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<8;i++){
            numbers[i] = html.first().find("span.num").eq(i).text();
          }
          return numbers;

        } 
      },
      jackpot: {
        path: "div.lqZoneDetailsStructureLots table",
        transform: async (html) => {
          let jackpot = html.first().find("tr").eq(1).children().last().text();
          jackpot = parseInt(jackpot.replace(/\D/g, ""));
          return jackpot;
        }
      },
      date: {
        path: "div#dateAffichee",
        transform: async (html) => {
          let date = html.first().text();
          return await moment(date, "YYYY-MM-DD").format();
        }
      }
    }
  },

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "lottod",
    regions: ["QC"],
    url: "https://www.lotterypost.com/game/440",
    data: {
      numbers: {
        path: "div.resultsRow",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<8;i++){
            numbers[i] = html.first().find("ins").eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: "",
        transform: async (html) => {
          return await getData({
            url: "https://loteries.lotoquebec.com/en/lotteries/lottod",
            path: "div.lqZoneDetailsStructureLots table",
            transform: async (html) => {
              let jackpot = html.first().find("tr").eq(1).children().last().text();
              jackpot = parseInt(jackpot.replace(/\D/g, ""));
              return jackpot;
            }
          });
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


export const lottodNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "lottod",
    regions: ["QC"],
    url: "http://www.lotterycanada.com/quebec-lottod",
    data: {
      jackpot: {
        path: "li:contains('Grand prize')",
        transform: async (html) => {
          let jackpot_list = html.first().text().split("or");
          for(let i=0;i<jackpot_list.length;i++){
            if (jackpot_list[i].indexOf("$5") >= 0){
              let current_jackpot = jackpot_list[i].replace("$5", "");
              return parseInt(current_jackpot.replace(/\D/g, ""));
            }
          }
        }
      },
      date: {
        path: "div.panel-footer div.row div:contains('Next Draw Date')",
        transform: async (html) => {
          let date = html.first().find("strong").text();
          date = await moment(date, "MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  },
  // scraper for the next draw (backup)
  {
    lotteryName: "lottod",
    regions: ["QC"],
    url: "https://www.lotterypost.com/game/440",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          return await getData({
            url: "https://loteries.lotoquebec.com/en/lotteries/lottod",
            path: "div.lqZoneDetailsStructureLots table",
            transform: async (html) => {
              let jackpot = html.first().find("tr").eq(1).children().last().text();
              jackpot = parseInt(jackpot.replace(/\D/g, ""));
              return jackpot;
            }
          });
        }
      },
      date: {
        path: "div.resultsNextDrawInfo",
        transform: async (html) => {
          let date = html.first().find("p").eq(0).text();
          date = await moment(date, "ddd, MMM DD, YYYY, hh:mm p").format();
          return date;
        }
      }
    }
  },
];