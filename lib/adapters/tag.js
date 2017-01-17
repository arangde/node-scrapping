import moment from 'moment';
import { getData } from '../helpers/getData';
export const tagRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "tag",
    regions: ["AC"],
    url: "https://www.lotterypost.com/game/232",
    data: {
      numbers: {
        path: "div.resultsRow",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<6;i++){
            numbers[i] = html.first().find("ins").eq(i).text();
          }
          return numbers;

        } 
      },
      jackpot: {
        path: "",
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://corp.alc.ca/tag.aspx',
            path: 'td.chartPadding > table tr:contains("All 6 digits") > td:contains("$")',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: "div.resultsDrawDate",
        transform: async (html) => {
          let date = html.first().text();
          return await moment(date, "dddd, MMMM DD, YYYY").format();
        }
      }
    }
  },

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "tag",
    regions: ["AC"],
    url: "http://www.lottostrategies.com/script/winning_of_past_month/100/AC3/AC/Atlantic-Canada-AC-Tag-lottery-results.html",
    data: {
      numbers: {
        path: "div.datagrid table",
        transform: async (html) => {
          let numbers = html.first().find("tbody").eq(1).find("tr").eq(0);
          numbers = numbers.find("b").eq(0).text().split(" ");
          return numbers;
        }
      },
      jackpot: {
        path: "",
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotterycanada.com/atlantic-tag',
            path: 'div.mod-mostpop > ul:nth-of-type(1)',
            transform: async (html) => {
              let jackpot = parseInt(/([$][0-9,]{3,})/g.exec(html.first().text())[1].trim().replace(/\D/g,""));
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

export const tagNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "tag",
    regions: ["AC"],
    url: "https://www.lotterypost.com/game/232",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://corp.alc.ca/tag.aspx',
            path: 'td.chartPadding > table tr:contains("All 6 digits") > td:contains("$")',
            transform: async (html) => {
              let jackpot = parseInt(html.first().text().trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
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
  // scraper for the next draw (backup)
  {
    lotteryName: "tag",
    regions: ["AC"],
    url: "http://www.lottostrategies.com/script/last_results/261/AC/atlantic-canada-lottery-results.html",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          let jackpot = await getData({
            url: 'http://www.lotterycanada.com/atlantic-tag',
            path: 'div.mod-mostpop > ul:nth-of-type(1)',
            transform: async (html) => {
              let jackpot = parseInt(/([$][0-9,]{3,})/g.exec(html.first().text())[1].trim().replace(/\D/g,""));
              return jackpot;
            }
          });
          return jackpot;
        }
      },
      date: {
        path: "a[title*='Atlantic Canada Tag']",
        transform: async (html) => {
          let date = html.first().next().next().find("b").eq(0).text();
          date = await moment(date, "ddd, MMM DD").format();
          return date;
        }
      }
    }
  },
];