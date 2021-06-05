
// 引入mongoose

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  name: String,
  sex: String,
  age: Number,
  info: {
    type: ObjectId,
    ref: "Info"
  },
});

// 建立数据模型
mongoose.model("userInfo", UserSchema);

