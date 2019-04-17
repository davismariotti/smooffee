import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { AuthService } from './AuthService'

const httpLink = new HttpLink({uri: 'http://localhost:9000/graphql'})

const asyncAuthLink = setContext(
  () => {
    return new Promise((success, reject) => {
      AuthService.getAuthToken().then(token => {
        success({
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          }
        })
      }).catch(error => {
        reject(error)
      })
    })
  }
)

const authAfterware = onError(({networkError}) => {
  if (networkError.statusCode === 401) AuthService.signout()
})

function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: asyncAuthLink.concat(authAfterware.concat(httpLink))
  })
}

export const client = createApolloClient()
