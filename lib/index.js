import Error from '../app/models/error';
import Game from '../app/models/game';
import GameData from '../app/models/gameData';
import cheerio from 'cheerio';
import axios from 'axios';

/**
 * This will fetch the page of the input url using axios
 * @param {String} url - The url to fetch from
 * @returns {cheerio} - The cheerio parsed body or undefined if there was an error
 */
export async function fetch (url) {
  try {
    const {data: response} = await axios.get(url);
    return cheerio.load(response);
  } catch (err) {
    throw new Error('Could not fetch URL');
  }
}

/**
 * Processes the source (primary or backup)
 * @param sourceOptions - object containing url, lotteryName data and regions
 * @returns {{lotteryName: String, regions: array of Strings, jackpot: integer, date: date Object  }}
 */
export async function process(sourceOptions) {
  const { url, lotteryName, data: dataSpecs, regions } = sourceOptions;

  const $ = await fetch(url);

  // instantiate object that will have all scraped values
  const entity = {
    lotteryName,
    regions
  };

  // process each field in the source
  for (const key in dataSpecs) {
    const spec = dataSpecs[key];

    // if no transformations are needed then set text as data
    let value = $(spec.path).text();

    // transformation is set then perform

    if (spec.transform) {
      try {
        value = await spec.transform($(spec.path));
      } catch(err) {
        console.log('transformError');
        throw new Error('transform error');
      }
    }

    // assign to entity object
    // value:  data returned from the scrape
    // key: data field ie) date
    entity[key] = value;
  }

  return entity;
}

/**
 * The main function to process the primary and backup sources
 * It will fetch the url, parse the data, create games, gameDatas and log errors
 * @param lotterySources an array of two objects that have the specs for the scraper
 */
export async function processAll(lotterySources) {
  let data;

  // keep track of which url:script pairing we are using
  let i = 0;
  // track if a successful scrape has already occurred
  let success = false;

  // process the primary and backup of each lottery source
  for (const source of lotterySources) {

    // if the lottery has been successfully scraped in previous loop then do not perform secondary scrape
    if (success == true) break;
    // increment loop we are currently on.
    i++;

    let { lotteryName, url, regions } = source;

    try{
      data = await process(source);
    } catch(err) {
      console.log(`Error: Process Function`, err);

      await Error.createError({
        lotteryName,
        url,
        scraperNumber: i,
        type: 'PROCESS',
        message: err,
        stack: err.stack
      });
      // jump to next loop
      continue;
    }
    // if no data object is returned from process there was a problem performing the request to the url
    // create an error of type url.
    
    // check to see that our scraped returned a date and jackpot
    if (!data.date || !data.jackpot) {
      console.log('Error: Parsing Date or Jackpot');

      // create an error type: PARSE DATE JACKPOT
      await Error.createError({
        lotteryName,
        url,
        scraperNumber: i,
        type: 'DATE,JACKPOT',
        message: `date: ${data.date}, jackpot: ${data.jackpot}, numbers: ${data.numbers}`
      });

      // jump to next loop
      continue;
    }

    // if numbers were returned in the data object (recent draw) validate them.
    if ( data.numbers != undefined) {
      // Create error if the numbers are not an array, if there are not elements in the array or if the first element is an empty string
      if ( data.numbers.constructor != Array || data.numbers.length == 0 || data.numbers[0] == "") {
        console.log('Error: Parsing Numbers');

        // create an error type: PARSE NUMBERS
        await Error.createError({
          lotteryName,
          url,
          scraperNumber: i,
          type: 'NUMBERS',
          message: `date: ${data.date}, jackpot: ${data.jackpot}, numbers: ${data.numbers}`
        });

        continue;
      }
    }

    // if lottery was scraped successfully then set to true
    success = true;

    // finds or creates a game using the lottery name
    const game = await Game.findOrCreateGame({ lotteryName, regions });

    // declare parameters to make a new game using recently passed draw
    const gameDataParams = {
      game,
      date: data.date,
      jackpot: data.jackpot,
      url: url
    };

    // add scraped Numbers to game Data Params if they exist (upcoming draw will not have numbers)
    if (data.numbers) gameDataParams.numbers = data.numbers;

    return await GameData.findOrCreateGameData(gameDataParams);
  }
}