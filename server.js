const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const getRoutes = require("./Routes/get");
const postRoutes = require("./Routes/post");
const { response } = require("express");
var cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", getRoutes);
app.use("/", postRoutes);

app.listen(3333, () => console.log("listen on port "));
