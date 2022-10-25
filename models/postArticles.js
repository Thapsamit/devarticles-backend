import mongoose from "mongoose";
const PostArticlesSchema = new mongoose.Schema({
  title: String,
  name: String,
  articleBody: String,
  articleBodyRaw:String,
  author: String,
  tags: [String],
  category:String,
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const postArticles = new mongoose.model("postArticles", PostArticlesSchema);
export default postArticles;
