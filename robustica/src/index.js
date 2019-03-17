import React, { Component } from 'react'
import { render } from 'react-dom'
import {ApolloClient, gql, HttpLink, InMemoryCache} from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Router } from 'react-router-dom'
import App from './components/App'
import {AUTH_TOKEN, ORGANIZATION_ID} from './constants'
import history from './utils/history'
import 'typeface-roboto'

const READ_USER_INFO = gql`
  query ReadCurrentUser {
    user {
      currentUser {
        id
        organizationId
      }
    }
  }
`

class RootComponent extends Component {
  constructor(props) {
    super(props)
    const localToken = localStorage.getItem(AUTH_TOKEN)
    this.state = {
      token: localToken,
      client: new ApolloClient({
        link: new HttpLink({
          uri: 'http://localhost:9000/graphql',
          headers: {
            authorization: localToken ? `Bearer ${localToken}` : ''
          }
        }),
        cache: new InMemoryCache()
      })
    }
    this.updateApolloClient = this.updateApolloClient.bind(this)
  }

  updateApolloClient(authToken) {
    localStorage.setItem(AUTH_TOKEN, authToken)
    return new Promise((resolve, reject) => {
      this.setState({
        token: authToken,
        client: new ApolloClient({
          link: new HttpLink({
            uri: 'http://localhost:9000/graphql',
            headers: {
              authorization: authToken ? `Bearer ${authToken}` : ''
            }
          }),
          cache: new InMemoryCache()
        })
      }, () => {
        const {client} = this.state
        client.query({query: READ_USER_INFO}).then(({error, data}) => {
          if (error) {
            reject(error)
          }
          localStorage.setItem(ORGANIZATION_ID, data.user.currentUser.organizationId)
          resolve()
        })
      })
    })
  }

  render() {
    const { client } = this.state
    return (
      <ApolloProvider client={client}>
        <Router history={history}>
          <App updateClientCallback={this.updateApolloClient} />
        </Router>
      </ApolloProvider>
    )
  }
}

render(<RootComponent />, document.getElementById('root'))
