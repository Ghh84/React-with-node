

const {DbConnection}=require("../db");
const _=require('lodash')
const mysql=require('mysql')
const signin = (req, res) => {
    console.log('REQUEST.......',req.body)
    var connection=mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'hani1984',
      database:'demoDb',
      port:'3306'
  
  })
  const sql="SELECT * from  users where username=? AND password=?"
    connection.query(sql,[req.body.username,req.body.password],(err,rows)=>{
      if(err){
          throw err
      }else {
        if(!_.isEmpty(rows)){
          console.log('data sent...',rows[0].name,rows.name)
        }
         if(!_.isEmpty(rows)) res.status(200).send({username:rows[0].username,role:rows[0].role,id:rows[0].id});
         else res.status(400).send({ message:'Invalid credentials! Try again' });
      }
      
    })
};

const authenticateUser = async (req,res) =>{
  
    res.status(404).send({message:'message' || 'User not authenticated.'});
  
}
module.exports= {signin, authenticateUser}
   
