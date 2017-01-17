import moment from 'moment';
const gameURL = 'https://loteries.lotoquebec.com/en/lotteries/sprinto';
const backupURL = 'http://www.lotterycanada.com/sprinto';
const jackpotURL = 'https://loteries.espacejeux.com/en/play-online/rules#Sprinto';
import { getData } from '../helpers/getData';

export const sprintoRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "sprinto",
    regions: ["QC"],
    url: gameURL,
    data: {
      numbers: {
        path: "div.numeros",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<5;i++){
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
    lotteryName: "sprinto",
    regions: ["QC"],
    url: "http://www.lottostrategies.com/script/winning_of_past_month/100/QCS/QC/Quebec-QC-SprintO-lottery-results.html",
    data: {
      numbers: {
        path: "div.datagrid table",
        transform: async (html) => {
          let numbers = html.first().find("tbody").eq(1).find("tr").eq(0);
          numbers = numbers.find("b").eq(0).text().split("-");
          return numbers;
        }
      },
      jackpot: {
        path: "",
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: "#Sprinto",
            transform: async (html) => {
              let jackpot = html.parents(".magnoliaComponent").find("table.lqTableauDonnees.lq4Colonnes").last().find("tr:nth-child(3) td:last-child").first().text();
              jackpot = parseInt(jackpot.replace(/\D/g, ""));
              return jackpot;
            }
          });
          return nextJackpot;
        }
      },
      date: {
        path: "div.datagrid table",
        transform: async (html) => {
          let date = html.first().find("tbody").eq(1).find("tr").eq(0);
          date = date.find("code").eq(0).text();
          date = await moment(date, "ddd MM/DD/YY").format();
          return date;
        }
      }
    }
  }
];

export const sprintoNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "sprinto",
    regions: ["QC"],
    url: backupURL,
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          let nextJackpot = await getData({
            url: gameURL,
            path: "div.lqZoneDetailsStructureLots table",
            transform: async (html) => {
              let jackpot = html.first().find("tr").eq(1).children().last().text();
              jackpot = parseInt(jackpot.replace(/\D/g, ""));
              return jackpot;
            }
          });
          return nextJackpot;
        }
      },
      date: {
        path: "div.panel-footer div.row div:contains('Next Draw')",
        transform: async (html) => {
          let date = html.first().text().split(":")[1];
          date = await moment(date, "MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  },
  // scraper for the next draw (backup)
  {
    lotteryName: "sprinto",
    regions: ["QC"],
    url: "http://www.lottostrategies.com/script/last_results/264/QC/quebec-lottery-results.html",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          let nextJackpot = await getData({
            url: jackpotURL,
            path: "#Sprinto",
            transform: async (html) => {
              let jackpot = html.parents(".magnoliaComponent").find("table.lqTableauDonnees.lq4Colonnes").last().find("tr:nth-child(3) td:last-child").first().text();
              jackpot = parseInt(jackpot.replace(/\D/g, ""));
              return jackpot;
            }
          });
          return nextJackpot;
        }
      },
      date: {
        path: "a[title*='Quebec SprintO']",
        transform: async (html) => {
          let date = html.first().next().next().find("b").eq(0).text();
          date = await moment(date, "ddd, MMM DD").format();
          return date;
        }
      }
    }
  },
];