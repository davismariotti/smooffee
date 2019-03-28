import React, {Component} from 'react'
import {render} from 'react-dom'
import {ApolloProvider} from 'react-apollo'
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './components/App'
import history from './utils/history'
import 'typeface-roboto'
import createApolloClient from './services/apollo'
import createNewStore from './services/store'

const client = createApolloClient()
const store = createNewStore()

class RootComponent extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router history={history}>
            <App/>
          </Router>
        </Provider>
      </ApolloProvider>
    )
  }
}

render(<RootComponent/>, document.getElementById('root'))
