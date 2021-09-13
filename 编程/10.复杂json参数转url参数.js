
// var parseParam = function (param, key) {
//     var paramStr = "";
//     if (
//       param instanceof String ||
//       param instanceof Number ||
//       param instanceof Boolean
//     ) {
//       paramStr += "&" + key + "=" + encodeURIComponent(param);
//     } else {
//       $.each(param, function (i) {
//         var k =
//           key == null
//             ? i
//             : key + (param instanceof Array ? "[" + i + "]" : "." + i);
//         paramStr += "&" + parseParam(this, k);
//       });
//     }
//     return paramStr.substr(1);
//   };

const obj = {
    id:111,
    name: 'lihua'
}
// =>  www.baidu.com?id=111&name=lihua

const obj1 = [{
    id:1,
    name:'lihua1'
}]

// =>  www.baidu.com?obj1[0].id=1&obj1[0].name='lihua1'
var parseParam = function (param, key) {
    var paramStr = "";
    if (
      param instanceof String ||
      param instanceof Number ||
      param instanceof Boolean
    ) {
      paramStr += "&" + key + "=" + encodeURIComponent(param);
    } else {
      $.each(param, function (i) {
        var k =
          key == null
            ? i
            : key + (param instanceof Array ? "[" + i + "]" : "." + i);
        paramStr += "&" + parseParam(this, k);
      });
    }
    return paramStr.substr(1);
  };