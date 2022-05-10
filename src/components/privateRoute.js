import React,{useState} from 'react'
import {Route,NavLink,Redirect} from 'react-router-dom'
import AuthService from '../services/auth.service';
	const useAuth=()=>{
	  const user=localStorage.getItem('user')
      console.log('user........private',user)
	  if(user){
	    return true
	  } else {
	    return false
	  }
	}
	

	export default function PrivateRoute({component:Component,...rest}){
	  const auth=useAuth()
	  console.log('auth...',auth)
   
  const [activeStyle,setActiveStyle] = useState({transaction:{ color: '#ff3333' },user:{ color: '' },balance:{ color: '' }});
    const _handleClick=(value)=> { 
      if(value==='transaction') {
        setActiveStyle({})
        setActiveStyle({transaction:{ color: '#ff3333'}})
      }  
      else if(value==='user'){
        setActiveStyle({})
        setActiveStyle({user:{ color: '#ff3333'}})
      }
      else if(value==='balance'){
        setActiveStyle({})
        setActiveStyle({balance:{ color: '#ff3333'}})
      }
    }
	  return (
		<Route render={()=>
		auth?
		( 
		<div>
			<div className='navigation'>
			<header>
			
			<nav>
			   <ul>
			   <li className="nav-item px-3" key={1}>
                        <div className="nav-NavLink active">
                          <span
                            className="oi oi-home"
                            aria-hidden="true"
                          ></span>{" "}
                          <NavLink to={"/Transactions"}
                              className="nav-NavLink"  
                              style={ activeStyle.transaction } 
                              onClick={_handleClick.bind(this,'transaction')}>
                            Transactions
                          </NavLink>
                          
                        </div>
                      </li>
                      {AuthService.getCurrentUser().role==1 &&<>
					  <li className="nav-item px-3" key={2}>
                        <div className="nav-NavLink active">
                          <span
                            className="oi oi-home"
                            aria-hidden="true"
                          ></span>{" "}
                          <NavLink to={"/Users"} className="nav-NavLink" style={ activeStyle.user } 
                              onClick={_handleClick.bind(this,'user')}>
                            Users
                          </NavLink>
                        </div>
                      </li>
					  <li className="nav-item px-3" key={3}>
                        <div className="nav-NavLink active">
                          <span
                            className="oi oi-home"
                            aria-hidden="true"
                          ></span>{" "}
                          <NavLink to={"/Balance"} className="nav-NavLink" style={ activeStyle.balance } 
                              onClick={_handleClick.bind(this,'balance')}>
                            Balance
                          </NavLink>
                        </div>
                      </li>
                      </>
                      }
					  <li className="nav-item px-2" key={4}>
                        <div className="nav-NavLink active">
                          <span
                            className="oi oi-home"
                            aria-hidden="true"
                          ></span>{" "}
                          <NavLink to={"/Logout"}  className="font-weight-bold" 
                              >
                            LogOut
                          </NavLink>
                        </div>
                      </li>
			   </ul>
			</nav>          
		 	</header>
		 </div>
		 <Component {...rest}/>
		 </div>): (<Redirect to='/login'/>)
		}
	  />
	  ) 
	}
	

	//export default PrivateRoute;