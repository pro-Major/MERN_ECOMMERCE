//To send Forget Password Emails 
const nodemailer = require('nodemailer');

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        }
      });
      const message = { 
          From : `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
          To: options.email,
          Subject: options.subject,
          text: options.message
      }
      await transporter.sendMail(message)
}
module.exports = sendEmail;