const express = require('express')  //引入模块
const app = express()   //调用express
const mysql = require('mysql')
const port=3001   //服务运行的端口


//设置连接参数
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'api2009'
});

//设置跨域访问
app.all('*', (req, res, next) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-type",);
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//建立连接
connection.connect();


app.get('/',(req,res)=>{
    console.log(req.query)
    res.send("API 接口11111")
})

app.get('/user/list',(req,res)=>{
    //拼装sql语句
    let sql = "select user_id,user_name,email,password from p_users order by user_id desc limit 10"

    connection.query(sql, function (error, results, fields) {
        res.send(results)           //将数据库查询结果返回给接口
    });
})

//用户添加
app.post('/user/add',(req,res)=>{
    //接收 post数据
    console.log(req.body)
    let user_id = req.body.user_id
    let user_name = req.body.user_name

    //入库  insert into
    let sql = `insert into p_users (user_id,user_name) values (${user_id},"${user_name}")`
    connection.query(sql, function (error, results, fields) {
        res.send("添加成功")
    });
})




//监听端口
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})