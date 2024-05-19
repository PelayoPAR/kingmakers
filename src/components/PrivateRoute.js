import React from 'react'
import { Route, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function PrivateRoute({ component: Component, ...rest}) {

    const { currentUser } = useAuth()
    const navigate = useNavigate()
    if (!currentUser) {
        navigate("login")
        return (
            <Route
               {...rest}
            >
        
            </Route>
          )
    }

  return (
    <Route
       {...rest}
    >

    </Route>
  )
}
