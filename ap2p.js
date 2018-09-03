var express=require('express');


var lc = require('./routes/logincontrol');
var app=new express();   //实例化

app.use('/log',lc);
app.use('/',lc);     //默认加载前台(路由)
app.listen(80,'127.0.0.1');
