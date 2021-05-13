var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',   //数据库地址
    user     : 'root',        //数据库用户名
    password : 'root',        //数据库密码
    database : 'api2009'      //数据库名
});
//建立连接
connection.connect();

connection.query("select user_id,user_name,email from p_users limit 10",function (error, results, fields) {
    // if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
    console.log(results)
});
//断开连接
connection.end();