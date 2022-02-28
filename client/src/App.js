import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Landing_Page from './components/Landing_Page';
import HomeH from './components/HomeH';
import Form_CreationH from './components/Form_CreationH'
import Detail from './components/Detail';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing_Page} />
          <Route path="/home" component={HomeH} />
          <Route path="/detail" component={Detail} />
          <Route path="/razanueva" component={Form_CreationH} />
        </Switch>
      </Router>
  );
}

export default App;
