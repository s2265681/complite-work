var $imgs = $('.container .img-holder');
var l = $imgs.length;
var radius = 400;


TweenMax.set($('.container'), {
				css: {
					transformStyle: 'preserve-3d',
					perspective: 800,
					perspectiveOrigin: '50% 50%' 
				}
			});  

var posArray = [];
var totalImgToView = 5;
var imgMinus = 0.6301;
var angle = 0;
$imgs.each(function(i, item){
     
    angle = i * 0.63; 
  //console.log('angle ',angle);   
    var zPos = - Math.abs(angle * (100 ));  
     
   var xPos = Math.sin (angle) * radius;    
  posArray.push({x:xPos,z:zPos,angle:angle});
  var imgAlpha = (Math.ceil(0.5 * totalImgToView) * imgMinus) * 100;
    //imgAlpha = Math.abs(zPos) < imgAlpha ? 1 : 0;
  TweenMax.to(item,1, {x:xPos,z:zPos,ease:Expo.easeOut,autoAlpha:0}); 
});   
        
 
var curImgViewIndex = 0;
var targetImgViewIndex = 0;
var curIntervalId = 0; 
var scrollbarDragging = false;

function rotate(){
   var minusVal = targetImgViewIndex - curImgViewIndex > 0 ? -0.6301 : 0.6301; 
  
  var easeObj;
  var tweenTime;
  if(Math.abs(targetImgViewIndex - curImgViewIndex) === 1){
    easeObj = Quint.easeOut;
    tweenTime = 1;
  }else {
    easeObj = Linear.easeNone;
    tweenTime = 0.15;
  }
  
  $imgs.each(function(i, item){  
    var pos = posArray[i];                       
    pos.angle = pos.angle + minusVal ;  //(0.6301*0.06);  
    var angleDistance = pos.angle * 100;
    var zPos = - Math.abs(angleDistance);
    var xPos =  Math.sin (pos.angle) * radius;   
    var imgAlpha = (Math.ceil(0.5 * totalImgToView) * imgMinus) * 100;
    
    imgAlpha = Math.abs(zPos) < imgAlpha ? 1 : 0; 
    var rotDeg = Math.round(angleDistance) >= 0 ? -30 : 30;
    rotDeg = Math.round(angleDistance) === 0 ? 0 : rotDeg;
       
    
    TweenMax.to(item, tweenTime,  {x:xPos,z:zPos,ease:easeObj,autoAlpha:imgAlpha,rotationY:rotDeg});
         
   });    
  minusVal > 0 ? curImgViewIndex-- : curImgViewIndex++; 
  
  if(curImgViewIndex === targetImgViewIndex){
    clearInterval(curIntervalId);
  }
  
  
}    
 
function showImgAt(index){
  targetImgViewIndex = index;
  if(targetImgViewIndex === curImgViewIndex){
    return;
  }
  clearInterval(curIntervalId);
  curIntervalId = setInterval(function(){
    rotate();
  },150);
  
  //update scrollbar 
  if(!scrollbarDragging){
    var l = $imgs.length - 1;
    if(targetImgViewIndex > l){
      return;
    }
    var curScrollX = Math.abs(Math.round(targetImgViewIndex * (702 / l ) ) );    
    var tweenTime = Math.abs((targetImgViewIndex - curImgViewIndex) * 0.2);
    TweenMax.to($('.scroller'),tweenTime,{x:curScrollX,ease:Sine.easeOut});
  }
}

 
//CONTROLLER UPDATE
var $input = $('.controller input');
$input.keyup(function(e){
  if(e.keyCode === 13){
    showImgAt(parseInt($input.val()))
  }
});

//just to do start up animation
showImgAt(5);




//----------------------- Dragging Utility ----------------------
Draggable.create('.scroller',{type:'x',bounds:{left:0,top:0,width:802,height:0},onDrag:function(){
     var curImgIndex = Math.abs(Math.round(this.x / (802/l)));
     
     targetImgViewIndex = curImgIndex;
  if(targetImgViewIndex === curImgViewIndex){
    return;
  }
  rotate();
  
},onDragStart:function(){
  scrollbarDragging = true;
},onDragEnd:function(e){
  scrollbarDragging = false;
}}); 

$('.scrolller-container').on('click',function(e){
   var curImgIndex = Math.abs(Math.round(e.offsetX / (802/l)));
   if(curImgIndex >= $imgs.length){
     curImgIndex = $imgs.length - 1;
   }console.log('boom');
   showImgAt(curImgIndex);
});

$('.scrolller-container .scroller').on('click', function(e){
   e.stopPropagation();
});


$imgs.on('click',function(){   
    showImgAt($imgs.index($(this)));
}); 