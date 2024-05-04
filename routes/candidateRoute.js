const express = require("express");
const {
  getUnderReviewCandidateController,
  getShortlistedCandidateController,
  updateShortlistStatusController,
} = require("../controllers/candidateController");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.send("from-candidate");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/underReviewCandidate", async (req, res) => {
  try {
    const candidateData = await getUnderReviewCandidateController(req, res);
    res.status(200).send(candidateData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/shortlistedCandidate", async (req, res) => {
  try {
    const candidateData = await getShortlistedCandidateController(req, res);
    res.status(200).send(candidateData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/updateShortlistStatus", async (req, res) => {
  try {
    const updatedCandidate = await updateShortlistStatusController(req, res);
    res.status(200).send(updatedCandidate);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
