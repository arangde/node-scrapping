import moment from 'moment';
const gameURL = 'https://www.national-lottery.com/lotto/results';
const backupURL = 'https://www.lottery.co.uk/lotto/results';
const backupNextURL = 'https://www.lotterypost.com/game/253';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getFloatValue, getNextJackpot } from '../helpers/lotteryPost';

export const millionaireraffleRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'millionaireraffle',
    regions: ['UK'],
    url:gameURL,
    data: {
      numbers: {
        path: '.resultsOuter.full.fluid .balls',
        transform: async (html) => {
          const text = html.text();
          const regex = /\d+/g;
          return text.match(regex);
        }
      },
      jackpot: {
        path: '.resultsOuter.full.fluid .jackpotAmt',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.resultsOuter.full.fluid .resultsHeader',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "dddd Do MMMM YYYY").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'millionaireraffle',
    regions: ['UK'],
    url:backupURL,
    data: {
      numbers: {
        path: '.resultBox',
        transform: async (html) => {
          const balls = html.not(".withSide.lottoResults").eq(0).find(".result.lotto-ball, .result.lotto-bonus-ball");
          const numbers = [];
          for(var i=0; i<balls.length; i++)
            numbers.push(balls.eq(i).text());
          return numbers;
        }
      },
      jackpot: {
        path: '.resultBox',
        transform: async (html) => {
          const jackpot = parseInt(html.not(".withSide.lottoResults").eq(0).find(".resultJackpot").text().replace(/\D/g,''));
          return jackpot;
        }
      },
      date: {
        path: '.resultBox .latestHeader.lotto .smallerHeading',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "Do MMMM YYYY").format();
          return date;
        }
      }
    }
  }
];

export const millionaireraffleNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'millionaireraffle',
    regions: ['UK'],
    url:gameURL,
    data: {
      jackpot: {
        path: '.fluid.playBox.lotto .jackpotArea .jackpotTxt',
        transform: async (html) => {
          return getFloatValue(html.text());
        }
      },
      date: {
        path: '.fluid.playBox.lotto .jackpotArea strong',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "dddd Do MMMM YYYY").format();
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'millionaireraffle',
    regions: ['UK'],
    url:backupNextURL,
    data: {
      jackpot: {
        path: '.resultsNextDrawInfoUnit:nth-child(2)',
        transform: async (html) => {
          return getNextJackpot(html);
        }
      },
      date: {
        path: '.resultsNextDrawInfoUnit:first-child .resultsNextDrawInfo label + p',
        transform: async (html) => {
          const text = html.text();
          return await moment(text, "ddd, MMM DD, YYYY").format();
        }
      }
    }
  }
];