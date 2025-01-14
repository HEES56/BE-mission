import express from "express";
import blogRoutes from "./Blog.js";
import commentRoutes from "./Comment.js";

const router = express.Router();

// 연결
router.use("/blogs", blogRoutes);
router.use("/comments", commentRoutes);

export default router;
