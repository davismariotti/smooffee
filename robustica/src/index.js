import React, {Component} from 'react'
import {render} from 'react-dom'
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {BrowserRouter} from 'react-router-dom'
import App from './components/App'
import './css/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import {AUTH_TOKEN} from './constants'

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
    this.updateApolloClient = this.updateApolloClient.bind(this);
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
    const {client, token} = this.state
    console.log('updateApolloClient', client)
    console.log('updateApolloClient', token)
  }

  render() {
    const {client} = this.state
    console.log('client', client)
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App updateClientCallback={this.updateApolloClient}/>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

render(<RootComponent/>,
  document.getElementById('root')
)
