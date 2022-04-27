const _=require('lodash')
const mysql=require('mysql')
var connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'demoDb',
  port:'3306'

})
const sql="SELECT * from  balances"

const getBalances = async (req, res) => {
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

const getBalance = async (req,res) =>{
  
}

const updateBalance = async (req, res) => {

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
