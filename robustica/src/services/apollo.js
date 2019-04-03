import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {HttpLink} from 'apollo-link-http'
import {ApolloLink} from 'apollo-link'
import {onError} from 'apollo-link-error'
import {AUTH_TOKEN} from '../constants'
import {AuthService} from './AuthService'

const httpLink = new HttpLink({uri: 'http://localhost:9000/graphql'})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization token to the headers
  const token = localStorage.getItem(AUTH_TOKEN) || null
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })
  return forward(operation)
})

const authAfterware = onError(({ networkError }) => {
  if (networkError.statusCode === 401) AuthService.signout()
})

function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authMiddleware.concat(authAfterware).concat(httpLink),
  })
}

export const client = createApolloClient()
