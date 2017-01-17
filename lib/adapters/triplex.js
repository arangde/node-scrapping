import moment from 'moment';
import { getData } from '../helpers/getData';
export const triplexRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "triplex",
    regions: ["QC"],
    url: "https://loteries.lotoquebec.com/en/lotteries/triplex",
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
    lotteryName: "triplex",
    regions: ["QC"],
    url: "http://www.lottostrategies.com/script/winning_of_past_month/100/QCG/QC/Quebec-QC-Triplex-lottery-results.html",
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
          let jackpot = await getData({
            url: 'http://www.lotterycanada.com/quebec-triplex',
            path: 'li:contains("Grand Prize")',
            transform: async (html) => {
              let jackpot = /([$][0-9,]{3,})/g.exec(html.first().text())[1].trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
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


export const triplexNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "triplex",
    regions: ["QC"],
    url: "http://www.lotterycanada.com/quebec-triplex",
    data: {
      jackpot: {
        path: "li:contains('Grand Prize')",
        transform: async (html) => {
          let jackpot = html.first().text().split("-")[1];
          return parseInt(jackpot.replace(/\D/g, ""));
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
    lotteryName: "triplex",
    regions: ["QC"],
    url: "http://www.lottostrategies.com/script/last_results/264/QC/quebec-lottery-results.html",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://loteries.lotoquebec.com/en/lotteries/triplex',
            path: 'div.lqZoneDetailsStructureLots tr:contains("5/5") > td:nth-child(2)',
            transform: async (html) => {
              let jackpot = html.first().text().trim().replace(/\D/g,"");
              return parseInt(jackpot);
            }
          });
          return jackpot;
        }
      },
      date: {
        path: "a[title*='Quebec Triplex']",
        transform: async (html) => {
          let date = html.first().next().next().find("b").eq(0).text();
          date = await moment(date, "ddd, MMM DD").format();
          return date;
        }
      }
    }
  },
];