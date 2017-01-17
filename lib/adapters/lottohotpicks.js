import moment from 'moment';
import { getData } from '../helpers/getData';
export const lottohotpicksRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "lottohotpicks",
    regions: ["UK"],
    url: "https://www.national-lottery.co.uk/results/lotto-hotpicks/draw-history",
    data: {
      numbers: {
        path: "li.table_row_body ul",
        transform: async (html) => {
          let numbers = html.first().find("li").eq(2).find("span").eq(0);
          numbers = numbers.text().trim().split(" - ");
          return numbers;
        } 
      },
      jackpot: {
        path: "li.table_row_body ul",
        transform: async (html) => {
          let jackpot = html.first().find("li").eq(1).find("span").eq(0);
          return parseInt(jackpot.text().replace(/\D/g, ""));
        }
      },
      date: {
        path: "li.table_row_body ul",
        transform: async (html) => {
          let date = html.first().find("li").eq(0).find("span").eq(0);
          return await moment(date.text(), "ddd DD MMM YYYY").format();
        }
      }
    }
  },

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "lottohotpicks",
    regions: ["UK"],
    url: "https://www.lotterypost.com/game/254",
    data: {
      numbers: {
        path: "div.resultsRow",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<6;i++){
            numbers[i] = html.find("ins").eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: "",
        transform: async (html) => {
          return await getData({
            url: "https://www.national-lottery.co.uk/results/lotto-hotpicks/draw-history",
            path: "li.table_row_body ul",
            transform: async (html) => {
              let jackpot = html.first().find("li").eq(1).find("span").eq(0);
              return parseInt(jackpot.text().replace(/\D/g, ""));
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


export const lottohotpicksNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "lottohotpicks",
    regions: ["UK"],
    url: "https://www.national-lottery.co.uk/games",
    data: {
      jackpot: {
        path: "div.lotto-hotpicks div div div.jackpots",
        transform: async (html) => {
          let jackpot = html.first().find("span.amount").text();
          jackpot = jackpot.replace("K", "").replace("Thousand", "000");
          jackpot = parseInt(jackpot.replace(/[^0-9]+/g, ""));
          return jackpot;
        }
      },
      date: {
        path: "div.lotto-hotpicks div div p.countdown",
        transform: async (html) => {
          let current_date = moment();

          let days = parseInt(html.first().find("span.days span.number").text());
          let hours = parseInt(html.first().find("span.hours span.number").text());
          let minutes = parseInt(html.first().find("span.minutes span.number").text());

          current_date = current_date.add(days, "days").add(hours, "hours");
          current_date = current_date.add(minutes, "minutes").startOf("day").format();
          return current_date;
        }
      }
    }
  },

  // scraper for the next draw (backup)
  {
    lotteryName: "lottohotpicks",
    regions: ["UK"],
    url: "https://www.lotterypost.com/game/254",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          return await getData({
            url: "https://www.national-lottery.co.uk/games",
            path: "div.lotto-hotpicks div div div.jackpots",
            transform: async (html) => {
              let jackpot = html.first().find("span.amount").text();
              jackpot = jackpot.replace("K", "").replace("Thousand", "000");
              jackpot = parseInt(jackpot.replace(/[^0-9]+/g, ""));
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