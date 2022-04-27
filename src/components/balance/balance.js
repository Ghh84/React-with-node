

import React,{useEffect, useState} from 'react'
import { Button, Alert,Modal } from "react-bootstrap";
import UserService from '../../services/user.service';
import _ from 'lodash'

const Add=({setPageState})=>{
    return(
        <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div className="wrapper wrapper--w680">
            <div className="card card-4">
                <div className="card-body">
                    <h2 className="title">Registration Form</h2>
                    <form method="POST">
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Name</label>
                                    <input className="input--style-4" type="text" name="first_name"/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">City</label>
                                    <input className="input--style-4" type="text" name="first_name"/>
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Country</label>
                                    <div className="input-group-icon">
                                        <input className="input--style-4 js-datepicker" type="text" name="birthday"/>
                                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Email</label>
                                    <div className="input-group-icon">
                                        <input className="input--style-4 js-datepicker" type="text" name="birthday"/>
                                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Email</label>
                                    <input className="input--style-4" type="email" name="email"/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Phone</label>
                                    <input className="input--style-4" type="text" name="phone"/>
                                </div>
                            </div>
                        </div>
                        <hr style={{color:'blue',height:'2px'}}/><br/>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Username</label>
                                    <input className="input--style-4" type="email" name="email"/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Password</label>
                                    <input className="input--style-4" type="password" name="phone"/>
                                </div>
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="rs-select2 js-select-simple select--no-search">
                                <select className='form-control selectpicker'>
                                    <option disabled="disabled" selected="selected">Choose role</option>
                                    <option>Subject 1</option>
                                    <option>Subject 2</option>
                                    <option>Subject 3</option>
                                </select>
                                <div className="select-dropdown"></div>
                            </div>
                        </div>
                        <div className="row row-space">
                        <div className="col-2">
                        <div className='input-group'>
                            <Button variant='success' >save</Button>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className='input-group'>
                            <Button  variant='warning' onClick={()=>setPageState({ isEdit: 0, isAdd: 0 })}>cancel</Button>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}
const Edit=({setPageState})=>{
    return(
        <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div className="wrapper wrapper--w680">
            <div className="card card-4">
                <div className="card-body">
                    <h2 className="title">Edit Form</h2>
                    <form method="POST">
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Name</label>
                                    <input className="input--style-4" type="text" name="first_name"/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">City</label>
                                    <input className="input--style-4" type="text" name="first_name"/>
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Country</label>
                                    <div className="input-group-icon">
                                        <input className="input--style-4 js-datepicker" type="text" name="birthday"/>
                                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Email</label>
                                    <div className="input-group-icon">
                                        <input className="input--style-4 js-datepicker" type="text" name="birthday"/>
                                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Email</label>
                                    <input className="input--style-4" type="email" name="email"/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Phone</label>
                                    <input className="input--style-4" type="text" name="phone"/>
                                </div>
                            </div>
                        </div>
                        <hr style={{color:'blue',height:'2px'}}/><br/>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Username</label>
                                    <input className="input--style-4" type="email" name="email"/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Password</label>
                                    <input className="input--style-4" type="password" name="phone"/>
                                </div>
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="rs-select2 js-select-simple select--no-search">
                                <select className='form-control selectpicker'>
                                    <option disabled="disabled" selected="selected">Choose role</option>
                                    <option>Subject 1</option>
                                    <option>Subject 2</option>
                                    <option>Subject 3</option>
                                </select>
                                <div className="select-dropdown"></div>
                            </div>
                        </div>
                        <div className="row row-space">
                        <div className="col-2">
                        <div className='input-group'>
                            <Button variant='success' >save</Button>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className='input-group'>
                            <Button  variant='warning' onClick={()=>setPageState({ isEdit: 0, isAdd: 0 })}>cancel</Button>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}


const Balance =()=>{
    const [userData,setUserData]=useState([])
    const [{ isEdit, isAdd }, setPageState] = useState({ isEdit: 0, isAdd: 0 })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [modalAmt,setModalAmt]=useState(0)
    const [addOrSubtruct,setAddOrSubtruct]=useState('add')
    const [userAmt,setUserAmt]=useState(0)
    const [user,setUser]=useState(1)
    const gnumber=100000
    const gnumber2=0
    useEffect(()=>{
        console.log('going to get users')
         UserService.getUsers().then((res)=>{
          const response=res.data
          console.log('data fetched....',response)
          setUserData(response)
         }).catch(err=>{
           console.log(err)
             console.log('error fetching data from users table..........')
         })
      },[])
      function handleUpdate(){
        setShow(false)
        console.log(userAmt,addOrSubtruct,modalAmt,user)
        let updatedBalance=0
        if(addOrSubtruct=='add') updatedBalance=!!userAmt?userAmt:0 + parseInt(modalAmt)
        else updatedBalance=userAmt - parseInt(modalAmt)
        console.log('updated amount...',updatedBalance)
        const balanceObj={
            balance:updatedBalance,
            userId:user
        }
        UserService.updateUser(balanceObj).then((res)=>{
            console.log(res.data)
            window.location.reload(false)
        }).catch((err)=>{

        })
        
      }
      function handleModalOpen(userId,uBalance,action){
        setUserAmt(parseFloat(uBalance))
        setUser(userId)
        setAddOrSubtruct(action)
        console.log(addOrSubtruct,userAmt)
        setShow(true)
      }
    return(
        <div>
            { !isEdit?
            (<div className='balanceBody'>
                    <div className="cards">
                    {!_.isEmpty(userData) && userData.map(item=>{
                       return( 
                       <div className={`card text-white mb-3 ${parseFloat(item.balance)>0?'bg-success':'bg-danger'}`} style={{maxWidth:'18rem',padding:'0px'}}>
                        <div class="card-header">{item.name}</div>
                        <div class="card-body">
                            <div className='circle'>
                            <p class="card-text">{parseFloat(item.balance).toLocaleString('en-US')}</p>
                            </div>
                            <div className='card-actions'>
                            <Button variant='primary' onClick={()=>handleModalOpen(item.id,item.balance,'add')}><h1>+</h1></Button>
                            <Button variant='danger' onClick={()=>handleModalOpen(item.id,item.balance,'subtruct')}><h1>-</h1></Button>
                            </div>
                        </div>
                    </div>)
                    })}
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    
                    >
                    <Modal.Header closeButton>
                        <Modal.Title>Update Balance</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <input className="input--style-4" value={modalAmt} type="text" onChange={(e)=>setModalAmt(e.target.value)}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={()=>handleUpdate()}>update</Button>
                    </Modal.Footer>
                </Modal>
                        
                    </div>
                </div>):!isAdd?
                <Edit setPageState={setPageState}></Edit>:<Add setPageState={setPageState}></Add>
   
}   

        </div>
    )
}

export default Balance