const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const { getDb } = require('../database/db');

router.get('/', async (req, res) => {
  try {
    const settings = await getDb().collection("settings").findOne({});
    res.send(settings || {});
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await getDb().collection("settings").updateOne(
      {},
      { $set: req.body },
      { upsert: true }
    );
    res.send({ success: true, result });
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

module.exports = router;