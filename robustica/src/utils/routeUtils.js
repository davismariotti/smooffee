import { Redirect, Route } from 'react-router-dom'
import React from 'react'
import { AuthService } from '../services/AuthService'
import { ANONYMOUS} from './role'

export const ProtectedRoute = (
  {
    component: Component,
    allowedRoles,
    redirect: pathname,
    ...rest
  }
) => {
  return (
    <Route
      {...rest}
      render={props =>
        AuthService.isSignedIn() && (AuthService.userInRoles(allowedRoles || [ANONYMOUS])) ? <Component {...rest} {...props} /> : <Redirect to={{pathname, state: {from: props.location}}}/>
      }
    />
  )
}

export const AuthenticatedRoute = (
  {
    component: Component,
    redirect: pathname,
    ...rest
  }) => {
  return (
    <Route
      {...rest}
      render={props =>
        AuthService.isSignedIn() ? <Component {...rest} {...props} /> : <Redirect to={{pathname, state: {from: props.location}}}/>
      }
    />
  )
}

ProtectedRoute.defaultProps = {redirect: '/login', allowedRoles: [ANONYMOUS]}
