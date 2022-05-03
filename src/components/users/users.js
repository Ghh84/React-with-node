import React,{useEffect, useState} from 'react'
import { Button, Alert } from "react-bootstrap";
import UserService from '../../services/user.service';
import SearchBox from '../common/searchBox';
import Select from '../common/select';
import Input from '../common/input';
import Country from '../common/country';



const Add=({handlePageSwitch})=>{

      const [name,setName]=useState('')
      const [city,setCity]=useState('')
      const [phone,setPhone]=useState('')
      const [email,setEmail]=useState('')
      const [country,setCountry]=useState('')
      const [username,setUsername]=useState('')
      const [password,setPassword]=useState('')
      const [role,setRole]=useState(1)
      const [balance,setBalance]=useState(0)
      const [message,setMessage]=useState('')
      const [succeded,setSucceded]=useState('')
      const [errored,setErrored]=useState('')
      
      function handleAdd(){
          const obj={name,city,country,phone,email,balance,role,username,password}
          if(obj.name==''||obj.username==''||obj.password=='') setMessage('One or more information is missing!')
          else{
              
              UserService.addUser(obj).then((res)=>{
                  console.log('successfully added',res.data)
                  setErrored('')
                  setSucceded('A new user is successfully added!')
                  setMessage('')
                }).catch((err)=>{
                    setSucceded('')
                    setErrored('New user creation failed!')
                    setMessage('')
                })
            }
        }
      
    return(
        <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div className="wrapper wrapper--w680">
            <div className="card card-4">
                <div className="card-body">
                    <h2 className="title">User registration Form</h2>
                    {!!message &&
                            <Alert variant='danger'>{message}</Alert>}
                    {!!succeded &&
                            <Alert variant='success'>{succeded}</Alert>}
                    {!!errored &&
                            <Alert variant='danger'>{errored}</Alert>}
                    


                    <form method="POST">
                         {/* <div>
                        </div> 
                        <SearchBox value={name} onChange={setName} /> */}

                        <div className="row row-space">
                             <div className="col-2">
                             <Input name={name} label="Name" required="required" setUsername={setName} error=""/>
                                {/* <div className="input-group">
                                    <label className="label" class="required">Name</label>
                                    <input className="input--style-4" type="text" onChange={(e)=>setName(e.target.value)} name="first_name"/>
                                </div> */}
                            </div>
                            <div className="col-2">
                            <Input name={city} label="City" required="required" setUsername={setCity} error=""/>
                                {/* <div className="input-group">
                                    <label className="label" class="required">City</label>
                                    <input className="input--style-4" type="text"  onChange={(e)=>setCity(e.target.value)} name="first_name"/>
                                </div> */}
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2"> 
                            <label className="label" class='required'>Country</label>                             
                                <Country />                                 
                                {/* <div className="input-group">
                                    <label className="label" class="required">Country</label>
                                    <div className="input-group-icon">
                                        <input className="input--style-4 js-datepicker" onChange={(e)=>setCountry(e.target.value)} type="text" name="birthday"/>
                                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div>
                                </div> */}
                            </div>
                            <div className="col-2">
                            <Input name={email} label="Email" required="" setUsername={setEmail} error=""/>
                                {/* <div className="input-group">
                                    <label className="label">Email</label>
                                    <div className="input-group-icon">
                                        <input className="input--style-4 js-datepicker" type="email" onChange={(e)=>setEmail(e.target.value)} name="birthday"/>
                                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div> 
                                </div>*/}
                            </div>
                            
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                            <Input name={balance} label="Balance" required="required" setUsername={setBalance} error=""/>
                                {/* <div className="input-group">
                                    <label className="label" class="required">Balance</label>
                                    <input className="input--style-4" type="number" onChange={(e)=>setBalance(e.target.value)} name="email"/>
                                </div> */}
                            </div>
                            <div className="col-2">
                                <Input name={phone} label="Phone" required="required" setUsername={setPhone} error=""/>
                                {/* <div className="input-group">
                                    <label className="label" class="required">Phone</label>
                                    <input className="input--style-4" type="number" onChange={(e)=>setPhone(e.target.value)} name="phone"/>
                                </div> */}
                            </div>
                        </div> 
                        <hr style={{color:'blue',height:'2px'}}/><br/>
                        <div className="row row-space">
                            <div className="col-3" style={{width: '185px'}}>
                                <Input name={username} label="Username" required="required" setUsername={setUsername} error=""/>

                                {/* <div className="input-group">
                                    <label className="label" class="required">Username</label>
                                    <input className="input--style-4" type="text" onChange={(e)=>setUsername(e.target.value)} name="email"/>
                                </div> */}
                            </div>
                            <div style={{width: '185px'}}>
                                <Input name={password} label="Password" required="required" setUsername={setPassword} error=""/>
                                {/* <div className="input-group">
                                    <label className="label" class="required">Password</label>
                                    <input className="input--style-4" type="password"  onChange={(e)=>setPassword(e.target.value)} name="phone"/>
                                </div> */}
                            </div>
                        </div>

                        <div className="input-group">
                        <Select name={name} label="Choose Role" option='1' setRole={setRole} />
                            {/* <div className="rs-select2 js-select-simple select--no-search">
                                <select class='form-control selectpicker' onChange={(e)=>setRole(e.target.value)}>
                                    <option disabled="disabled" selected="selected" >Choose role</option>
                                    <option> 1</option>
                                    <option> 2</option>
                                    <option> 3</option>
                                </select>
                                <div className="select-dropdown"></div>
                            </div> */}
                        </div>
                        <div className="row row-space">
                        <div className="row ">
                    <div className="col-12">
                    <div className='input-group'>
                        <Button variant='success' style={{marginLeft:'180px',minWidth:'100px'}} onClick={()=>handleAdd()}>Add</Button>
                        <Button  variant='warning' style={{marginLeft:'50px',minWidth:'100px'}} onClick={()=>handlePageSwitch()}>Back</Button>
                        </div>
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
const Edit=({handlePageSwitch,selectedUser})=>{
    console.log('selected User.......',selectedUser)
    const [name,setName]=useState(selectedUser.name)
    const [city,setCity]=useState(selectedUser.city)
    const [country,setCountry]=useState(selectedUser.country)
    const [phone,setPhone]=useState(selectedUser.phone)
    const [email,setEmail]=useState(selectedUser.email)
    const [balance,setBalance]=useState(selectedUser.balance)
    const [role,setRole]=useState(selectedUser.role)
    const [username,setUsername]=useState(selectedUser.username)
    const [password,setPassword]=useState(selectedUser.password)
    const [message,setMessage]=useState('')
    const [succeded,setSucceded]=useState('')
    const [errored,setErrored]=useState('')
    const [id,setUserId]=useState(selectedUser.id)
    function handleEdit(){
        const obj={name,city,country,phone,email,balance,role,username,password,id}
        if(obj.name===''||obj.username===''||obj.password==='') {
            setErrored('')
            setSucceded('')
            setMessage('One or more information is missing!')}
        else{
            
            UserService.updateUser(obj).then((res)=>{
                console.log('successfully updated',res.data)
                setErrored('')
                setMessage('')
                setSucceded('User updated successfully!')
              }).catch((err)=>{
                  setSucceded('')
                  setMessage('')
                  setErrored('User update failed!')
              })
          }
      }
      console.log('alerts...',succeded,errored,message)
    return(
        <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div className="wrapper wrapper--w680">
            <div className="card card-4">
                <div className="card-body">
                    <h2 className="title">Edit User Form</h2>
                    {!!message &&
                            <Alert variant='danger'>{message}</Alert>}
                    {!!succeded &&
                            <Alert variant='success'>{succeded}</Alert>}
                    {!!errored &&
                            <Alert variant='danger'>{errored}</Alert>}
                    
                     <form method="POST">
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Name</label>
                                    <input className="input--style-4" value={name} onChange={(e)=>setName(e.target.value)} type="text" name="first_name"/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">City</label>
                                    <input className="input--style-4" type="text" value={city} onChange={(e)=>setCity(e.target.value)} name="first_name"/>
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Country</label>
                                    <div className="input-group-icon">
                                        <input className="input--style-4 js-datepicker"  value={country} onChange={(e)=>setCountry(e.target.value)} type="text" name="birthday"/>
                                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Email</label>
                                    <div className="input-group-icon">
                                        <input className="input--style-4 js-datepicker"  value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="birthday"/>
                                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Balance</label>
                                    <input className="input--style-4" value={balance} onChange={(e)=>setBalance(e.target.value)} type="number" name="email"/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Phone</label>
                                    <input className="input--style-4"  value={phone} onChange={(e)=>setPhone(e.target.value)} type="number" name="phone"/>
                                </div>
                            </div>
                        </div>
                        <hr style={{color:'blue',height:'2px'}}/><br/>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Username</label>
                                    <input className="input--style-4" type="text" value={username} onChange={(e)=>setUsername(e.target.value)}  name="email"/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Password</label>
                                    <input className="input--style-4" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="phone"/>
                                </div>
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="rs-select2 js-select-simple select--no-search">
                                <select class='form-control selectpicker' value={role} onChange={(e)=>setRole(e.target.value)}>
                                    <option disabled="disabled" selected="selected">Choose role</option>
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                                <div className="select-dropdown"></div>
                            </div>
                        </div>
                        <div className="row row-space">
                        <div className="row ">
                    <div className="col-12">
                    <div className='input-group'>
                        <Button variant='success' style={{marginLeft:'180px',minWidth:'100px'}} onClick={()=>handleEdit()}>Update</Button>
                        <Button  variant='warning' style={{marginLeft:'50px',minWidth:'100px'}} onClick={()=>handlePageSwitch()}>Back</Button>
                        </div>
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

const Users =()=>{
    const [userData,setUserData]=useState([])
    const [selectedUser,setSelectedUser]=useState([])
    const [{ isEdit, isAdd }, setPageState] = useState({ isEdit: 0, isAdd: 0 })
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
      function handleSelection(item) {
        console.log('came to transaction selections..',item)
        setSelectedUser(item)
        setPageState({ isEdit: 1, isAdd: 0 })
    
    }
    function handlePageSwitch(){
        setPageState({ isEdit: 0, isAdd: 0 })
        window.location.reload(false)
    }
    

    return(
        <div>
            { !isEdit?
            (<div className='userBody'>
            <table className='usersTable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>username</th>
                        <th>password</th>
                        <th>role</th>
                    </tr>
                </thead>
                <tbody>
                        {userData.map((item,index)=>{
                            return <tr>
                                <td><a href='#' onClick={()=>handleSelection(item)}>{item.name}</a></td>
                                <td>{item.username}</td>
                                <td>{item.password}</td>
                                <td>{item.role}</td>
                            </tr>
                        })}
                </tbody>
                </table>
                <div className='userAddButton'>
                <Button variant='primary' onClick={()=>setPageState({ isEdit: 1, isAdd: 1 })}>Add New</Button>
                </div>
                </div>):!isAdd?
                <Edit handlePageSwitch={handlePageSwitch} selectedUser={selectedUser}></Edit>:<Add handlePageSwitch={handlePageSwitch}></Add>
                     }   

        </div>
    )
}


export default Users