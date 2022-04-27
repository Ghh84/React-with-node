const _=require('lodash')
const mysql=require('mysql')
var connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'demoDb',
  port:'3306'

})
const sql="SELECT * from  users"

const getUsers = async (req, res) => {
  console.log("came in users controller...........");
  connection.query(sql,(err,row)=>{
  if(err){
    console.log('error occured',err)
  }
  else{
    console.log('returned records')
    res.status(200).send(row)
  }
})
};

const getUser = async (req,res) =>{
  
}

const updateUser = async (req, res) => {
  let values=[]
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
    values.push(value)
  }
  if(req.body.userId){
          connection.query("UPDATE  users SET balance=? where id=?",[values[0],values[1]],(err,row)=>{
          if(err){
            console.log('error adding to transactions',err)
            res.status(400).send('Error updating the users')
          }
          else{
            console.log('returned records',row)
            res.status(200).send(row)
          }
        }) 
  }
  else {
    let values=[]
    for (const [key, value] of Object.entries(req.body)) {
      console.log(`${key}: ${value}`);
      values.push(value)
    }
    connection.query("UPDATE users SET name=?,city=?,country=?,phone=?,email=?,balance=?,role=?,username=?,password=? where id=?",
    [values[0],values[1],values[2],values[3],values[4],values[5],values[6],values[7],values[8],values[9]],(err,row)=>{
      if(err){
        console.log('error adding to transactions',err)
        res.status(400).send('Error updating the transaction')
      }
      else{
        console.log('returned records',row)
        res.status(200).send(row)
      }
    }) 
}
};
const addUser = async (req, res) => {
  let values=[]
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
    values.push(value)
  }
  connection.query("INSERT INTO  users (name,city,country,phone,email,balance,role,username,password) VALUES (?)",[values],(err,row)=>{
    if(err){
      console.log('error adding to users',err)
    }
    else{
      console.log('returned records',row)
      res.status(200).send(row)
    }
  }) 

};
const deleteUser = (req, res) => {
  
};
module.exports= {
  updateUser,
  getUser,
  getUsers,
  addUser,
  deleteUser
}