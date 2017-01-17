import moment from 'moment';
import cheerio from 'cheerio';
const gameURL = "https://loteries.lotoquebec.com/en/lotteries/banco";
const backupURL = "http://www.lotterycanada.com/quebec-banco";
export const bancoRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'banco',
    regions: ['QC'],
    url:gameURL,
    data: {
      numbers: {
        path: '.lqZoneProduit.principal.banco .lqZoneResultatsProduit .numeros',
        transform: async (html) => {
          const scrapedNumbers = [], length = html.find("span.num").length;
          for(let i=0; i<length; i++) {
            scrapedNumbers.push(html.find("span.num").eq(i).text());
          }
          return scrapedNumbers;
        }
      },
      jackpot: {
        path: '.categories.c1 tr:nth-child(2) td.valeurLot.sur2col',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.lqZoneDate #dateAffichee',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "YYYY-MM-DD").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'banco',
    regions: ['QC'],
    url:backupURL,
    data: {
      numbers: {
        path: '.panel-body .well .row .col-xs-12.text-center h4',
        transform: async (html) => {
          const scrapedNumbers = [], length = html.find("span.label-number").length;
          for(let i=0; i<length; i++) {
            scrapedNumbers.push(html.find("span.label-number").eq(i).text());
          }
          return scrapedNumbers;
        }
      },
      jackpot: {
        path: 'table.oddWinning tr',
        transform: async (html) => {
          const $ = cheerio.load(html);
          const row = html.filter(function () {
            return $(this).children().eq(1).text() == "10";
          });
          const text = row.children().eq(2).text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.panel-heading .panel-title .lottery-name .draw-date',
        transform: async (html) => {
          const text = html.text().replace("- ", "");
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const bancoNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'banco',
    regions: ['QC'],
    url:gameURL,
    data: {
      jackpot: {
        path: '.categories.c1 tr:nth-child(2) td.valeurLot.sur2col',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.lqZoneDate #dateCourante',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "YYYY-MM-DD").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'banco',
    regions: ['QC'],
    url:backupURL,
    data: {
      jackpot: {
        path: 'table.oddWinning tr',
        transform: async (html) => {
          const $ = cheerio.load(html);
          const row = html.filter(function () {
            return $(this).children().eq(1).text() == "10";
          });
          const text = row.children().eq(2).text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '.panel-footer .col-xs-8 span strong',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "MMMM D, YYYY").format();
          return date;
        }
      }
    }
  }
];