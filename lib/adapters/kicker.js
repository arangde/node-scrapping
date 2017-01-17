import moment from 'moment';
import { getData } from '../helpers/getData';
export const kickerRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "kicker",
    regions: ["OH"],
    url: "https://www.ohiolottery.com/Games/DrawGames/Classic-Lotto",
    data: {
      numbers: {
        path: "p.kickerWin span",
        transform: async (html) => {
          let numbers = html.first().text().split("");
          return numbers;
        } 
      },
      jackpot: {
        path: "",
        transform: async (html) => {
          return await getData({
            url: "https://www.ohiolottery.com/Games/DrawGames/Classic-Lotto/KICKER",
            path: "td.win",
            transform: async (html) => {
              return parseInt(html.first().text().replace(/\D/g, ""));
            }
          });
        }
      },
      date: {
        path: "div#classiclotto_winning_numbers span.date",
        transform: async (html) => {
          let date = html.first().text();
          return await moment(date, "MM DD YYYY").format();
        }
      }
    }
  },

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "kicker",
    regions: ["OH"],
    url: "https://www.lotterypost.com/game/262",
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
            url: "https://www.ohiolottery.com/Games/DrawGames/Classic-Lotto/KICKER",
            path: "td.win",
            transform: async (html) => {
              return parseInt(html.first().text().replace(/\D/g, ""));
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


export const kickerNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "kicker",
    regions: ["OH"],
    url: "https://www.ohiolottery.com/Games/DrawGames/Classic-Lotto",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          return await getData({
            url: "https://www.ohiolottery.com/Games/DrawGames/Classic-Lotto/KICKER",
            path: "td.win",
            transform: async (html) => {
              return parseInt(html.first().text().replace(/\D/g, ""));
            }
          });
        }
      },
      date: {
        path: "div#classiclotto_winning_numbers span.date",
        transform: async (html) => {
          let nextDate = await getData({
            url: 'http://www.lotteryusa.com/ohio/',
            path: 'tr:contains("Classic Lotto") span.next-draw-date',
            transform: async (html) => {
              let text = html.first().text().trim();
              let date = await moment(text,"ddd, MMM DD, YYYY").format(); 
              return date;
            }
          });
          return nextDate;
        }
      }
    }
  },

  // scraper for the next draw (backup)
  {
    lotteryName: "kicker",
    regions: ["OH"],
    url: "https://www.lotterypost.com/game/262",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          return await getData({
            url: "https://www.ohiolottery.com/Games/DrawGames/Classic-Lotto/KICKER",
            path: "td.win",
            transform: async (html) => {
              return parseInt(html.first().text().replace(/\D/g, ""));
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