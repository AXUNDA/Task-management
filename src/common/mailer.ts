import nodemailer from "nodemailer";
import config from "./config";

export default async function mail(to: string, subject: string, text: string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL,
      pass: config.PASSWORD,
    },
  });
  const mailOptions = {
    from: config.EMAIL,
    to,
    subject,
    // html: "<p>Your html here</p>",
    text,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}
