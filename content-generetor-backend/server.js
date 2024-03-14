const express = require("express");
const cookieParser = require("cookie-parser"); // Corrected typo in middleware name
const usersRouter = require("./routes/usersRouter");
require("dotenv").config();
const connectDB = require("./utils/connectDB");
const errorHandler = require("./middlewares/errorMiddleware");
const openAIRouter = require("./routes/openAIRouter");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB(); // Assuming this function connects to your database

app.use(express.json());
app.use(cookieParser()); // Corrected middleware usage

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/openai", openAIRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
