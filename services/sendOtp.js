var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'serawatpremchand143@gmail.com',
    pass: 'panditji9571'
  }
});

var mailOptions ={
  from:'serawatpremchand143@gmail.com',
  to: email,
  subject: 'Sending Email using Node.js ${otp}',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
module.export= mailOptions;
module.exports =transporter;
