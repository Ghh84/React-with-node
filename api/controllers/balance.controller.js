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
  
}

const updateBalance = (req, res) => {
  let columns=[],values=[]
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
    values.push(value)
  }
  //console.log('values',values)
  connection.query("UPDATE  balance SET USDbalance= USDbalance + ?,comment=? where userId=?",
  [values[2],values.comment,values[1]],(err,row)=>{
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
const addBalance = async (req, res) => {
 
};
const deleteBalance = (req, res) => {
  
};
module.exports= {
  updateBalance,
  getBalance,
  getBalances,
  addBalance,
  deleteBalance,
};
