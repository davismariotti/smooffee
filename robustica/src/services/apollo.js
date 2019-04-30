import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { AuthService } from './AuthService'
import { getArabicaUri } from './env'

const httpLink = new HttpLink({uri: getArabicaUri()})

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

const afterware = onError(({networkError, graphQLErrors, operation}) => {
  if (graphQLErrors) console.error(`GraphQL Error with ${operation.operationName}`, graphQLErrors)
  if (networkError && networkError.statusCode === 401) AuthService.signout()
})

function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: asyncAuthLink.concat(afterware.concat(httpLink)),
    defaultOptions: {
      fetchPolicy: 'no-cache'
    }
  })
}

export const client = createApolloClient()
