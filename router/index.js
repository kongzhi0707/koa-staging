
const { newUser, fetchUserInfo } = require("../controller/user");
const { newAddInfo, fetchInfo } = require("../controller/info");

const router = require('koa-router')();

// 新增用户 post请求
router.post('/newUser', newUser);

// 查询用户 get请求
router.get('/fetchUserInfo', fetchUserInfo);

// 新增信息
router.post('/newAddInfo', newAddInfo);

// 查询信息
router.get('/fetchInfo', fetchInfo);

module.exports = router;

