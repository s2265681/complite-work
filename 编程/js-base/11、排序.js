


 let mapT = [{
    letter: 'B', domTop: 424
 },{
    letter: 'C', domTop: 1824
 },{
    letter: 'D', domTop: 1944 
 },{
    letter: 'E', domTop: 1988
 },{
    letter: 'F', domTop: 2000
 }]

 let heightTop = 1900


 function sortReturnLetter(dataSource, offsetTop){
    for(let i=dataSource.length-1;i>=0;){
        if(offsetTop>=dataSource[i].domTop){
             return dataSource[i].letter
        }else{
            i--
        }
    }
 }

   //=> 返回 'C'
 console.log( sortReturnLetter(mapT,heightTop) , '//.')



 