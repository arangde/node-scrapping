import moment from 'moment';
import { getData } from '../helpers/getData';
export const toutourienRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "toutourien",
    regions: ["QC"],
    url: "https://loteries.lotoquebec.com/en/lotteries/tout-ou-rien",
    data: {
      numbers: {
        path: "div.numeros",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<12;i++){
            numbers[i] = html.first().find("span.num").eq(i).text();
          }
          return numbers;

        } 
      },
      jackpot: {
        path: "tr > td:contains('$')",
        transform: async (html) => {
          let jackpot = parseInt(html.first().text().replace(/\D/g,""));
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
    lotteryName: "toutourien",
    regions: ["QC"],
    url: "http://www.lottostrategies.com/script/winning_of_past_month/100/QCT/QC/Quebec-QC-TOUT-OU-RIEN-lottery-results.html",
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
        path: "a.dgtitle",
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lottosignals.com/lottery/tout-ou-rien',
            path: 'p',
            transform: async (html) => {
              let jackpot = parseInt(/([$][0-9,]{3,})/g.exec(html.text())[1].trim().replace(/\D/g,""));
              return jackpot;
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


export const toutourienNext = [
  // scraper for the next draw (backup)
  {
    lotteryName: "toutourien",
    regions: ["QC"],
    url: "http://www.lotterycanada.com/tout-ou-rien",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://loteries.lotoquebec.com/en/lotteries/tout-ou-rien',
            path: "tr > td:contains('$')",
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
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
  // scraper for the next draw (primary)
  {
    lotteryName: "toutourien",
    regions: ["QC"],
    url: "http://www.lottostrategies.com/script/last_results/264/QC/quebec-lottery-results.html",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          let jackpot = await getData({
            url: 'https://www.lottosignals.com/lottery/tout-ou-rien',
            path: 'p',
            transform: async (html) => {
              let jackpot = parseInt(/([$][0-9,]{3,})/g.exec(html.text())[1].trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: "a[title*='TOUT OU RIEN']",
        transform: async (html) => {
          let date = html.first().next().next().find("b").eq(0).text();
          date = await moment(date, "DDD, MMM DD").format();
          return date;
        }
      }
    }
  },
];