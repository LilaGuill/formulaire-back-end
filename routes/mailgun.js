const express = require("express");
const router = express.Router();
const mailgun = require("mailgun-js");
require("dotenv").config();

router.post("/send", (req, res) => {
  console.log(req.fields);
  try {
    const DOMAIN = process.env.DOMAIN;
    const mg = mailgun({
      apiKey: process.env.APIKEY,
      domain: DOMAIN
    });
    const data = {
      from: "Mailgun Sandbox <postmaster@" + DOMAIN + ">",
      to: "lila.guillermic@gmail.com",
      subject: "MailGun - Nouveau message",
      text: `subject: ${req.fields.subject}
       from: ${req.fields.name}
       message: ${req.fields.message}
       email: ${req.fields.email} `
    };

    mg.messages().send(data, function(error, body) {
      // console.log(body);
    });
    res.send("message envoyé");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
