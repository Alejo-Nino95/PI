import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Landing_Page from './components/Landing_Page';
import Home from './components/Home';
import Form_Creation from './components/Form_Creation'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing_Page} />
        <Route exact path="/home" component={Home} />
        <Route path="/razanueva" component={Form_Creation} />
      </Switch>
    </Router>
  );
}

export default App;
