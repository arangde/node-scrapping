import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const Region = new Schema({
  state_name: {
    type: String
  },
  state_id: {
    type: String
  },
  country: {
    type: String
  },
  games: [ {type : mongoose.Schema.ObjectId, ref : 'game'} ]
});

Region.plugin(timestamps);

export default mongoose.model('region', Region);
