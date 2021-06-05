
// 引入 mongoose
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const InfoSchema = new Schema({
  love: String,
  userId: ObjectId,
  height: String,
  weight: Number
});

// 建立数据模型
mongoose.model("Info", InfoSchema);