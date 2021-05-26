
function a(){
    try{
        return 'xxx'
    }finally{
  console.log('====================================');
  console.log('finally');
  console.log('====================================');
    }
}
a();