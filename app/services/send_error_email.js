var nodemailer = require('nodemailer');

export async function sendErrorEmail (lotteryName, url) {
// create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://jpon44%40gmail.com:Pinetrees@smtp.gmail.com');

// setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Autolotto Feeds" <jpon44@gmail.com>', // sender address
    to: 'jared@autolotto.com', // list of receivers
    subject: 'Autolotto Feeds Down', // Subject line
    text: `${lotteryName}: ${url}`, // plaintext body
    html: `<b>${lotteryName}: ${url}</b>` // html body
  };

// send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}