
const mysql=require('mysql')
console.log('DB CONNECTION........')
 const DbConnection=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'password',
        database:'demoDb',
        port:'3306'   
})
module.exports=DbConnection

