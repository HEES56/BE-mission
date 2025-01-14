/*
Blog 라우터 부분
*/
import express from "express";
import Comment from "../model/Comment.js";

const router = express.Router();

//구성요소 content, author, blogId, parentId

// POST 댓글 작성
router.post("/", async (req, res) => {
  const { content, author, blogId, parentId } = req.body;
  if (!content || !author || !blogId) {
    return res
      .status(400)
      .send("CAN NOT FOUND CONTENT OR AUTHOR OR BLOGID OR EVERYTHING");
  }
  try {
    const comment = await Comment.create({ content, author, blogId, parentId });
    res.status(200).send(comment);
  } catch (err) {
    res.status(500).send("CAN NOT FOUND ERROR");
  }
});

//GET 특정 댓글 조회
/*
댓글이 대댓을을 가질 수 있으므로 트리 구조로 변환
댓글 데이터를 순회하며 맵 생성
*/
router.get("/:blogId", async (req, res) => {
  try {
    //lean() : 자바스크립트 Object으로 조회하게 되면서 가상 필드를 사용하지 않음
    // 쿼리를 더빠르고 메모리 집약적으로 사용 가능
    const comments = await Comment.find({ blogId: req.params.blogId }).lean();
    
    //댓글의 _id를 키로 사용하여 각 댓글 객체 값을 저장
    //각 댓글 객체에 cildren 배열 추가 대댓글 저장
    const commentMap = {};
    comments.forEach(
      (comment) => (commentMap[comment._id] = { ...comment, children: [] })
    );

    // 댓글일 경우, rootCooments 배열에 추가
    const rootComments = [];
    comments.forEach((comment) => {
      if (comment.parentId) {
        //대댓글일 경우, 부모 댓글의 children 배열에 추가
        commentMap[comment.parentId]?.children.push(commentMap[comment._id]);
      } else {
        
        rootComments.push(commentMap[comment._id]);
      }
    });
    res.status(200).send(rootComments);
  } catch (err) {
    res.status(500).send("CAN NOT FOUND ERROR");
  }
});

//PATCH 특정 댓글 수정
router.patch("/:id", async (req, res) => {
  const { content } = req.body;
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(400).send("CAN NOT FOUND CONTENT");
    if (content) comment.content = content;
    await comment.save();
    res.status(200).send(comment);
  } catch (err) {
    res.status(500).send("CAN NOT FOUND ERROR");
  }
});

//DELETE 특정 댓글 삭제
router.delete("/:id", (req, res) => {
  try{
    const comment = await Comment.findByIdAndDelete(req.params.id)
    if (!comment) return res.status(400).send("CAN NOT FOUND CONTENT")
      res.status(200).send("COMMENT DELETED SUCCESS")
  } catch (err) {
    res.status(500).send("CAN NOT FOUND ERROR")
  }
})
export default router;