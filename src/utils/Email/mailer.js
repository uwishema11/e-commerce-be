// Rename the file to sendEmail.cjs
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const sendEmail = async (receiver, subject, template) => {
  const transport = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `UC E-commerce Team<${process.env.USER_EMAIL}>`,
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
