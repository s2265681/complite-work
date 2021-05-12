
import '../webpack-dev-client'

let root = document.getElementById('root');
function render(){
   let title = require('./title').default;
   root.innerHTML= title;
}
render();


if(module.hot){
    console.log(module);
    module.hot.accept(['./title'],()=>{
        render();
    });
  }