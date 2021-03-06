
import mongoose from "mongoose";
const Info = mongoose.model("Info");

// 新增info信息
export const newAddInfo = async(ctx, next) => {
  // 获取请求数据
  const opts = ctx.request.body;
  const info = new Info(opts);
  const saveInfo = await info.save(); // 保存数据
  // 判断保存是否成功, 然后把数据返回给前端
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

// 获取所有的info数据，查询操作
export const fetchInfo = async (ctx, next) => {
  const infos = await Info.find({}); // 数据查询
  // 如果有数据，就返回给前端
  if (infos.length) {
    ctx.body = {
      success: true,
      data: infos
    }
  } else {
    ctx.body = {
      success: false,
      data: null
    };
  }
}