import { Router } from "express";
import { getDb } from "../db";
import multer from "multer";
import { Binary, ObjectId } from "mongodb";

export const translationRouter = Router();

// ------------------ GET TRANSLATIONS ------------------
translationRouter.route("/get").get(async (req, res) => {
  const collection = getDb().collection("translations");
  const translations = await collection.find({}).toArray();
  res.json(translations);

  console.log("Translations retrieved successfully");
});

// ------------------ UPLOAD TRANSLATION ------------------
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
translationRouter.post("/upload", upload.any(), async (req, res) => {
  const files = req.files as Express.Multer.File[];
  const { originalname, mimetype, buffer } = files[0];

  const { title, date } = req.body;

  const file = {
    name: originalname,
    type: mimetype,
    data: new Binary(buffer),
    title,
    date,
  };

  const collection = getDb().collection("translations");
  const result = await collection.insertOne({ ...req.body, file });
  res.json(result);
});

// ------------------ RETRIEVE SPECIFIC PDF ------------------
translationRouter.route("/pdfs/:id").get(async (req, res) => {
  const collection = getDb().collection("translations");

  const id = new ObjectId(req.params.id);
  const translation = await collection.findOne({ _id: id });
  const file = translation.file;

  const binaryData = file.data;
  const buffer = binaryData.read(0, binaryData.length());

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=" + file.name);
  res.send(buffer);
});

// ------------------ DELETE TRANSLATION ------------------
translationRouter.route("/delete/:id").delete(async (req, res) => {
  const collection = getDb().collection("translations");

  const id = new ObjectId(req.params.id);
  const result = await collection.deleteOne({ _id: id });
  res.json(result);
});
