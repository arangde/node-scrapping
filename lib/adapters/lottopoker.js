import moment from 'moment';
import { getData } from '../helpers/getData';
export const lottopokerRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "lottopoker",
    regions: ["QC"],
    url: "https://loteries.lotoquebec.com/en/lotteries/lotto-poker",
    data: {
      numbers: {
        path: "span.carte",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<5;i++){
            let current_card = html.eq(i).find("img").eq(0);
            
            let current_number = current_card.attr("src").split("/").pop();
            current_number = current_number.replace("D", "Q").replace("R", "K");
            current_number = current_number.replace("V", "J")
            current_number = current_number.split("_")[1].split(".")[0];

            let current_suit = current_card.attr("alt").split(" of ")[1][0];
            numbers[i] = current_number + current_suit;
          }
          return numbers;
        } 
      },
      jackpot: {
        path: "div.lqZoneDetailsStructureLots table",
        transform: async (html) => {
          return await getData({
            url: "http://www.lotterycanada.com/quebec-lotto-poker",
            path: "li:contains('on the lotto draw')",
            transform: async (html) => {
              return parseInt(html.first().text().replace(/\D/g, ""));
            }
          });
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
    lotteryName: "lottopoker",
    regions: ["QC"],
    url: "https://www.lotterypost.com/game/395",
    data: {
      numbers: {
        path: "img.playingcard",
        transform: async (html) => {
          const numbers = [];
          for(let i=0; i<5; i++){
            numbers[i]=html.eq(i).attr('src').replace(/((\/\/lp\.vg\/\images\/cards\/card-)|(\.png))/g, '');
          }
          return numbers;
        }
      },
      jackpot: {
        path: "",
        transform: async (html) => {
          return await getData({
            url: "https://loteries.lotoquebec.com/en/lotteries/lotto-poker",
            path: ".lq2Colonnes td:contains('$')",
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

export const lottopokerNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "lottopoker",
    regions: ["QC"],
    url: "http://www.lotterycanada.com/quebec-lotto-poker",
    data: {
      jackpot: {
        path: "li:contains('on the lotto draw')",
        transform: async (html) => {
          return parseInt(html.first().text().replace(/\D/g, ""));
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
    lotteryName: "lottopoker",
    regions: ["QC"],
    url: "https://www.lotterypost.com/game/395",
    data: {
      jackpot: {
        path: "",
        transform: async (html) => {
          return await getData({
            url: "https://loteries.lotoquebec.com/en/lotteries/lotto-poker",
            path: ".lq2Colonnes td:contains('$')",
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