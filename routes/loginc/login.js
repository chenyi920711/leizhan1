var express=require('express');
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
var ss = "ssd_ddd_ddd";

var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
}

var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
}

var cb2 = function (req, res) {
    res.send('Hello from C!');
}

router.get('/',function(req,res){
    res.send('登录首页');
});
router.get('/li', [cb0, cb1, cb2]);
router.get('/add',function(req,res){
    res.send('信息增加');
});

router.get('/edit',function(req,res){
    res.send('信息修改');
});

router.get('/delete',function(req,res){
    res.send('信息删除'+ss.split("_")[0]);
});

router.post("/openid", async (req, res) => {
    const Ut = require("../common/utils");
    try {

        console.log(req.body);
        let appId = "wx70xxxxxxbed01b";
        let secret = "5ec6exxxxxx49bf161a79dd4";
        let { js_code } = req.body;
        let opts = {
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`
        }
        let r1 = await Ut.promiseReq(opts);
        r1 = JSON.parse(r1);
        console.log(r1);
        res.json(r1);
    }
    catch (e) {
        console.log(e);
        res.json('');
    }
});

router.post("/cryptdata", async (req, res) => {
    let WXBizDataCrypt = require('../common/WXBizDataCrypt')
    const sha= require("sha1");
    try {
        let appId = "wx70XXXXXXXed01b";
        let secret = "5ec6e1cXXXXXXXXXbf161a79dd4";
        let { encryptedData, iv, js_code, rawData, signature } = req.body;
        // 获取session_key
        let opts = {
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`
        }
        let r1 = await Ut.promiseReq(opts);
        let { session_key } = JSON.parse(r1);
        if (!session_key) return res.json('');
        // 数据签名校验
        let signature2 = sha(rawData + session_key);
        if (signature != signature2) return res.json("数据签名校验失败");
        // 解密
        let pc = new WXBizDataCrypt(appId, session_key)

        let data = pc.decryptData(encryptedData, iv)

        console.log('解密后 data: ', data)
        res.json(data);
    }
    catch (e) {
        console.log(e);
        res.json('');
    }
});
module.exports = router;   //暴露这个 router模块