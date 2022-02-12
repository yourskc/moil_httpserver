
var server,
ip = "127.0.0.1",
port = 1111,
http = require('http'),
fs = require("fs"),
path = require("path"),
folderPath = ".",
url = require('url'),
path0,
filePath,
encode = "utf8";
// var spawn = require('child_process').spawn;

const util = require('util');
const exec = util.promisify(require('child_process').exec);

var mysql = require('mysql');

var mime = {
html: 'text/html',
txt: 'text/plain',
css: 'text/css',
gif: 'image/gif',
jpg: 'image/jpeg',
png: 'image/png',
svg: 'image/svg+xml',
js: 'application/javascript',
moi: 'application/moil'
};

var con = mysql.createConnection({
host: "localhost",
user: "moil",
password: "********",
database: "moil"
});	


var params=function(req){
//console.log("req="+req.url);
var q=req.url.split('?'),result={};
if(q.length>=2){
//console.log("q[1]="+q[1]);
  q[1].split('&').forEach((item)=>{
//console.log("("+item+")");
       try {
         result[item.split('=')[0]]=item.split('=')[1];
       } catch (e) {
         result[item.split('=')[0]]='';
       }
  })
}
return result;
}


async function exec_cli() {
const { stdout, stderr } = await exec('./mainmoil rpi_220 1.4 1.4 1320.0 1017.0 1.048 2592 1944 3.4 0 0 0 10.11 -85.241 282.21 1 0 0 4');
// console.log('stdout:', stdout);
// console.error('stderr:', stderr);
}	



server = http.createServer(function(req, res) {
path0 = url.parse(req.url);

switch (path0.pathname) {
case "/":
    res.end('Hello Moil\n');
break;


case "/mysql":

var retStr = "" ;	
con.connect(function(err) {
if (err) throw err;
console.log("Connected!");
var sql = "select * from users";
con.query(sql, function (err, result, fields) {
if (err) throw err;
console.log(result);  	
});
});	

res.end('this is mysql page.\n');
break;


case "/x.map":

exec_cli();
// var s = fs.createReadStream(folderPath + "/" + path0.pathname);
var s = fs.createReadStream( "./x.map" );
s.on('open', function () {
res.setHeader('Content-Type', 'application/moil');
// res.setHeader('Content-disposition', 'attachment; filename='+query.file);
res.statusCode = 200;
s.pipe(res);
});
s.on('error', function () {
res.setHeader('Content-Type', 'text/plain');
res.statusCode = 404;
res.end('Error');
});	

break; 

case "/y.map":

// exec_cli(); // suppose x.map would be called first
// var s = fs.createReadStream(folderPath + "/" + path0.pathname);
var s = fs.createReadStream( "./y.map" );
s.on('open', function () {
res.setHeader('Content-Type', 'application/moil');
// res.setHeader('Content-disposition', 'attachment; filename='+query.file);
res.statusCode = 200;
s.pipe(res);
});
s.on('error', function () {
res.setHeader('Content-Type', 'text/plain');
res.statusCode = 404;
res.end('Error');
});	

break; 
default:  

break;




}	



});

server.listen(port, ip);

console.log("Server running at http://" + ip + ":" + port);