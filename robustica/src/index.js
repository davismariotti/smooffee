import React, {Component} from 'react'
import {render} from 'react-dom'
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './components/App'
import {AUTH_TOKEN} from './constants'
import history from './utils/history'
import 'typeface-roboto'
import store from './store'

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
    return new Promise((resolve) => {
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
        resolve()
      })
    })
  }

  render() {
    const {client} = this.state
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Router history={history}>
            <App updateClientCallback={this.updateApolloClient}/>
          </Router>
        </ApolloProvider>
      </Provider>
    )
  }
}

render(<RootComponent/>, document.getElementById('root'))
