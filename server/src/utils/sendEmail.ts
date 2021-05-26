"use strict";
import nodemailer from "nodemailer";

export async function sendEmail(to: string, text: string) {
   let testAccount = await nodemailer.createTestAccount();
   console.log(testAccount, "testAccount");

   let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
         user: testAccount.user, // generated ethereal user
         pass: testAccount.pass, // generated ethereal password
      },
   });

   // send mail with defined transport object
   let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: to,
      subject: "Change password", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
   });

   console.log("Message sent: %s", info.messageId);
   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

   // Preview only available when sending through an Ethereal account
   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
