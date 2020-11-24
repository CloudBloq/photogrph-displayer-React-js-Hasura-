import logo from './logo.svg';
import './App.css';
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import Album from './Components/Album'
import Heading from './Components/Heading'
import Drawer from './Components/Drawer'
import Footer from './Components/Footer'
import { ApolloProvider } from '@apollo/client'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: 'https://genuine-mammoth-32.hasura.app/v1/graphql',
//   })
// })



function App() {
  return (

    <div className="App">
      <header >
        <Heading />
      </header>

      <body>
        <div>
          <Album />
        </div>
      </body>
      <footer>
        <Footer />
      </footer>

    </div>

  );
}

export default App;
