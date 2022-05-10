
//import { Alert } from 'react-bootstrap';
const _=require('lodash')
const DbConnection=require('../db')
var connection=DbConnection
if(!connection._connectCalled ){
  connection.connect();
}
const sql="SELECT * from  balancerequest where status='Pending' ORDER BY createdDate ASC"

const getRequest = (req, res) => {
  console.log("I reached Talla")
  console.log("came in transaction controller...........");
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


const addRequest = (req, res) => {
  let columns=[],values=[]
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
    columns.push(key)
    values.push(value)
  }
  
   connection.query("INSERT INTO  balancerequest (Amount,currency,userId,comment) VALUES (?)",[values],(err,row)=>{
    if(err){
      console.log('error adding to transactions',err)
    }
    else{
      console.log('returned records',row)
      res.status(200).send(row)
    }
  }) 
 
};
const updateBalanceReauest=(req,res)=>{
  let columns=[],values=[]
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
    values.push(value)
  }
//console.log('values',values)
  connection.query("UPDATE  balancerequest SET status=? where id=?",
  ['paid',values[0]],(err,row)=>{
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
const editTransaction = (req, res) => {
  let columns=[],values=[]
  let query=""
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
    values.push(value)
  }
  console.log('values',values[16])
  connection.query("UPDATE  transactions SET sName=?,sCity=?,sAmount=?,sCountry=?,sCurrency=?,sPhone=?,sEmail=?,rName=?,rCity=?,rAmount=?,rCountry=?,rCurrency=?,rPhone=?,rEmail=?,userId=?,referenceP=?,status=?,comment=? where ticketNo=?",
  [values[0],values[1],values[2],values[3],values[4],values[5],values[6],values[7],values[8],values[9],values[10],values[11],values[12],values[13],values[14],values[15],
  values[16],values[17],values[18]],(err,row)=>{
    if(err){
      console.log('error adding to transactions',err)
      res.status(400).send('Error updating the transaction')
    }
    else{
      console.log('returned records',row)
      res.status(200).send(row)
    }
  }) 
 
};


const deleteTransaction = (req, res) => {
  
}

const getAllTransactions = async (req, res) => {
  console.log("came in transaction controller...........");
connection.query(sql,(err,row)=>{
if(err){
  console.log('error occured',err)
}
else{
  console.log('returned records')
  res.status(200).send(row)
}
})
  
}

const getTransactionInfo = async (req, res) => {
  
}


module.exports={
  updateBalanceReauest,
  getRequest,
  addRequest,
  editTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionInfo,
  
};
