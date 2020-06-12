const nodemailer = require('nodemailer');

const sendEmail = async options => {
  console.log('sendemail');
  // 1) creating a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  //   2) defining an email to send
  const mailOptions = {
    from: 'Yurii <admin@mail.ru>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  //   3) sending
  await transporter.sendMail(mailOptions);

  //   const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'ny.iuriiiweb@gmail.com',
  //       pass: 'dongerOfHell'
  //     }
  //   });
  //   const mailOptions = {
  //     from: 'ny.iuriiiweb@gmail.com',
  //     to: 'n.swiatoslawa@gmail.com',
  //     subject: 'poprostu testuje swoja apke :-)',
  //     text: 'odpisz jakszo policzysz to'
  //   };
  //   try {
  //     await transporter.sendMail(mailOptions);
  //     console.log('sendemail');
  //   } catch (error) {
  //     console.log(error + 'eroor');
  //   }
};
module.exports = sendEmail;
