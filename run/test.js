import { processAll, process } from '../lib/index'
import { lottoukRecent, lottoukNext } from '../lib/adapters/lotto-uk.js'

(async function () {
  let data = null;

  data = await process(lottoukRecent[0]);
  console.log('lottoukRecent', data);
  console.log(typeof data.jackpot);

  data = await process(lottoukRecent[1]);
  console.log('backup of lottoukRecent', data);
  console.log(typeof data.jackpot);

  data = await process(lottoukNext[0]);
  console.log('lottoukNext', data);
  console.log(typeof data.jackpot);

  data = await process(lottoukNext[1]);
  console.log('backup of lottoukNext', data);
  console.log(typeof data.jackpot);
})()