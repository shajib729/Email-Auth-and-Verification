const nodemailer = require('nodemailer');
const { generateEmail } = require('./temp');


const sendEmail = async (req, res) => {
    let { userEmail, subject, text } = req.body.emailData
    try {
      const transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
          user: 'shajib.dev@outlook.com',
          pass: 'shajib786',
          // pass: 'cxywvuqbbkbkfiwl'
        },
          // host: "smtp.mailtrap.io",
          // port: 2525,
          // auth: {
          //   user: "4dcec8ee488ab5",
          //   pass: "e40dbd2e5777b2"
          // }
      });

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: userEmail,
        subject: subject,
        html: generateEmail(text),
      };

        // call SIB api 
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(400).json({error:error})
        } else {
            res.status(200).json({message:info})
        }
      });
    } catch (err) {
        res.status(400).json({err:err.message})
    }
}

module.exports = sendEmail