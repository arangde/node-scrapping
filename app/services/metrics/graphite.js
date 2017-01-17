import net from 'net';
const env = process.env.NODE_ENV || 'development';
const PREFIX = `lottery_scraper.${env}`;

/**
 * Simple client for Hosted graphite
 */
class Graphite {
  constructor (apiKey, host, prefix = PREFIX) {
    this.apiKey = apiKey;
    this.port = 2003;
    this.host = host;
    this.prefix = prefix;
  }


  sendData (name, count = 1, timestamp = Date.now()) {
    const apiKey = this.apiKey;
    const prefix = this.prefix;

    const socket = net.createConnection({port: this.port, host: this.host}, () => {
      const key = `${prefix}.${name}`;
      const value = count;
      const message = `${apiKey}.${key} ${value}\n`;

      socket.write(message);
      socket.end();
    }).on('error', () => {
      // skip
    });
  }
}


const graphite = new Graphite(process.env.HOSTEDGRAPHITE_API_KEY, process.env.HOSTEDGRAPHITE_HOST);

export default graphite;