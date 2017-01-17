import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import Graphite from '../services/metrics/graphite'


const ErrorTypes = {
  process: 'PROCESS',
  parsing: 'PARSING',
  dateJackpot: 'DATE,JACKPOT',
  numbers: 'NUMBERS'
};

const Error = new Schema({
  lotteryName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  scraperNumber: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: Object.values(ErrorTypes)
  },
  message: {
    type: String
  },
  resolved: {
    type: Boolean,
    default: false
  }
});

Error.plugin(timestamps);

Error.statics.createError = async function(data){
  const { lotteryName, url, scraperNumber, type, message } = data;
  let error = await this.findOne({ lotteryName, url, scraperNumber, type, resolved: false }).sort({createdAt: -1});

  if (!error) {
    await this.create({ lotteryName, url, scraperNumber, type, message });
    console.log(`Error Created: ${lotteryName}, ${message}`);
  }

  Graphite.sendData(lotteryName);
};

export default mongoose.model('error', Error);