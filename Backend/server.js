const express = require("express");
require("dotenv").config();

const colors = require("colors");
const port = process.env.PORT || 5000;
const routes = require("./routes/goalsRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
