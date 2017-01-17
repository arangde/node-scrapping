import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const UpdateTimes = new Schema({
  gameData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'gameData',
    index: true
  },
  jackpot: {
    url: { type: String},
    updateTime: { type: Date },
    jackpot: { type: Number}
  },
  numbers:{
    url: { type: String},
    updateTime: { type: Date },
    numbers: { type: Array}
  }
});

UpdateTimes.plugin(timestamps);

export default mongoose.model('updateTimes', UpdateTimes);