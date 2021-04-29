function loader(source) {
  console.log("normal2");
  return source + "//normal2";
}
/* loader.pitch = function(){
  return 'normal-loader2-pitch';
} */
module.exports = loader;