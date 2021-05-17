import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import {useStateValue} from './StateProvider'


const App = () => {

  const [{user}, dispatch] = useStateValue()

  return (
    <div className="App">
      {!user ? <Login/> : 
      
      <div className = "app_body">
        <Router>
            <Sidebar/>
            <Switch>
            <Route path = "/rooms/:roomId">
              <Chat/>
            </Route>
            <Route path = "/">
              <Chat/>
            </Route>
          </Switch>
        </Router>
      </div>

      }
      
    </div>
  );
}

export default App;
