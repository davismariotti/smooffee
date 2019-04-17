import { Redirect, Route } from 'react-router-dom'
import React from 'react'
import { AuthService } from '../services/AuthService'
import { ANONYMOUS, SYSADMIN } from './role'

export const ProtectedRoute = (
  {
    component: Component,
    allowedRoles,
    redirect: pathname,
    ...rest
  }
) => {
  console.log('AuthService.isSignedIn()', AuthService.isSignedIn())
  console.log('allowedRoles', allowedRoles)
  return (
    <Route
      {...rest}
      render={props =>
        AuthService.isSignedIn() && (AuthService.userInRoles(allowedRoles || [ANONYMOUS])) ? <Component {...rest} {...props} /> : <Redirect to={{pathname, state: {from: props.location}}}/>
      }
    />
  )
}

ProtectedRoute.defaultProps = {redirect: '/login', allowedRoles: [ANONYMOUS]}
