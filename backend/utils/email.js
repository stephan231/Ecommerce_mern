const nodemailer = require("nodemailer"); //to send email
const sendEmail = async (options) => {
  var transport = nodemailer.createTransport({
    serv: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      user: "ea045b2f483437",
      pass: "098e77c416662e",
    },
  });

  const transporter = nodemailer.createTransport(transport);
  const message = {
    from: `${process.env.SMTP_FROM_NAME}  <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(message);
};

module.exports = sendEmail;
