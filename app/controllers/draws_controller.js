import Game from '../models/game'
import GameData from '../models/gameData'
import UpdateTimes from '../models/updateTimes'
import js2xmlparser from 'js2xmlparser';

export async function generateResultsjson() {
  // find all games
  const allGames = await Game.find({});
  const allLotteries = {};

  // loop through all the games and find the most recent GameData
  for (let game of allGames){
      let recentGameData, recentGameUpdateTime, nextGameData, nextGameUpdateTime;
      const lotteryObj = {};
      const gameName = game.lotteryName;
      const gameData = await GameData.find({game}).sort({date: -1});

    try {
      nextGameData = gameData[0];
      nextGameUpdateTime = await UpdateTimes.findOne({gameData: nextGameData});
      lotteryObj.nextDraw = {
        drawDate: nextGameData.date || 'N/A',
        jackpot: {
          jackpotAmount: nextGameData.jackpot || 'N/A',
          updateTime: nextGameUpdateTime.jackpot.updateTime || 'N/A'
        }
      };

      if (gameData.length > 1) {
        recentGameData = gameData[1];
        recentGameUpdateTime = await UpdateTimes.findOne({gameData: recentGameData});

        lotteryObj.recentDraw = {
          drawDate: recentGameData.date || 'N/A',
          winningNumbers: {
            numbers: recentGameData.numbers || 'N/A',
            updateTime: recentGameUpdateTime.numbers.updateTime || 'N/A'
          },
          jackpot: {
            jackpotAmount: recentGameData.jackpot || 'N/A',
            updateTime: recentGameUpdateTime.jackpot.updateTime || 'N/A'
          }
        };
      }

      // Add most recent game data to object with all the lotteries
      allLotteries[gameName] = lotteryObj;

    } catch(err) {
      console.log(err);
    }
  }
  return allLotteries
}

export async function generateResultsXml() {
  // find all the games
  const allGames = await Game.find({});
  const gameArray = [];

  // loop through all of the games
  for (let game of allGames) {
    let xmlGame;
    const gameName = game.lotteryName;

    // find the most recent game data
    const gameData = await GameData.find({ game }).sort({ date: -1 });

    // skip game if there is not game data
    if (!gameData.length) continue;

    const nextGameData = gameData[0];
    const nextGameUpdateTime = await UpdateTimes.findOne({ gameData: nextGameData });

    if (gameData.length > 1) {
      const recentGameData = gameData[1];
      const recentGameUpdateTime = await UpdateTimes.findOne({gameData: recentGameData});

      // create xml template for the game data.
      xmlGame = {
        "@": {
          "name": gameName
        },
        "nextDraw": {
          "drawDate": nextGameData.date,
          "jackpot": {
            "@": {"updateTime": nextGameUpdateTime.jackpot.updateTime},
            "#": nextGameData.jackpot
          }
        },
        "recentDraw": {
          "drawDate": recentGameData.date,
          "winningNumbers": {
            "@": {"updateTime": recentGameUpdateTime.numbers.updateTime},
            "#": recentGameData.numbers.toString()
          },
          "jackpot": {
            "@": {"updateTime": recentGameUpdateTime.jackpot.updateTime},
            "#": recentGameData.jackpot
          }
        }
      };
    } else {
      // create xml template for the game data.
      xmlGame = {
        "@": {
          "name": gameName
        },
        "nextDraw": {
          "drawDate": nextGameData.date,
          "jackpot": {
            "@": {"updateTime": nextGameUpdateTime.jackpot.updateTime},
            "#": nextGameData.jackpot
          }
        }
      };
    }



    gameArray.push(xmlGame);
  }

  // create the final xml template
  const xmlTemplate = {
    "game": gameArray
  };

  return js2xmlparser("allgames", xmlTemplate);
}


export async function individualLotteryjson( gameName, draws ) {
  const game = await Game.findOne({ lotteryName: gameName });

  // If there is no game associated with the name given by the user then return an error message
  if (!game) return { errorMessage: 'Game Name Not Found' };

  const limit = parseInt(draws);

  const allGameData = await GameData.find({ game: game._id }).sort({ date: -1 }).limit( limit );


  const json = {};
  const gameDataArray = [];

  for (let gameData of allGameData){

    const updateTimes = await UpdateTimes.findOne({ gameData });

    const lotteryObj = {
      drawDate: gameData.date,
      winningNumbers: {
        numbers: gameData.draw_numbers,
        updateTime: updateTimes.numbers.updateTime
      },
      jackpot: {
        jackpotAmount: gameData.jackpot,
        updateTime: updateTimes.jackpot.updateTime
      }
    };

    if (gameData.next_jackpot) lotteryObj.next_jackpot = gameData.next_jackpot;
    gameDataArray.push(lotteryObj);
  }
  json[gameName] = gameDataArray;
  return json
}