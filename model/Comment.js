/*Comment+parent(댓글+대댓글) model 부분 
1. Blog id를 공유해야함 
2. 댓글과 대댓글 아이디를 공유 해야함
ref: 참조(Reference) 를 통해 한 모델의 필드가 다른 모델의 문서를 가리키도록함
블로그와 연결하여 Id 공유 + 댓글ID와 대댓글(parent)ID
*/

import mongoose from "mongoose";

//comment + parent 스키마
const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    author: {
      type: String,
    },
    blogId: {
      /*
      mongoose.Schema.Types.ObjectId
      없으면 Id는 자동생성
      MongoDB에서 사용하는 고유 식별자 타입
    */
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    //대댓글 추가
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      //기본값은 null로 넣어 처음엔 없는 것으로 처리
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

//comment + parent 모델화
const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
