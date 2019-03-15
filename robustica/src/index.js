import React, { Component } from 'react'
import { render } from 'react-dom'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Router } from 'react-router-dom'
import App from './components/App'
import { AUTH_TOKEN } from './constants'
import history from './utils/history'
import 'typeface-roboto'

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

  updateApolloClient() {
    const localToken = localStorage.getItem(AUTH_TOKEN)
    this.setState({
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
    })
    const { client, token } = this.state
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
