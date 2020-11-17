import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom'
import App from './App'
import Login from './Components/SignIn';
import SignUp from './Components/SignUp';

// import { ApolloProvider } from '@apollo/client'
// import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'https://genuine-mammoth-32.hasura.app/v1/graphql' });

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: 'https://genuine-mammoth-32.hasura.app/v1/graphql',
//   })
// })
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

// const Routing = () => {

//   return (
//     <div>

//       <Route exact path="/home" component={App} />
//       <Route exact path="/login" component={Login} />
//       <Route exact path="/signUp" component={SignUp} />

//   </div>
//   );

// }

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Routing />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
// ReactDOM.render(routing, document.getElementById('root'))