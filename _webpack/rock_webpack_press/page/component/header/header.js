

import './header.scss';
import Logo  from '../../image/logo.jpg';

export default ()=>{
    let h2 =  document.createElement('h2')
    h2.textContent = 'header....'
    h2.setAttribute('class','header')
    let img = document.createElement('img')
    img.setAttribute('src','/'+Logo)
    img.style.cssText='width:50px;height:50px';
    h2.appendChild(img)
    return h2
 }