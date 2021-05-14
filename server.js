const express = require('express')  //引入模块
const app = express()   //调用express
const mysql = require('mysql')
const port=3000   //服务运行的端口


//设置连接参数
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'api2009'
});

//设置跨域访问
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-type",);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//建立连接
connection.connect();





//用户列表接口
app.get('/user/list',(req,res)=>{
    console.log(req.method)
    console.log(1111)
//拼装sql语句
    let sql = "select user_id,user_name,email,password from p_users order by user_id desc limit 10"
    connection.query(sql, function (error, results, fields) {
        res.send(results)          //将数据库查询结果返回给接口
    });
})


//添加用户
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

//删除用户
app.delete('/user/delete',(req,res)=>{
    let uid = req.query.uid
    let sql = `delete from p_users where user_id=${uid}`
    connection.query(sql, function (error, results, fields) {
        res.send("删除成功")
    });

})

//更新用户信息
app.put('/user/update',(req,res)=>{
    console.log(req.body)
    let name = req.body.user_name
    let uid = req.body.user_id
    let sql = `update p_users set user_name='${name}' where user_id=${uid}`
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        console.log(error)
        res.send("修改成功")
    });

})


// //断开数据库连接
// connection.end();





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
