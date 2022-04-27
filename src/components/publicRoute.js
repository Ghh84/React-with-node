import React from 'react'
import {Route} from 'react-router-dom'
	
export default function PublicRoute({component:Component}){
  return (
    <Route render={()=>
      <Component/>
    }
    />
  )
}
