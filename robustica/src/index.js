import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Orders from "./components/orders";
import App from "./components/App";
import * as ServiceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-boost";

const httpLink = createHttpLink({
  //server is for now running on localhost:4000
  uri: "http://localhost:9000"
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
ServiceWorker.unregister();
