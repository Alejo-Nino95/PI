import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Landing_Page from './components/Landing_Page';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing_Page} />
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
