import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom'
import App from './App'
import Login from './Components/SignIn';
import SignUp from './Components/SignUp';
// import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// import { WebSocketLink } from '@apollo/client/link/ws';

import {

  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";



// const httpClient = new ApolloClient({ uri: 'https://genuine-mammoth-32.hasura.app/v1/graphql' });

const GRAPHQL_ENDPOINT = 'gentle-ghost-74.hasura.app/v1/graphql';

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  }


});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  wsLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});
// const httpClient = new ApolloClient({ uri: 'https://genuine-mammoth-32.hasura.app/v1/graphql' });

class Routing extends React.Component {
  render() {
    return (
      <div className="center w85">

        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/home" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signUp" component={SignUp} />
          </Switch>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Routing />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
// ReactDOM.render(routing, document.getElementById('root'))