import express from "express";
import {
  getArticlesBySearch,
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  likeArticle,
  getArticle,
  commentArticle,
  getArticlesByCategory,
  addBookmark
} from "../controllers/articles.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getArticles);
router.get("/search", getArticlesBySearch);
router.get('/categories',getArticlesByCategory)
router.get("/:id", getArticle);
router.post("/createArticle", auth, createArticle); // auth is middleware to check before creating an article
router.patch("/:id", auth, updateArticle); // same for update
router.delete("/:id", auth, deleteArticle);
router.patch("/:id/likeArticle", auth, likeArticle);
router.post('/:id/commentArticle',auth,commentArticle);
router.patch('/bookmark/:id',auth,addBookmark);
export default router;
