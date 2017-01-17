import moment from 'moment';
export const astroRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'astro',
    regions: ['QC'],
    url:"https://loteries.lotoquebec.com/en/lotteries/astro",
    data: {
      numbers: {
        path: 'div.numeros',
        transform: async (html) => {
          const numbers = [];

          numbers[0] = html.first().children(".jour").first().text().toUpperCase();
          numbers[1] = html.first().children(".mois").first().text().toUpperCase();
          numbers[2] = html.first().children(".annee").first().text().toUpperCase();
          numbers[3] = html.first().first().children(".signe").first().children().first().attr("alt").toUpperCase();
          return numbers;

        }
      },
      jackpot: {
        path: 'div.lqChampRiche li:nth-child(2)',
        transform: async (html) => {
          let jackpot = /(?:GRAND PRIZE: )(\$[0-9,]+)/g.exec(html.first().text())[1];
          return jackpot.replace(/\D/g, '');
        }
      },
      date: {
        path: 'div#dateAffichee',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "YYYY-MM-DD").format();
          return date;
        }
      }
    }
  },

  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'astro',
    regions: ['QC'],
    url:"http://www.lotterycanada.com/quebec-astro",
    data: {
      numbers: {
        path: 'h4 span.label',
        transform: async (html) => {
          const numbers = [];
          for(let i=0; html.eq(i).text() != ""; i++){
            numbers[i] = html.eq(i).text().toUpperCase();
          }
          return numbers;
        }
      },
      jackpot: {
        path: 'div.mod-mostpop li',
        transform: async (html) => {
          return parseInt(/(\$[0-9,]{3,})/mig.exec(html.text())[1].replace(/\D/g,""));
        }
      },
      date: {
        path: 'span.draw-date',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "- MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];


export const astroNext = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'astro',
    regions: ['QC'],
    url:"https://loteries.lotoquebec.com/en/lotteries/astro",
    data: {
      jackpot: {
        path: 'div.lqChampRiche li:nth-child(2)',
        transform: async (html) => {
          let jackpot = /(?:GRAND PRIZE: )(\$[0-9,]+)/g.exec(html.first().text())[1];
          jackpot = parseInt(jackpot.replace(/\D/g,''));
          return jackpot;
        }
      },
      date: {
        path: 'div#dateCourante',
        transform: async (html) => {         
          const text = html.first().text();
          const date = await moment(text, "YYYY-MM-DD").format();
          return date;
        }
      }
    }
  },
  // Scraper for the recently passed draw (Backup)
  {
    lotteryName:'astro',
    regions: ['QC'],
    url:"http://www.lotterycanada.com/quebec-astro",
    data: {
      jackpot: {
        path: 'div.mod-mostpop li',
        transform: async (html) => {
          return parseInt(/(\$[0-9,]{3,})/mig.exec(html.text())[1].replace(/\D/g,""));
        }
      },
      date: {
        path: 'span strong',
        transform: async (html) => {
          const text = html.first().text();
          const date = await moment(text, "MMMM DD, YYYY").format();
          return date;
        }
      }
    }
  }
];