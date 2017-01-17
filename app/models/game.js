import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const Game = new Schema({
  // regions: [ {type : mongoose.Schema.ObjectId, ref : 'regions'} ],
  game_id: {
    type: String
  },
  lotteryName: {
    type: String,
    unique: true
  },
  regions:{
    type: Array
  }
});

Game.plugin(timestamps);

Game.statics.findOrCreateGame = async function({ lotteryName, regions} ) {
    let game = await this.findOne({ lotteryName, regions });
    if (!game) {
      game = await this.create({lotteryName, regions});
      console.log('New game created');
    }
    return game;
};

export default mongoose.model('game', Game);
