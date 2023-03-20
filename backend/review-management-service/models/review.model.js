import mongoose from "mongoose";

const reviewScema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  reviewTitle: {
    type: String,
    required: true,
  },
  reviewBody: {
    type: String,
  },
  postedOn: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const reviewModel = mongoose.model("Review", reviewScema);

export default reviewModel;
