const mysql = require('mysql');

const connection = mysql.createConnection({ 
  host:'localhost',
  port:3306,
  user:'root',
  password:'AdalynnTatiannaKehong',
  database: ''
});

connection.connect((err)=>{
  if (err) throw err;
  console.log("connected as id " + connection.threadId);


})