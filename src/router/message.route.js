import express from "express";

const router = express.Router();

router
  .get("/", (req, res) => {
    res.json({ success: "message fetched" });
  })
  .get("/:id", (req, res) => {
    res.json({ success: "user message fetched" });
  })
  .post("/", (req, res) => {
    res.json({ success: "message posted" });
  })
  .put("/", (req, res) => {
    res.json({ success: "message put" });
  })
  .delete("/", (req, res) => {
    res.json({ success: "message delete" });
  });

export default router;
