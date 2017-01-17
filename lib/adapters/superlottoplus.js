import moment from 'moment';
export const superlottoplusRecent = [
  // scraper for the recently passed draw (primary)
  {
    lotteryName: "superlottoplus",
    regions: ["CA"],
    url: "http://www.calottery.com/play/draw-games/superlotto-plus",
    data: {
      numbers: {
        path: 'ul.winning_number_sm',
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<6;i++){
            numbers[i] = html.first().find("span").eq(i).text();
          }
          return numbers;

        } 
      },
      jackpot: {
        path: "table.draw_games tbody tr",
        transform: async (html) => {
          let jackpot = html.first().children().last().text();
          jackpot = parseInt(jackpot.replace(/\D/g, ""));
          return jackpot;
        }
      },
      date: {
        path: "h3.date",
        transform: async (html) => {
          let text = html.first().text().split("|")[0].replace(/(\s)/g, "");
          const date = await moment(text, "dddd, MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  },

  // scraper for the recently passed draw (backup)
  {
    lotteryName: "superlottoplus",
    regions: ["CA"],
    url: "http://www.lotteryusa.com/california/super-lotto-plus/",
    data: {
      numbers: {
        path: "td.result ul",
        transform: async (html) => {
          let numbers = [];
          for(let i=0;i<6;i++){
            let number = html.first().find("li").eq(i).text();
            numbers[i] = number.replace(/([a-zA-z ])/g, "");
          }
          return numbers;
        }
      },
      jackpot: {
        path: "span.jackpot-amount",
        transform: async (html) => {
          let jackpot = html.first().text();
          return parseInt(jackpot.replace(/\D/g, ""));
        }
      },
      date: {
        path: "time",
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const superlottoplusNext = [
  // scraper for the next draw (primary)
  {
    lotteryName: "superlottoplus",
    regions: ["CA"],
    url: "http://www.calottery.com/play/draw-games",
    data: {
      jackpot: {
        path: "ul.draw_games",
        transform: async (html) => {
          let lottery_info = html.first().find("img[alt='SuperLotto Plus']")
          let jackpot = lottery_info.parent().next().find("h2");
          jackpot = jackpot.text().replace(/\D/g, "");
          return parseInt(jackpot * 1000000);
        }
      },
      date: {
        path: "ul.draw_games",
        transform: async (html) => {
          let lottery_info = html.first().find("img[alt='SuperLotto Plus']")
          let date = lottery_info.parent().next().find("p").eq(1).text();
          date = date.replace("Jackpot", "").replace("*", "");
          date = await moment(date, "dddd,MMMM, D").format();
          return date;
        }
      }
    }
  },
  // scraper for the recently passed draw (backup)
  {
    lotteryName: "superlottoplus",
    regions: ["CA"],
    url: "http://www.lotteryusa.com/california/",
    data: {
      jackpot: {
        path: "div.game-title:contains('Super Lotto PLUS')",
        transform: async (html) => {
          let next_jackpot = html.first().parents("tr").eq(0).children();
          next_jackpot = next_jackpot.last().find("span").eq(0);
          let jackpot_amount = next_jackpot.clone().children().remove().end().text();
          return parseInt(jackpot_amount.replace(/\D/g, ''));
        }
      },
      date: {
        path: "div.game-title:contains('Super Lotto PLUS')",
        transform: async (html) => {
          let next_jackpot = html.first().parents("tr").eq(0).children().last();
          let date = next_jackpot.find("span.next-draw-date").eq(0).text();
          date = await moment(date, "ddd, MMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];