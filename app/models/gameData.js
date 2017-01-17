import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import UpdateTimes from '../models/updateTimes';
import moment from 'moment-timezone';
import compareArrays from '../../lib/helpers/compareArrays';

const GameData = new Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'game',
    index: true
  },
  date: {
    type: Date,
    required: true
  },
  numbers: {
    type: Array,
    default: []
  },
  jackpot: {
    type: Number
  }
});

GameData.plugin(timestamps);


GameData.statics.findOrCreateGameData = async function({ game, date, numbers, jackpot, url }) {
  let gameData;

  // get the current Date
  const currentDate = await moment.tz('America/New_York').toDate();

  // try and find a game data that is for the specific game and matching date
  gameData = await this.findOne({ game, date });

  // if gameData is found then check to see if the draw numbers or jackpot amount has changed, if it has then update and save the updateTimes
  if ( gameData ) {

    // find an updateTime for the gameData, it will always exist if a gameData exists
    const updateTimes = await UpdateTimes.findOne({ gameData });

    // check to see if we have scraped draw numbers, if they do not exist then the draw hasn't occurred or something has gone wrong
    if (numbers) {
      // check to see if the draw numbers have changed, if they have changed then update the draw numbers for gameData
      if (!(await compareArrays(gameData.numbers, numbers))) {

        // update numbers for gameData and the updateTimes
        gameData.numbers = numbers;
        updateTimes.numbers = { url, updateTime: currentDate, numbers }
      }
    }

    // check to see if the jackpots have changed, if they have then update
    if (gameData.jackpot != jackpot) {

      // update the jackpot for gameData and the updateTimes
      gameData.jackpot = jackpot;
      updateTimes.jackpot = { url, updateTime: currentDate, jackpot };
    }

    gameData.save();
    updateTimes.save();
  }

  // if no matching gameData is found than create one.
  if (!gameData) {
    const gameDataParams = { game, date, jackpot };

    // include the draw numbers in gameData if they are available.
    if (numbers) gameDataParams.numbers = numbers;

    // create gameData
    gameData = await this.create(gameDataParams);

    const updateTimeParams = {
      gameData,
      jackpot: {
        url,
        updateTime: currentDate,
        jackpot
      }
    };

    if (numbers) updateTimeParams.numbers = { url, updateTime: currentDate, numbers };
    // create updateTime
    const updateTimes = await UpdateTimes.create(updateTimeParams);
    console.log('New game data and update time created');
  }

  return gameData;
};

export default mongoose.model('gameData', GameData);