import "./assets/main.less";
import * as React from "react";

{{#if router}}
import { HashRouter as Router, Route, Link } from "react-router-dom";
{{/if }}

import About from './components/About';

{{#if redux}}
import {Provider} from "react-redux";
import {createStore} from "redux";
const store = createStore(rootReducer);
import rootReducer from "./reducer/index";
import Home from './containers/AddCount';
{{else}}
import Home from './components/Home';
{{/if}}
class App extends React.Component{

  componentDidMount(){
  }
  render(){
    return (
      <div className="container">
        {{#if router}}
        <Router >
        {{/if }}
          <h1 >hello world</h1>
          <img src={require("./assets/react-icon.png")}  />
        {{#if router}}
          <Route path="/home" component={Home}/>
          <Route path="/about" component={About}/>
          <div >
            <Link to="/home" >home</Link>
            <Link to="/about" >about</Link>
          </div>
        </Router>
        {{else}}
        <Home />
        {{/if }}
      </div>
    )
  }
}


{{#if redux}}
const Providers  = ()=>(<Provider store={store}><App/></Provider>)
export default Providers;
{{else}}
export default App;
{{/if}}
