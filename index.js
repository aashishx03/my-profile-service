const express = require("express");
require("dotenv").config();
const indexRoute = require("./routes");
const app = express();

app.use(express.json());
app.use("/", indexRoute);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Node Server is Listening on port ${port}`);
});
