import React from 'react';
import { render } from 'react-dom';
import { hashHistory, IndexRoute, Route, Router } from 'react-router';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Recover from './components/auth/Recover';
import requireAuth from './utils/RequireAuth';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { AUTH_TOKEN } from './constants';

const token = localStorage.getItem(AUTH_TOKEN);

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:9000/graphql',
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  }),
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <Route path="login" component={Login}/>
        <Route path="signup" component={Signup}/>
        <Route path="recover" component={Recover}/>
        <Route path="home" component={Home} onEnter={requireAuth}/>
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
