const express = require("express");
const connectDatabase = require("./src/database/db");
require('dotenv').config()

const app = express();

const port = process.env.PORT || 4000;

const userRoute = require("./src/routes/user.route");

connectDatabase();
app.use(express.json(),);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port} 🚀`);
});


