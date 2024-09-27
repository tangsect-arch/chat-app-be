import nodemailer from "nodemailer";

// Create a transporter object with your email service provider's configuration
let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
  },
});

// Define the mail sending middleware
const sendMail = async () => {
  //   const { recipient, subject, bodyText, bodyHtml } = req.body;

  const message = {
    from: process.env.EMAIL_ADDRESS,
    to: "myjobreg+imitate@gmail.com",
    subject: "test mail",
    text: "bodyText",
    html: "bodyHtml",
  };

  try {
    await transporter.sendMail(message);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = sendMailMiddleware;
