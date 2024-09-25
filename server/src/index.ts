import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/users";
import { connectToDb } from "./db";
import { poemRouter } from "./routes/poems";
import { translationRouter } from "./routes/translations";
import { reviewRouter } from "./routes/reviews";

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

// Add routes
app.use("/users", userRouter);
app.use("/poems", poemRouter);
app.use("/translations", translationRouter);
app.use("/reviews", reviewRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  connectToDb();
});
