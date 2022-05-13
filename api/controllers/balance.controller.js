const { values } = require('lodash');
const _=require('lodash')
const DbConnection=require('../db')
var connection=DbConnection
const sql="SELECT * from  balance"

const getBalances = async (req, res) => {
  console.log("came in balance controller...........");
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
const getBalance = async (req,res) =>{
  console.log("came in balance controller...........");
  const values=[]
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
    values.push(value)
  }
  console.log(req.body)
  connection.query("SELECT USDbalance, localBalance from  balance where userId=?",[values[0]],(err,row)=>{
  if(err){
    console.log('error occured',err)
  }
  else{
    console.log('returned records')
    res.status(200).send(row)
  }
  
})
}
const updateBalance = (req, res) => {
  let columns=[],values=[]
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
    values.push(value)
  }
  console.log('values',values)
  if(values[3]=='usd'){
    connection.query("UPDATE  balance SET USDbalance=?,comment=? where userId=?",
    [values[1],values[2],values[0]],(err,row)=>{
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
  else{
  connection.query("UPDATE  balance SET localBalance=?,comment=? where userId=?",
  [values[1],values[2],values[0]],(err,row)=>{
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
const updateBalanceFromRequest = (req, res) => {
  let columns=[],values=[]
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
    values.push(value)
  }
  console.log('values',values)
  if(values[3]=='usd'){
    connection.query("UPDATE  balance SET USDbalance=USDbalance+?,comment=? where userId=?",
    [values[2],values[4],values[1]],(err,row)=>{
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
  else{
    connection.query("UPDATE  balance SET localBalance=localBalance+?,comment=? where userId=?",
    [values[2],values[4],values[1]],(err,row)=>{
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
const addBalance = async (req, res) => {
  let values=[]
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
    values.push(value)
  }
  console.log(values)
  
  connection.query("INSERT INTO  balance (userId,USDbalance,localBalance,comment) VALUES (?)",[values],(err,row)=>{
    if(err){
      console.log('error adding to users',err)
    }
    else{
      console.log('returned records',row)
      res.status(200).send(row)
    }
  }) 
 
};
const deleteBalance = (req, res) => {
  
};
module.exports= {
  updateBalance,
  getBalance,
  getBalances,
  addBalance,
  deleteBalance,
  updateBalanceFromRequest
};
