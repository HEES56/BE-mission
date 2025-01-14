import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";
import router from "./routes/index.js";

// Express 애플리케이션 생성
const app = express();
const PORT = 8000;

app.use("/", router);

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
