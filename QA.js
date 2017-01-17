import {process, processAll} from './lib/index'
import mongoose from 'mongoose';
const mongoURL = 'mongodb://localhost/scraper';
mongoose.connect(mongoURL);


import {astroNext, astroRecent} from './lib/adapters/astro';

(async function () {

  const data1 = await process(astroNext[0]);

  const data2 = await process(astroNext[1]);

  const data3 = await process(astroRecent[0]);

  const data4 = await process(astroRecent[1]);

  console.log(data1);
  console.log(typeof data1.jackpot);

  console.log(data2);
  console.log(typeof data2.jackpot);

  console.log(data3);
  console.log(typeof data3.jackpot);

  console.log(data4);
  console.log(typeof data4.jackpot);
})();