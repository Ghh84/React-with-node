import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import Joi from 'joi-browser'
import { Button, Alert } from "react-bootstrap";
import BalanceRequestService from "../../services/balanceRequest.service";
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service'
import BalanceService from "../../services/balance.service";
import Input from "../common/input";


const Request=({handlePageSwitch,selectedTxn})=>{
    console.log('selected request.........',selectedTxn)
    const [amount,setAmount]=useState(selectedTxn.amount)
    const [currency,setsCurrency]=useState(selectedTxn.currency)
    const [comment,setComment]=useState(selectedTxn.comment)
    const [users,setUsers]=useState([])    
    const [userId,setUserId]=useState(selectedTxn.userId)
    const [Message,setMessage]=useState('')
    const [errored,setErrored]=useState('')
    const [SelectedRequest, setSelectedRequest] = useState([])
    const [checked, setChecked] = useState(true);
    let checkedId=[];
        
    function handleSeeRequest(){  
        
        {SelectedRequest.map((item)=>{
            
            if(findArrayElementById(checkedId,item.userId)){
            }
            else{
            BalanceService.updateBalance(item).then(()=>{
                alert('Approved request balance')
            })
            BalanceRequestService.updateBalanceReauest(item).then(()=>{
                alert('updated status of requested balanced')
                handlePageSwitch()
            })
           }
        })
    }
}
     function handleChecked({target}){
        //alert(checked)
        setChecked(!checked)
        //alert(checked)
        if(checked){
            if(findArrayElementById(checkedId, target.value)){
                checkedId.push({id:target.value})
            }
            else{
                checkedId.splice({id:target.value});
            }          
        }
     }
     function findArrayElementById(array, Id) {
        return array.find((element) => {
          return element.id===Id;
        })
      }
    function handleRequest(){
        const editObject={
            amount:amount,
            currency:currency,
            userId:AuthService.getCurrentUser().id,
            comment:comment
        }
        //validate data before sending
    
        BalanceRequestService.addRequest(editObject).then((res)=>{
            setMessage('Transaction was successfully updated');
            setErrored('')
           
        }).catch((err)=>{
            setMessage('')
            setErrored('Transaction update failed')
        })
     }    
      useEffect(()=>{
        UserService.getUsers().then((res)=>{
            console.log('at response from users',res.data)
            setUsers(res.data)
        })
        BalanceRequestService.getRequest().then((res)=>{
         setSelectedRequest(res.data)
        }).catch((err)=>{
        setMessage('')
        setErrored('Transaction update failed')
    })

      },[])
    return(
        <div className="card card-4">
            {AuthService.getCurrentUser().role!==1 &&
            (<div className="card-body">
                <div className="edit-top">         
                <h2 className="title">Request balance form:</h2>
                <hr style={{backgroundColor:'gray',height:'2px'}}/>
                </div>
                {Message &&
                            <Alert variant='success'>{Message}</Alert>}
                {errored &&
                            <Alert variant='danger'>{errored}</Alert>}
                <form method="POST">
                    <div className="col-4">
                        <Input name='amount' label="Amount" required="required" setUsername={setAmount} error="" value={amount} />
                        <Input name='currency' label="Currency" required="required" setUsername={setsCurrency} error="" value={currency} />
                        <label className="label">Comment</label>
                        <textarea className="input--style-4" type="text" style={{minWidth:'300px'}}name="first_name" value={comment} onChange={(e)=>setComment(e.target.value)}/>
                        </div>
                    
                    <div className='input-group'>
                         <Button variant='success' style={{marginLeft:'25px',marginTop:'25px',minWidth:'0px'}} onClick={()=>handleRequest()}>Request</Button>
                        <Button  variant='warning' style={{marginLeft:'30px',marginTop:'25px',minWidth:'0px'}} onClick={()=>handlePageSwitch()}>Back</Button>
                    </div>
                </form>
            </div>)
            }
            {AuthService.getCurrentUser().role===1 &&
                <div className='form-group'>
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                 <th>Select</th>
                                 <th scope="col">userId</th>
                                 <th scope="col">Amount</th>
                                 <th scope="col">Currency</th>
                                 <th scope="col">Created Date</th>
                                 <th scope="col">Updated Date</th>
                                 <th scope="col">Status</th>
                                 <th scope="col">Additional Information</th>
                            </tr>
                        </thead>
                        <tbody> 
                    {SelectedRequest.map((item)=>{
                        return(
                        <tr>
                            <td><input value={item.id} type="checkbox" defaultChecked={!checked} onChange={handleChecked}/></td>
                            <td>{item.userId}</td>
                            <td>{item.Amount}</td>
                            <td>{item.currency}</td>
                            <td>{item.createdDate.substring(0, 10)}</td>
                            <td>{item.updatedDate.substring(0, 10)}</td>
                            <td>{item.status}</td>
                            <td>{item.comment}</td>
                        </tr>                        
                        )})}
                        </tbody> 
                    </table>                 
                    <div>
                        <Button variant='success' style={{marginLeft:'25px',marginTop:'25px',minWidth:'0px'}} onClick={()=>handleSeeRequest()}>Approved</Button>
                        <Button  variant='warning' style={{marginLeft:'30px',marginTop:'25px',minWidth:'0px'}} onClick={()=>handlePageSwitch()}>Back</Button>
                    </div>
                </div>
            }
        </div>   
)
}

export default Request