import React,{useContext,useState} from "react";
// import logo from './logo.svg';
import "./App.css";

import Home from "./pages/Home";

import { HashRouter as Router, Link, Route } from "react-router-dom";
import Nav from "./pages/Nav"
import Header from "./pages/Header"
import Reducer1 from "./pages/Reducer1"
import Reducer2 from "./pages/Reducer2"

//  useContext
// import loginContext from './pages/useContext'

function App() {
  // const [user,setUser] = useState(null)
  return (
    <Router>
      <div className="App">
            <Nav/>
        
        <div className="content">
         <Header>
            <Route path="/" exact component={Home}></Route>
            <Route path="/Reducer1" exact component={Reducer1}></Route>
            <Route path="/Reducer2" exact component={Reducer2}></Route>


            </Header>

        </div>
        </div>
    </Router>
  );
}

export default App;
