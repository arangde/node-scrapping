import moment from 'moment';
export const lottomaxRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "lottomax",
    regions: ["CAN"],
    url: "https://loteries.lotoquebec.com/en/lotteries/lotto-max",
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
          return parseInt(jackpot.split(".")[0].replace(/\D/g, ""));
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
    lotteryName: "lottomax",
    regions: ["CAN"],
    url: "https://www.lotterypost.com/lottomax",
    data: {
      numbers: {
        path: "div.resultsRow",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<8;i++){
            numbers[i] = html.find("ins").eq(i).text();
          }
          return numbers;
        }
      },
      jackpot: {
        path: "td.info",
        transform: async (html) => {
          let jackpot_1 = html.first().find("p.resultsJackpot").text().split("US")[0];
          if (jackpot_1.indexOf("Million") >= 0){
            jackpot_1 = parseFloat(jackpot_1.replace(/[^0-9.]+/g, "")) * 1000000;
          } else {
            jackpot_1 = parseFloat(jackpot_1.replace(/[^0-9.]+/g, ""));
          }
          
          let jackpot_2 = html.first().find("span.jackpotchange").text().split("US")[0];
          if (jackpot_2.indexOf("Million") >= 0){
            jackpot_2 = parseFloat(jackpot_2.replace(/[^0-9.]+/g, "")) * 1000000;
          } else {
            jackpot_2 = parseFloat(jackpot_2.replace(/[^0-9.]+/g, ""));
          }

          let change = html.first().find("ins.sprite-jackpot-up-16").length;
          if (change == 1){
            return parseInt(jackpot_1 - jackpot_2);
          } else {
            return parseInt(jackpot_1 + jackpot_2);
          }
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


export const lottomaxNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "lottomax",
    regions: ["CAN"],
    url: "http://www.lotterycanada.com/lotto-max",
    data: {
      jackpot: {
        path: "h4:contains('Estimated Jackpot')",
        transform: async (html) => {
          let jackpot = html.first().text().split("-")[1];
          jackpot = parseFloat(jackpot.replace(/[^0-9.]+/g, ""));
          return parseInt(jackpot);
        }
      },
      date: {
        path: "h4:contains('Estimated Jackpot')",
        transform: async (html) => {
          let date = html.first().text().split("-")[0].split("for")[1];
          date = await moment(date, "MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // scraper for the next draw (backup)
  {
    lotteryName: "lottomax",
    regions: ["CAN"],
    url: "https://www.lotterypost.com/lottomax",
    data: {
      jackpot: {
        path: "td.info",
        transform: async (html) => {
          let jackpot_1 = html.first().find("p.resultsJackpot").text().split("US")[0];
          if (jackpot_1.indexOf("Million") >= 0){
            jackpot_1 = parseFloat(jackpot_1.replace(/[^0-9.]+/g, "")) * 1000000;
          } else {
            jackpot_1 = parseFloat(jackpot_1.replace(/[^0-9.]+/g, ""));
          }
          return parseInt(jackpot_1);
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