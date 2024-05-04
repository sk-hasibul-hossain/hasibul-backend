require("dotenv");
require("./helperFunctions/mongoConfig");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const candidateRoutes = require("./routes/candidateRoute");

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("hello from server");
  res.send("Hello from server");
});

app.use("/candidate", candidateRoutes);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
