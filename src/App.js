import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./components/pages/Home";
import Control from "./components/pages/Control";
import MonitorP from "./components/pages/MonitorPanel";
import Monitor from "./components/pages/Monitor";
import Billing from "./components/pages/Billing";
//import Rain from "./components/pages/Rain";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component = {Home} />
        <Route path="/MonitorPanel" component = {MonitorP} />
        <Route path="/Monitor" component = {Monitor} />
        <Route path="/Billing" component = {Billing} />
        <Route path="/Control" component = {Control} />
        {/* <Route path="/Rain" component = {Rain} /> */}
      </Switch>Rain
    </Router>
  );
}

export default App;
