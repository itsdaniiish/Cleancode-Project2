const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'speak2danishofficially@gmail.com',
    pass: 'zwle evny knlj xpqe'
  }
});

function sendEmail(from, to, subject, text, callback) {
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, 'Email sent: ' + info.response);
    }
  });
}

module.exports = { sendEmail };
