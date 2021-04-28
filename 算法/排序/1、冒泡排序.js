let arr = [5,4,1,3,6,7,8,9,0,6]

function sortFun(arr){
    console.time()
   for(let i=0;i<arr.length-1;i++){
       for(let j=i+1; j< arr.length; j++){
             if(arr[i]>arr[j]){
                [arr[i],arr[j]] = [arr[j],arr[i]]
                flag = true;
             }

       }
   }
   console.timeEnd();
}


sortFun(arr)
