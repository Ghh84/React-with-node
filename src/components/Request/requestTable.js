import React from "react";
import _ from 'lodash'
//import Joi from 'joi-browser'
import { Button, Alert } from "react-bootstrap";
import AuthService from '../../services/auth.service'
import TableHeader from "../common/tableHeader";
import CurrencySelect from "../common/currency";

 const RequestTable = ({columns, handlePageSwitch,sortColumn, handleSort,
    SelectedRequest, getUserName, handleApproveRequest, handleReject, Message,
    errored,setAmount, amount,currency, setsCurrency, comment, setComment,handleRequest}) => {
    return (
        <React.Fragment>
        {AuthService.getCurrentUser().role!==1 &&
       (<div className="card-body" style={{"height" : "25%", "width" : "30%","border": "3px solid black", "padding": "10px","marginLeft":"400px","marginTop":"0px"}}>
           <div className="edit-top">         
           <h2 className="title">Request balance form:</h2>
           <hr style={{backgroundColor:'gray',height:'2px'}}/>
           </div>
           {Message &&
                       <Alert variant='success'>{Message}</Alert>}
           {errored &&
                       <Alert variant='danger'>{errored}</Alert>}
           <form method="POST">
                    {/* <Input name='amount' label="Amount" required="required" setUsername={setAmount} error="" value={amount} /> */}
                    <div className="col-5">
                        <div className="input-group">
                            <label className="label">Amount<span class="required"></span></label>
                            <div className="input-group-icon">
                                <input  name='amount'  value={amount} className="form-control" type="text" 
                                 onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                   <label className="label" required >Currency</label>
                   <CurrencySelect required='required' name='currency' setUsername={setsCurrency}error="" value={currency} />
                   <label className="label">Comment</label>
                   <textarea className="input--style-4" type="text" style={{minWidth:'300px'}}name="first_name" value={comment} onChange={(e)=>setComment(e.target.value)}/>
                             
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
               <TableHeader columns={columns} sortColumn={sortColumn} onSort={handleSort} />
                   {/* <thead className="thead-dark">
                       <tr>   
                            <th scope="col">Agent Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Currency</th>
                            <th scope="col">Created Date</th>
                            <th scope="col">Updated Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Additional Information</th>
                            <th scope='col-2'>Approve or reject request</th>                           
                       </tr>
                   </thead> */}
                   <tbody> 
               {SelectedRequest.map((item)=>{
                   return(
                   <tr>
                       <td>{getUserName(item.userId)}</td>
                       <td>{item.Amount}</td>
                       <td>{item.currency}</td>
                       <td>{item.createdDate.substring(0, 10)}</td>
                       <td>{item.updatedDate.substring(0, 10)}</td>
                       <td>{item.status}</td>
                       <td>{item.comment}</td>  
                       {!(item.status=='Pending') &&
                    <React.Fragment>
                       <td>
                           <button disabled={true}  onClick={()=>handleApproveRequest(item,'Approved')} className="btn btn-primary btn-sm">Approve</button>
                           &nbsp; &nbsp; &nbsp; &nbsp;
                           <button disabled={true} onClick={() => handleReject(item,'Rejected')} className="btn btn-danger btn-sm">Reject</button>
                       </td>
                     </React.Fragment>
                    }
                   {item.status=='Pending' &&
                    <React.Fragment>
                       <td>
                           <button disabled={false}  onClick={()=>handleApproveRequest(item,'Approved')} className="btn btn-primary btn-sm">Approve</button>
                           &nbsp; &nbsp; &nbsp; &nbsp;
                           <button  disabled={false} onClick={() => handleReject(item,'Rejected')} className="btn btn-danger btn-sm">Reject</button>
                       </td>
                     </React.Fragment>
                    }
                   </tr>                        
                   )})}
                   </tbody> 
               </table>                 
               {/* <div>
                   <Button variant='success' style={{marginLeft:'25px',marginTop:'25px',minWidth:'0px'}} onClick={()=>handleSeeRequest()}>Approved</Button>
                   <Button  variant='warning' style={{marginLeft:'30px',marginTop:'25px',minWidth:'0px'}} onClick={()=>handlePageSwitch()}>Back</Button>
               </div> */}
           </div>
       }
        </React.Fragment>       
    );
 }
  
 export default RequestTable;