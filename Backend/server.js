const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();
const routes = require("./routes/goalsRoutes");
const errorHandler = require("./middleware/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
