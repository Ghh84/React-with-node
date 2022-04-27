import React from 'react'
import {Route,Link,Redirect} from 'react-router-dom'
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
	  return (
		<Route render={()=>
		auth?
		( 
		<div>
			<div className='navigation'>
			<header>
			
			<nav>
			   <ul>
			   <li className="nav-item px-3">
                        <div className="nav-link active">
                          <span
                            className="oi oi-home"
                            aria-hidden="true"
                          ></span>{" "}
                          <Link to={"/Transactions"} className="nav-link">
                            Transactions
                          </Link>
                        </div>
                      </li>
                      {AuthService.getCurrentUser().role==1 &&<>
					  <li className="nav-item px-3">
                        <div className="nav-link active">
                          <span
                            className="oi oi-home"
                            aria-hidden="true"
                          ></span>{" "}
                          <Link to={"/Users"} className="nav-link">
                            Users
                          </Link>
                        </div>
                      </li>
					  <li className="nav-item px-3">
                        <div className="nav-link active">
                          <span
                            className="oi oi-home"
                            aria-hidden="true"
                          ></span>{" "}
                          <Link to={"/Balance"} className="nav-link">
                            Balance
                          </Link>
                        </div>
                      </li>
                      </>
                      }
					  <li className="nav-item px-2">
                        <div className="nav-link active">
                          <span
                            className="oi oi-home"
                            aria-hidden="true"
                          ></span>{" "}
                          <Link to={"/Logout"} className="nav-link" style={{backgroundColor:'white'}}>
                            LogOut
                          </Link>
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