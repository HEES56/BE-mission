//Blog 라우터 부분
import express from "express";
import Blog from "../model/Blog.js";

const router = express.Router();

// POST 포스트 추가
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;
  // title, content, author 중 1개라도 없으면 예외처리
  if (!title || !content || !author) {
    return res
      .status(400)
      .send({ error: "CAN NOT FIND TITLE OR CONTENT OR AUTHOR OR EVERYTHING" });
  }
  try {
    const blog = await Blog.create({ title, content, author });
    res.status(200).send(blog);
  } catch (err) {
    res.status(500).send("NOT FOUND ERROR");
  }
});

//GET 글 전체 조회
router.get("/", async (req, res) => {
  //query string으로 limit을 받고, limit의 수만큼 내려줄 것
  // parseInt: 문자열 인자를 파싱하여 특정 진수의 정수를 반환
  //limit: 출력할 데이터 갯수  제한
  const limit = parseInt(req.query.limit) || 10;
  try {
    const blogs = await Blog.find().limit(limit);
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send("CAN NOT FOUND ERROR");
  }
});

//GET 특정 글 조회
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(400).send("CAN NOT FOUND BLOG");
    res.status(200).send(blog);
  } catch (err) {
    res.status(500).send("CAN NOT FOUND ERROR");
  }
});

//PATCH 특정 글 수정
router.patch("/:id", async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    //author은 수정 불가능, title, content만 수정 가능
    if (!blog) return res.status(400).send("CAN NOT FOUND BLOG");
    if (title) blog.title = title;
    if (content) blog.content = content;
    await blog.save();
    res.status(200).send(blog);
  } catch (err) {
    res.status(500).send("CAN NOT FOUND ERROR");
  }
});

//DELETE  특정 블로그 글 삭제
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(400).send("CAN NOT FOUND BLOG");
    res.status(200).send("BLOG DELETED : SUCCESS ");
  } catch (err) {
    res.status(500).send("CAN NOT FOUND ERROR");
  }
});

export default router;
