
// 引入 mongoose 模块
import mongoose from "mongoose";
import config from "../config";

// 加载用户表 和 信息表
require('./schema/info');
require('./schema/user');

// 连接mongodb

export const database = () => {
  mongoose.set('debug', true);

  mongoose.connect(config.dbPath);

  // 数据库断开的时候 重新连接数据库
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.dbPath);
  });
  mongoose.connection.on("error", err => {
    console.log('err', err);
  });
  mongoose.connection.on("open", async () => {
    console.log("Connection to MongoDB")
  })
}