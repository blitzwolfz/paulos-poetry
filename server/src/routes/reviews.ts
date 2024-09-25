import { Router } from "express";
import { getDb } from "../db";

export const reviewRouter = Router();

// ------------------ GET REVIEWS ------------------
reviewRouter.route("/get").get(async (req, res) => {
  const collection = getDb().collection("reviews");
  const reviews = await collection.find({}).toArray();
  res.json(reviews);
});

// ------------------ POST REVIEWS ------------------
reviewRouter.route("/post").post(async (req, res) => {
  const collection = getDb().collection("reviews");
  const review = req.body;

  const result = await collection.insertOne({ ...review, date: Date.now() });
  res.json(result);
});

// ------------------ DELETE REVIEWS ------------------
reviewRouter.route("/delete").delete(async (req, res) => {
  const collection = getDb().collection("reviews");
  const review = req.body;

  const result = await collection.deleteOne(review);
  res.json(result);
});
