var nodemailer = require('nodemailer');
var xoauth2 = require("xoauth2"),
    xoauth2gen;
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    xoauth2:xoauth2.createXOAuth2Generator({
    user: 'serawatpremchand143@gmail.com',
    pass: 'panditji9571',
    clientId: '',
        clientSecret: '',
        refreshToken:'',
  })
}
});

var mailOptions = {
  from: 'serawatpremchand143@gmail.com',
  to: 'opja2581.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log("can't send a mail");
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
module.exports =transporter;
