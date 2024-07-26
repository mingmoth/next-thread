import mongoose from "mongoose"

const threadSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
  }],
})

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema)

export default Thread