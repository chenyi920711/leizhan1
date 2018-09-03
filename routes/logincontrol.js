var express=require('express');
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄

var loginc=require('./loginc/login.js');
var clogin=require('./loginc/clogin.js');

//配置路由
router.use('/logg',loginc);
router.use('/clog',clogin);

module.exports = router;   //暴露这个 router模块
