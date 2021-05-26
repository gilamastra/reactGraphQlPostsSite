"use strict";
import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
   let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
         user: "ieyved3dj4bbohn4@ethereal.email",
         pass: "gyMjFYX5NbazEDe8bv",
      },
   });

   let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: to,
      subject: "Change password", // Subject line
      html,
   });

   console.log("Message sent: %s", info.messageId);

   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
