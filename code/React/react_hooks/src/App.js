import React,{useContext,useState} from "react";
// import logo from './logo.svg';
import "./App.css";
import UseForm from './pages/UseForm'
import UseFetch from './pages/UseFetch'
import UseLayoutEffect from './pages/UseLayoutEffect'
import ReactHooks from "./components/ReactHooks";
import Home from "./pages/Home";
import UseCallBack from "./pages/UseCallBack";
import HookUseReducer1 from "./components/UseReducer1";
import HookUseReducer2 from "./components/UseReducer2";
import Picture from "./components/Picture";
import ItemIndex from "./pages/Item";
import RTable from "./pages/RTable";
import RSpider from "./pages/RSpider";
import { HashRouter as Router, Link, Route } from "react-router-dom";
import Nav from "./pages/Nav"
import Header from "./pages/Header"

//  useContext
import loginContext from './pages/useContext'

function App() {
  const [user,setUser] = useState(null)
  return (
    <Router>
      <div className="App">
            <Nav/>
        
        <div className="content">
        <loginContext.Provider value={{user,setUser}}>
         <Header>
            <Route path="/" exact component={Home}></Route>
            <Route path="/UseForm" component={UseForm}></Route>
            <Route path="/ReactHooks" component={ReactHooks}></Route>
            <Route path="/HookUseReducer1" component={HookUseReducer1}></Route>
            <Route path="/HookUseReducer2" component={HookUseReducer2}></Route>
            <Route path="/picture" component={Picture}></Route>
            <Route path="/itemIndex" component={ItemIndex}></Route>
            <Route path="/RTable" component={RTable}></Route>
            <Route path="/RSpider" component={RSpider}></Route>
            <Route path="/UseFetch" component={UseFetch}></Route>
            <Route path="/UseLayoutEffect" component={UseLayoutEffect}></Route>
            <Route path="/UseCallBack" component={UseCallBack}></Route>
            </Header>
          </loginContext.Provider>

        </div>
        </div>
    </Router>
  );
}

export default App;
