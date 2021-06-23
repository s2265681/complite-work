import React from 'react';
// import React from './react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// var 
let style= {border:'3px solid red',margin:'5px'}
let element = (
  <div id="A1" style={style}>
      A1
     <div id="B1" style={style}>
        B1
        <div id="C1" style={style}>C1</div>
        <div id="C2" style={style}>C2</div>
     </div>
     <div id="B2" style={style}>
       B2
     </div>
  </div>
)

// "use strict";
/*#__PURE__*/
// React.createElement("div", {
//   id: "A1"
// }, /*#__PURE__*/React.createElement("div", {
//   id: "B1"
// }, /*#__PURE__*/React.createElement("div", {
//   id: "C1"
// }), /*#__PURE__*/React.createElement("div", {
//   id: "C2"
// })), /*#__PURE__*/React.createElement("div", {
//   id: "B2"
// }));

console.log(element,'element')

ReactDOM.render(
  element,
  document.getElementById('root')
);