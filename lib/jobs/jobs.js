import * as scrapers from "../adapters";
import { processAll } from '../index';

export default function ( agenda ) {
  // const scrapeFrequency = '10 seconds';
  const scrapeFrequency = '30 minutes';

  agenda.on('ready', function () {
    // TODO: refactor this incorrect iteration so we do not have to use - scrapers[scraper]
    for (const scraper in scrapers) {

      const scrapeSpecs = scrapers[scraper];


      agenda.define(scraper, async function (job, done) {
        try {
          await processAll(scrapeSpecs);
          done()
        } catch (err) {
          done(err);
        }
      });

      agenda.every(scrapeFrequency, scraper);
    }

    agenda.start();
  });
}
