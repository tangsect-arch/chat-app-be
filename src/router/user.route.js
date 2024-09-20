import express from "express";

const router = express.Router();

router
  .get("/", (req, res) => {
    res.json({ success: "users fetched" });
  })
  .get("/:id", (req, res) => {
    res.json({ success: "user id fetched" });
  })
  .put("/:id", (req, res) => {
    res.json({ success: "user put" });
  })
  .delete("/:id", (req, res) => {
    res.json({ success: "user delete" });
  });

export default router;
