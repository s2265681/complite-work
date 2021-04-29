function loader(source) {
  console.log("normal1");
  return source + "//normal1";
}
loader.pitch = function(){
  return 'normal1pitch';
}
module.exports = loader;