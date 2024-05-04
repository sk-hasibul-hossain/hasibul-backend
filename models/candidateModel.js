const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    info: {
      about: {
        type: String,
      },
      experience: {
        type: String,
      },
      hobbies: {
        type: String,
      },
      intro: {
        type: String,
      },
    },
    score: {
      totalPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      behavioral: {
        type: Number,
        default: 0,
        min: 0,
        max: 10,
      },
      communication: {
        type: Number,
        default: 0,
        min: 0,
        max: 10,
      },
      situationHandling: {
        type: Number,
        default: 0,
        min: 0,
        max: 10,
      },
    },
    isShortlisted: {
      type: Boolean,
      default: false,
    },
    media: [
      {
        type: {
          type: String,
          enum: ["photo", "video"],
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Candidate = mongoose.model("candidateschema", CandidateSchema);

const getUnderReviewCandidate = async (page = 1, perPage = 10) => {
  const skip = (page * 1 - 1) * perPage * 1;
  try {
    const candidates = await Candidate.aggregate([
      {
        $match: {
          isShortlisted: false,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: perPage * 1,
      },
    ]);

    return candidates;
  } catch (e) {
    throw e;
  }
};

const getShortlistedCandidate = async (page = 1, perPage = 10) => {
  const skip = (page * 1 - 1) * perPage * 1;
  try {
    const candidates = await Candidate.aggregate([
      {
        $match: {
          isShortlisted: true,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: perPage * 1,
      },
    ]);
    return candidates;
  } catch (e) {
    throw e;
  }
};

const updateShortlistStatus = async (email, status) => {
  try {
    if (typeof status !== "boolean") {
      throw new Error("Not a valid status");
    }
    const updatedData = await Candidate.findOneAndUpdate(
      { email },
      { isShortlisted: status },
      { new: true }
    );
    return updatedData;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getUnderReviewCandidate,
  getShortlistedCandidate,
  updateShortlistStatus,
};
