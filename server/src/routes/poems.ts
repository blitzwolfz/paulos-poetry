import { getDb } from "../db";
import { NextFunction, Router } from "express";
import { ObjectId } from "mongodb";

export const poemRouter = Router();

// ------------------ GET POEMS ------------------
poemRouter.route("/").get(async (req, res) => {
  const collection = getDb().collection("poems");
  const poems = await collection.find({}).toArray();
  res.json(poems);
});

// ------------------ UPLOAD POEM ------------------
poemRouter.route("/upload").post(async (req, res) => {
  const collection = getDb().collection("poems");
  const result = await collection.insertOne(req.body);
  res.json(result);

  console.log("Poem uploaded successfully");
});

// ------------------ UPDATE POEM ------------------
poemRouter.route("/update").post(async (req, res) => {
  try {
    const collection = getDb().collection("poems");
    const { id, ...rest } = req.body;

    const objectId = new ObjectId(id);
    const result = await collection.updateOne({ _id: objectId }, { $set: { ...rest } });

    res.json({ message: "Poem updated successfully." });
  } catch (error) {
    console.error("Error updating poem:", error);
    res.status(500).json({ message: "An error occurred while updating the poem." });
  }
});

// ------------------ COMMENT ON POEM ------------------
poemRouter.route("/comment").post(async (req, res) => {
  try {
    const collection = getDb().collection("poems");
    const { id, comment } = req.body;

    const objectId = new ObjectId(id);
    const result = await collection.updateOne({ _id: objectId }, { $push: { comments: comment } });

    res.json({ message: "Poem updated successfully." });
  } catch (error) {
    console.error("Error updating poem:", error);
    res.status(500).json({ message: "An error occurred while updating the poem." });
  }
});

// ------------------ LIKE POEM ------------------
// const itemActions = {} as {
//   [itemId: string]: {
//     [userId: string]: {
//       lastLiked: number;
//       lastUnliked: number;
//       reqCount: number;
//     };
//   };
// };

// Middleware to handle item-based rate limiting
// const itemRateLimit = (req: any, res: any, next: NextFunction) => {
//   const itemId = req.body.id;
//   const userId = req.body.userId;
//   const liked = req.body.like;
//   const now = Date.now();

//   if (!itemActions[itemId]) itemActions[itemId] = {};

//   if (!itemActions[itemId][userId]) {
//     itemActions[itemId][userId] = { lastLiked: 0, lastUnliked: 0, reqCount: 0 };
//   }

//   if (liked) itemActions[itemId][userId].lastLiked = now;
//   else itemActions[itemId][userId].lastUnliked = now;

//   itemActions[itemId][userId].reqCount++;

//   const lastLikedDiff = now - itemActions[itemId][userId].lastLiked;
//   const lastUnlikedDiff = now - itemActions[itemId][userId].lastUnliked;

//   const max = 5;
//   const itemRateLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max, // Allow 5 actions per item per windowMs
//   });

//   if (itemActions[itemId][userId].reqCount > max) {
//     if (lastLikedDiff < itemRateLimiter.windowMs || lastUnlikedDiff < itemRateLimiter.windowMs) {
//       res.status(429).json({ message: "You are doing that too much. Please try again later." });
//       console.log("Too many");
//     } else {
//       itemActions[itemId][userId].reqCount = 0;
//       itemActions;
//     }
//   }

//   next();
// };

poemRouter.route("/like").post(async (req, res) => {
  try {
    const collection = getDb().collection("poems");
    const { id, like, userId } = req.body;

    const objectId = new ObjectId(id);

    if (like) await collection.updateOne({ _id: objectId }, { $push: { likes: userId } });
    else await collection.updateOne({ _id: objectId }, { $pull: { likes: userId } });
  } catch (error) {
    console.error("Error updating poem:", error);
    res.status(500).json({ message: "An error occurred while updating the poem." });
  }
});

// ------------------ NEW POEM ------------------
poemRouter.route("/new").post(async (req, res) => {
  try {
    const collection = getDb().collection("poems");
    const { title, english, greek } = req.body;

    const date = Date.now();
    await collection.insertOne({ title, english, greek, comments: [], date, likes: [] });

    res.json({ message: "Poem updated successfully." });
  } catch (error) {
    console.error("Error updating poem:", error);
    res.status(500).json({ message: "An error occurred while updating the poem." });
  }
});

// ------------------ DELETE POEM ------------------
poemRouter.route("/delete").post(async (req, res) => {
  try {
    const collection = getDb().collection("poems");
    const { id } = req.body;

    const objectId = new ObjectId(id);
    const result = await collection.deleteOne({ _id: objectId });

    res.json({ message: "Poem deleted successfully." });
  } catch (error) {
    console.error("Error deleting poem:", error);
    res.status(500).json({ message: "An error occurred while deleting the poem." });
  }
});
