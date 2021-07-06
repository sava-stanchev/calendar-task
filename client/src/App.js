import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import MainPage from './components/MainPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect path="/" exact to="/home" />
          <Route exact path="/home" component={MainPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
