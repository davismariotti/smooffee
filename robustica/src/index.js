import React, { Component } from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { ConnectedRouter} from 'connected-react-router'
import App from './components/App'
import history from './utils/history'
import 'typeface-roboto'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'loaders.css/loaders.min.css'
import { client } from './services/apollo'
import createNewStore from './services/store'

const store = createNewStore(history)

class RootComponent extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App/>
          </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    )
  }
}

render(<RootComponent/>, document.getElementById('root'))
