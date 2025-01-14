// blog model 부분
import mongoose from "mongoose";

//Blog 스키마
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Blog 모델화
const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
