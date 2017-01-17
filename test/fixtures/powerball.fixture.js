export default {
  lotteryName: 'powerball',
  regions: ['USA'],
  scrapeFrequency: '10 minutes',
  sources: [{
    url: 'http://www.powerball.com/pb_home.asp',
    data: {
      numbers: {
        path: '[id="numbers"] > table:first-child  tr:nth-child(2)',
        transform: ($) => $.text() + '!'
      }
    }
  }]
}
