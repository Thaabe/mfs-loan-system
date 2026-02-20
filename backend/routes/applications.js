const express = require("express");
const store = require("../data/store");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(store.getAll());
});

router.post("/", (req, res) => {
  const newApp = {
    id: Date.now(),
    ...req.body
  };
  store.add(newApp);
  res.json(newApp);
});

module.exports = router;
