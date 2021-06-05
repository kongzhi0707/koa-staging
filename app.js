// 引入模块
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaStatic from 'koa-static';
import Router from 'koa-router';
const cors = require('koa2-cors');

const { ApolloServer } =  require('apollo-server-koa');

const { typeDefs, resolvers } = require('./graphql/schema');
const apollo = new ApolloServer({ typeDefs, resolvers });

// 引入数据库
import { database } from './mongodb';
database();

// 引入路由
import routerMap from './router';

const app = new Koa();
const router = new Router();

/*
 解决跨域 
 app.use(cors()); // 全部允许跨域
*/
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'], // 设置允许的HTTP请求方法
  // 设置服务器支持的所有头信息字段
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}));

// 使用 bodyParser 和 koaStatic中间件
app.use(bodyParser()); // 处理post请求时，koa无法解析http请求体中的数据
app.use(KoaStatic(__dirname + '/public'));

/**
 * app.use(router.routes()) 将路由注册到app对象上面 这样就可以让router帮我们处理url和处理函数之间的映射
 * 处理post请求的时候，koa无法解析http请求体中的数据，因此我们需要引入 koa-bodyparser
 * app.use(router.allowedMethods()) 处理status为空或者404情况的404情况的
 */
app
  .use(router.routes())
  .use(router.allowedMethods());

// 使用路由
router.use(routerMap.routes());

// 使用 apollo
app.use(apollo.getMiddleware());

app.listen(3000, () => {
  console.log('graphQL server listen port: ' + 3000);
  console.log(`Server ready at http://localhost:3000${apollo.graphqlPath}`)
});