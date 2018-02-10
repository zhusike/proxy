var express = require('express');
var app = express();
var request = require('request');//Stream API 运用到极致的 HTTP(S) 请求库。

app.use( function (req, res) {
  console.log(req.method);
  if (req.method=='OPTIONS') {//对于非简单请求
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , api-version, token');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.send();
  } else {
    res.header("Access-Control-Allow-Origin", "*");
    var option={
      url:'http://10.10.10.230:8092'+req.url,//代理的地址
      headers: {
        "api-version": "1",
        "token":"6a57356375b74fc28e616f16de4a08f8"
      }
    }
    var x = request(option)
     req.pipe(x).on('error',function(err){
       console.log(err);
     })
     x.pipe(res)
  }

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});
