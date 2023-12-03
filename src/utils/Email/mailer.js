// Rename the file to sendEmail.cjs
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const sendEmail = async (receiver, sender, subject, template) => {
  const transport = await nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_FROM,
      password: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: sender,
    to: receiver,
    subject,
    html: template,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending error:', error);
    } else {
      console.log('Email sent:', info);
    }
  });
};

export default sendEmail;
