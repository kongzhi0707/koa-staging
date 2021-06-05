
import mongoose from "mongoose";
const userInfo = mongoose.model("userInfo");

// 新增用户表
export const newUser = async(ctx, next) => {
  // 获取请求数据
  const opts = ctx.request.body;
  const info = new userInfo(opts);
  // 保存数据
  const saveInfo = await userInfo.save();
  // 判断是否保存成功，然后把数据返回给前端
  if (saveInfo) {
    ctx.body = {
      success: true,
      data: saveInfo
    };
  } else {
    ctx.body = {
      success: false,
      data: null
    };
  }
}

// 查询所有的用户数据
export const fetchUserInfo = async (ctx, next) => {
  // 数据查询
  const infos = await userInfo.find({});
  // 如果有数据，就返回给前端
  if (infos.length) {
    ctx.body = {
      success: true,
      data: infos
    };
  } else {
    ctx.body = {
      success: false,
      data: null
    };
  }
}