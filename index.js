const express = require("express");
const cors = require("cors");
const middlewareFormidable = require("express-formidable");
const app = express();
app.use(middlewareFormidable());
app.use(cors());

const mailGun = require("./routes/mailgun");
app.use(mailGun);

app.listen(process.env.PORT, (req, res) => {
  console.log("server started");
});
