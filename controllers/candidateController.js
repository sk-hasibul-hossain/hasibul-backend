const {
  getUnderReviewCandidate,
  getShortlistedCandidate,
  updateShortlistStatus,
} = require("../models/candidateModel");

const getUnderReviewCandidateController = async (req) => {
  try {
    const { page, perPage } = req.query || {};

    const candidateData = await getUnderReviewCandidate(page, perPage);
    return candidateData;
  } catch (e) {
    throw e;
  }
};

const getShortlistedCandidateController = async (req) => {
  try {
    const { page, perPage } = req.query || {};

    const candidateData = await getShortlistedCandidate(page, perPage);
    return candidateData;
  } catch (e) {
    throw e;
  }
};

const updateShortlistStatusController = async (req) => {
  try {
    const { status, email } = req.body || {};

    if (!email || !status) {
      throw new Error("Missing required data");
    }

    const updatedCandidateData = await updateShortlistStatus(email, status);
    return updatedCandidateData;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getUnderReviewCandidateController,
  getShortlistedCandidateController,
  updateShortlistStatusController,
};
