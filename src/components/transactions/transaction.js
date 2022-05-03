import PropTypes from "prop-types";
import React,{useEffect, useState,useRef} from 'react'
import Add from './add';
import Edit from './edit'
import Request from "./request";
import { Button, Alert,Glyphicon } from "react-bootstrap";
import TransactionService from '../../services/transaction.service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserService from '../../services/user.service';
import configs from '../../configs/local'
import AuthService from '../../services/auth.service';

function Pagination({ data, pageLimit, dataLimit,handleSelection, selectedPage, setSelectedPage }) {
  console.log('data in pagingation',data.length)
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
      if (selectedPage !== "")
          setCurrentPage(selectedPage)
  }, [selectedPage])



  function goToNextPage() {
      setSelectedPage(currentPage + 1)
      setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
      setSelectedPage(currentPage - 1)
      setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
      const pageNumber = Number(event.target.textContent);
      setSelectedPage(pageNumber)
      setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
      const startIndex = currentPage * dataLimit - dataLimit;
      const endIndex = startIndex + dataLimit;
      // console.log('data to be displayed......',data.slice(startIndex, endIndex));
      return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
      let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
      return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
 
  return (
      <div>
          {/* show the posts, 10 posts at a time */}
          <div className="dataContainer">
            <div className='table-responsive-sm'>
          <table className='table table-hover'>
                <thead>
                  <tr>
                    <th style={{color:'blue',backgroundColor:'#f8a915'}}>Ticket No</th>
                    
                    <th style={{color:'green',backgroundColor:'yellow'}}>Status</th>
                    <th style={{color:'white',backgroundColor:'green'}}>Name</th>
                    <th style={{color:'white',backgroundColor:'green'}}>City</th>
                    <th style={{color:'white',backgroundColor:'green'}}>Amount</th>
                    <th style={{color:'white',backgroundColor:'green'}}>Country</th>
                    <th style={{color:'white',backgroundColor:'green'}}>Reference</th>
                    <th style={{color:'white',backgroundColor:'blue'}}>Name</th>
                    <th style={{color:'white',backgroundColor:'blue'}}>City</th>
                    <th style={{color:'white',backgroundColor:'blue'}}>Amount</th>
                    <th style={{color:'white',backgroundColor:'blue'}}>Country</th>
                    {AuthService.getCurrentUser().role===1 &&
                    <th style={{color:'green',backgroundColor:'yellow'}}>Agent</th>
                    }
                    
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedData().map((item,index)=>{
                        return <tr >
                                    <td className='nameTag' onClick={()=>handleSelection(item)}>{item.ticketNo}</td>
                                   
                                    <td style={{backgroundColor:'#FBFAC6',color:item.status==='Paid'?'green':item.status==='Pending'?'black':'red'}}><button style={{color:'white',fontSize:'10px',width:'20px',height:'20px',backgroundColor:item.status==='Paid'?'green':item.status==='NotPaid'?'red':'gray',borderRadius:'50%',marginRight:'5px'}}>{item.status==='Paid'?'✔':item.status==='NotPaid'?'X':''}</button>{item.status}</td>
                                    <td style={{backgroundColor:'#A1F3A7'}}>{item.sName}</td>
                                    <td style={{backgroundColor:'#A1F3A7'}}>{item.sCity}</td>
                                    <td style={{backgroundColor:'#A1F3A7'}}>{item.sAmount}</td>
                                    <td style={{backgroundColor:'#A1F3A7'}}>{item.sCountry}</td>
                                    <td style={{backgroundColor:'#A1F3A7'}}>{item.sReference}</td>
                                    <td style={{backgroundColor:'#B1B6F9'}}>{item.rName}</td>
                                    <td style={{backgroundColor:'#B1B6F9'}}>{item.rCity}</td>
                                    <td style={{backgroundColor:'#B1B6F9'}}>{item.rAmount}</td>
                                    <td style={{backgroundColor:'#B1B6F9'}}>{item.rCountry}</td>
                                    {AuthService.getCurrentUser().role===1 &&
                                    <td style={{backgroundColor:'#FBFAC6'}}>{item.name}</td>
                                    }
                                    
                      </tr>
                      })}
                  

                </tbody>
              </table>
              </div>
          </div>
          <div className="paginationAuditContainer">
              <div className="pagination">
                  {/* previous button */}
                  <button
                      onClick={goToPreviousPage}
                      className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                  >
                      Prev
                  </button>

                  {/* show page numbers */}
                  {getPaginationGroup().map((item, index) => (
                      <button
                          key={index}
                          onClick={changePage}
                          className={`paginationItem ${currentPage === item ? 'active' : null}`}
                      >
                          <span>{item}</span>
                      </button>
                  ))}

                  {/* next button */}
                  <button
                      onClick={goToNextPage}
                      className={`next ${currentPage === pages ? 'disabled' : ''}`}
                  >
                      Next
                  </button>
              </div>
              <div className="empty"></div>
          </div>
      </div>
  );
}
const Transaction=()=> {
  const [{ isEdit, isAdd,isRequest }, setPageState] = useState({ isEdit: 0, isAdd: 0,isRequest:0 })
  const [selectedTxn,setSelectedTxn]=useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [txData,settxData]=useState([])
  const [users,setUsers]=useState([])
  const [selectedPage, setSelectedPage] = useState('')
  const [filteredData,setFilteredData]=useState([])

function handleSelection(item) {
    console.log('came to transaction selections..',item)
    setSelectedTxn(item)
    setPageState({ isEdit: 1, isAdd: 0,isRequest:0 })

}
function handleAdd() {
  setPageState({ isEdit: 1, isAdd: 1 ,isRequest:0})

}
function handleRequest() {
  //
  setPageState({ isRequest: 1, isAdd:0, isEdit:0})

}
function handleSeeRequest() {

  setPageState({ isRequest: 1, isAdd:0,isEdit:0})
  //<Request handlePageSwitch={handlePageSwitch} selectedTxn={selectedTxn}/>
}
function handleSearch(e,property){
  console.log('######',property,e.target.value)
  const txDataTemp=[...txData]
  console.log('######',txDataTemp)
  const result=txDataTemp.filter(object=> {
    console.log(startDate,endDate)
    var date = startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate();
    //var date2 = object['createdDate'].getFullYear()+'-'+(object['createdDate'].getMonth()+1)+'-'+object['createdDate'].getDate();
    console.log('date tiem...',date,object['createdDate'])
    return object[property]===e.target.value}
    )
  settxData(result)
}
function handleChange(e,property){
  console.log('@@@@@@@',property,e.target.value)
  /* if(property=='userId') setFagent(e.target.value)
  if(property=='status') setFstatus(e.target.value)
  if(property=='country') setFcountry(e.target.value) */
 // if(property=='status') setFstatus(e.target.value)
 handleSearch(e,property)
}
function handlePageSwitch(){
  
  setPageState({ isEdit: 0, isAdd: 0, isRequest:0});
  window.location.reload(false)
  
}

useEffect(()=>{
   TransactionService.getAllTransactions().then((res)=>{
    const response=res.data
    
    UserService.getUsers().then((res)=>{
      console.log('response from users',res.data)
      let userResponse=res.data
      if(AuthService.getCurrentUser().role!==1){
        //filter transaction data based on agent
        let filtered=response.filter((f)=> f.userId===AuthService.getCurrentUser().id)
        let filteredUser=userResponse.filter((u)=>u.id===AuthService.getCurrentUser().id)  
        settxData(filtered)
        setUsers(filteredUser)
      }
      else{
         settxData(response) 
           setUsers(res.data)}
      
  })
  
   }).catch(err=>{
     console.log(err)
       console.log('error fetching data from transaction table..........')
       
   })
},[])


console.log('user....',users)

  return(
        <div className='transactions'>         
          {!isEdit && isRequest==0?(
            <div>
              <div className='search-row'>
              <div className="row-9"><span>&nbsp;&nbsp;</span></div>
              <img src='../../refresh.jpg' style={{height:'55px',width:'55px',borderRadius:'15px',marginTop:'-10px'}} alt='refresh' onClick={()=>window.location.reload(false)}></img>
              {AuthService.getCurrentUser().role===1 &&
              <select class='form-control selectpicker' style={{marginTop:'25px'}} onChange={(e)=>handleChange(e,'userId')}>
                                <option disabled="disabled" selected="selected">select agent</option>
                                {users.map((item,index)=>{
                                       return <option value={item.id}>{item.name}</option>
                                })}
                            </select>
          }
          <select class="form-control selectpicker" style={{marginTop:'25px'}} onChange={(e)=>handleChange(e,'status')}>
          <option disabled="disabled" selected="selected">select status</option>
          {configs.statuses.map((s,index)=>{
                                       return <option value={s}>{s}</option>
                                })}
          </select>
         
          {/* <select class="form-control selectpicker" onChange={(e)=>handleChange(e,'sCountry')}>
          <option disabled="disabled" selected="selected">Sender Country</option>
          {configs.countries.map((c,index)=>{
                                       return <option value={c}>{c}</option>
                                })}
          </select> */}
          {/* <select class="form-control selectpicker" onChange={(e)=>handleChange(e,'rCountry')}>
          <option disabled="disabled" selected="selected">Receiver Country</option>
          {configs.countries.map((c,index)=>{
                                       return <option value={c}>{c}</option>
                                })}
          </select> */}
         
          <div className='datepickercss'>
            <div>
          Start Date<DatePicker className='input--style-4' selected={startDate} style={{marginLeft:'0'}} onChange={(Date) => setStartDate(Date)} />
            </div>
            <div>
          End Date<DatePicker className='input--style-4' selected={endDate} onChange={(Date) => setEndDate(Date)} />
            </div>
            {AuthService.getCurrentUser().role===1 &&
            <div>
            <Button variant='primary'  style={{marginBottom:'5px',marginTop:'25px',maxHeight:'20px'}} onClick={()=>handleAdd()}>Add New</Button>
           </div>
                }
            {AuthService.getCurrentUser().role===1 &&
           <div>
            <Button variant='primary'  style={{marginBottom:'5px',marginTop:'25px',minWidth:'150px',maxHeight:'20px'}} onClick={()=>handleSeeRequest()}>See your request</Button> 
          </div>
            }
     
          </div>
          {AuthService.getCurrentUser().role!==1 &&
           <div style={{marginLeft:'5px',fontWeight:'bold'}} className='balance-box'> Balance:<p class="balanceNumber">{!!users[0]?parseFloat(users[0].balance).toLocaleString('en-US'):''}</p></div>
          }
          <div className="col-9">
          <div className="row-9"><span>&nbsp;&nbsp;</span></div>
          {/* adding agent request Button */}
          {AuthService.getCurrentUser().role!==1 &&
            <Button variant='primary'  style={{marginBottom:'5px',maxHeight:'40px'}} onClick={()=>handleRequest()}>Request Balance</Button>
          }
          </div>
          </div>
          <div className='log-pagination'>
          <Pagination
                  data={txData}
                  pageLimit={10}
                  dataLimit={10}
                  setPageState={setPageState}
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                  handleSelection={handleSelection}
        />
        </div>
            </div>
            
          ):isEdit && isRequest==0?
        <Edit handlePageSwitch={handlePageSwitch} selectedTxn={selectedTxn}/>:
        <Request handlePageSwitch={handlePageSwitch} selectedTxn={selectedTxn}/>
        }
        {/* {isRequest==1 &&
          <Add handlePageSwitch={handlePageSwitch}/>
          
        } */}

        </div>      
  )
      
}
Pagination.propTypes = {
  dataLimit: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  data: PropTypes.string.isRequired,
  setPageState:PropTypes.func.isRequired,
  selectedPage:PropTypes.func.isRequired,
  setSelectedPage:PropTypes.func.isRequired,
  handleSelection:PropTypes.func.isRequired
};

export default Transaction