const express = require('express')  //引入模块
const app = express()   //调用express
const mysql = require('mysql')
const port=3002   //服务运行的端口


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


//用户列表接口
app.get('/goods/list',(req,res)=>{
    // console.log(req.method)
    // console.log(1111)
//拼装sql语句
    let sql = "select goods_name,shop_price,number from p_cart order by goods_id desc limit 5"
    connection.query(sql, function (error, results, fields) {
        res.send(results)          //将数据库查询结果返回给接口
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

//建立连接
connection.connect();



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})