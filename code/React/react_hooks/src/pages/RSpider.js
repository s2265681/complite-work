import React from "react";
import RSpider from "../components/RSpider/index";
import './splider.css'

export default function RSpider() {
    return (
        <div className="container">
             <RSpider
                autoplay
                initIdx={0}
                deployTime={2000} 
                height={200}
             >
               <div>
               <img src="http://img3.imgtn.bdimg.com/it/u=1553709961,3652782060&fm=26&gp=0.jpg" alt="图一"
               />
               </div>
               <div>
               <img src="http://img4.imgtn.bdimg.com/it/u=3471735586,1899139408&fm=26&gp=0.jpg" alt="图二"
               />
               </div>
               <div>
               <img src="http://img2.imgtn.bdimg.com/it/u=1303806583,1572175195&fm=26&gp=0.jpg" alt="图三"
               />
               </div>
               <div>
               <img src="http://img2.imgtn.bdimg.com/it/u=1303806583,1572175195&fm=26&gp=0.jpg" alt="图四"/>
               </div>
             </RSpider>
        </div>
    )
}
