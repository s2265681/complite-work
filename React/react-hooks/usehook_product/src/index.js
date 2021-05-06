import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Link } from 'react-router-dom';

ReactDOM.render(
  <div className="container">
     <div className='row'>
       <div className='col-md-12'>
          <BrowserRouter>
             <Link to='table'>Table</Link>
             <Link to='drag'>Drag</Link>
             <Route path='table' compoent={Table}/>
             <Route path='drag' compoent={Drag}/>
          </BrowserRouter>
       </div>
     </div>
  </div>
)