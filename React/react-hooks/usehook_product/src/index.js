import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Table from './pages/Table'
import Drag from './pages/Drag'
import Animation from './pages/Animation'
import Form from './pages/Form'


ReactDOM.render(
  <div className="container">
     <div className='row'>
       <div className='col-md-12'>
          <BrowserRouter>
             <Link to='table'>Table</Link> | 
             <Link to='drag'>Drag</Link> | 
             <Link to='form'>Form</Link> | 
             <Link to='animation'>Animation</Link>
             <Route path='/table' component={Table}/>
             <Route path='/drag' component={Drag}/>
             <Route path='/animation' component={Animation}/>
             <Route path='/form' component={Form}/>
          </BrowserRouter>
       </div>
     </div>
  </div>,
  document.getElementById('root')
)