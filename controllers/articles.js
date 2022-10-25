import postArticle from "../models/postArticles.js";
import users from "../models/users.js";
import mongoose from "mongoose";

export const getArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const getArticle = await postArticle.findById(id);

    res.status(200).json(getArticle);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const postArticles = await postArticle.find({});

    res.status(200).json({ data: postArticles });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// get by search
export const getArticlesBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");
    const articles = await postArticle.find({ $or: [{ title }] });
    
    return res.status(200).json({ data: articles });
  } catch (err) {
    return res.status(404).json({ message: "Some error occurs" });
  }
};
export const getArticlesByCategory = async (req,res)=>{
  const {category}  = req.query;

  const joinCategory = category.split("+").join(" ");
 
  try{
     const articles = await postArticle.find({category:joinCategory})
     return res.status(200).json({data:articles})
  }
  catch(err){
    console.log(err)
    res.status(404).json({message:err.message})
  }
}

export const createArticle = async (req, res) => {
  const article = req.body;
 
  const newArticle = new postArticle({
    ...article,
    author: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateArticle = async (req, res) => {
  const { id: _id } = req.params;
  const article = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Post with this id");
  } else {
    const updatedArticle = await postArticle.findByIdAndUpdate(_id, article, {
      new: true,
    });
   
    return res.status(201).json(updatedArticle);
  }
};

export const deleteArticle = async (req, res) => {
  const { id: _id } = req.params;
  // userid comes from middleware auth
  if (!req.userId) {
    return res.json({ message: "Authetication error" });
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Post with this id");
  }
  await postArticle.findByIdAndDelete(_id);
  res.json({ message: "Post Deleted Successfully" });
};

export const likeArticle = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Post with this id");
  }
  const article = await postArticle.findById(_id);
  const index = article.likes.findIndex((id) => id === String(req.userId)); //  if userid already in likes section then no need to like more one
  if (index === -1) {
    article.likes.push(req.userId);
  } else {
    article.likes = article.likes.filter((id) => id !== String(req.userId)); // disliking the article
  }
  const updatedArticle = await postArticle.findByIdAndUpdate(_id, article, {
    new: true,
  });
  return res.status(200).json(updatedArticle);
};

// comment article

export const commentArticle = async (req, res) => {
  const { id } = req.params;
  const { com } = req.body;
  const article = await postArticle.findById(id);
  article.comments.unshift(com);
  const updatingArticle = await postArticle.findByIdAndUpdate(id, article, {
    new: true,
  });
  return res.status(200).json(updatingArticle);
};

// bookmark feature
export const addBookmark = async (req,res)=>{
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post with this id");
  }
  const getUser = await users.findById(req.userId)
  const index = getUser.bookmarks.findIndex((bid)=> bid==id)
  if(index==-1){
    getUser.bookmarks.unshift(id);
    const updatingUser = await users.findByIdAndUpdate(req.userId,getUser,{new:true})
    res.status(200).send(updatingUser);
  }
  else{
    res.status(200).send("already addded")
  }
  
}
