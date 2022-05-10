
const _=require('lodash')
const DbConnection=require('../db')
var connection=DbConnection
if(!connection._connectCalled ){
  connection.connect();
}
const sql="SELECT t.*,u.id,u.name from  transactions as t INNER JOIN users as u ON t.userId= u.id ORDER BY createdDate DESC"
const sqlInsert="INSERT INTO transactions (sName,sCity,sAmount,sCountry,sCurrency,sPhone,sEmail,rName,rCity,rAmount,rCountry:,rCurrency,rPhone,rEmail,userId,referenceP) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

const getTransactions = (req, res) => {
  


 
};
const addTransaction = (req, res) => {
  let columns=[],values=[]
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
    columns.push(key)
    values.push(value)
  }
  
   connection.query("INSERT INTO  transactions (sName,sCity,sAmount,sCountry,sCurrency,sPhone,sEmail,rName,rCity,rAmount,rCountry,rCurrency,rPhone,rEmail,userId,referenceP,ticketNo) VALUES (?)",[values],(err,row)=>{
    if(err){
      console.log('error adding to transactions',err)
    }
    else{
      console.log('returned records',row)
      res.status(200).send(row)
    }
  }) 
 
};
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
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionInfo,
  
};
