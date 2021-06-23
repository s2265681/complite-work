import React from './react';
import ReactDom from './reactDom';
import App from './app'

// const jsx = (
//   <div>这是div</div>
// )

ReactDom.render(
  <App/>,
  // jsx,
  document.querySelector('#root')
);