var express=require('express');
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄


router.get('/',function(req,res){
    res.send('登录首页');
});

router.get('/add',function(req,res){
    res.send('信息增加');
});

router.get('/edit',function(req,res){
    res.send('信息修改');
});

router.get('/delete',function(req,res){
    res.send('信息删除');
});

module.exports = router;   //暴露这个 router模块