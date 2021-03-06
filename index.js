// example #1: localhost:1111/?name=rpi_220&camerasensorwidth=1.4&camerasensorheight=1.4&icx=1320.0&icy=1017.0&ratio=1.048&imagewidth=2592&imageheight=1944&calibrationratio=3.4&para0=0&para1=0&para2=0&para3=10.11&para4=-85.241&para5=282.21&mode=1&alpha=0&beta=0&zoom=4
// example #2: localhost:1111/x.map?name=rpi_220&camerasensorwidth=1.4&camerasensorheight=1.4&icx=1320.0&icy=1017.0&ratio=1.048&imagewidth=2592&imageheight=1944&calibrationratio=3.4&para0=0&para1=0&para2=0&para3=10.11&para4=-85.241&para5=282.21&mode=1&alpha=0&beta=0&zoom=4
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


async function exec_cli(params_str) {
// const { stdout, stderr } = await exec('./mainmoil rpi_220 1.4 1.4 1320.0 1017.0 1.048 2592 1944 3.4 0 0 0 10.11 -85.241 282.21 1 0 0 4');
const { stdout, stderr } = await exec('./mainmoil ' + params_str);
// console.log('stdout:', stdout);
// console.error('stderr:', stderr);
}	



server = http.createServer(function(req, res) {
path0 = url.parse(req.url,true);
const name = path0.query['name'];
const camerasensorwidth = path0.query['camerasensorwidth'];
const camerasensorheight = path0.query['camerasensorheight'];
const icx = path0.query['icx'];
const icy = path0.query['icy'];
const ratio = path0.query['ratio'];
const imagewidth = path0.query['imagewidth'];
const imageheight = path0.query['imageheight'];
const calibrationratio = path0.query['calibrationratio'];
const para0 = path0.query['para0'];
const para1 = path0.query['para1'];
const para2 = path0.query['para2'];
const para3 = path0.query['para3'];
const para4 = path0.query['para4'];
const para5 = path0.query['para5'];
const mode = path0.query['mode'];
const alpha = path0.query['alpha'];
const beta = path0.query['beta'];
const zoom = path0.query['zoom'];

const params =  name + ' ' + camerasensorwidth + ' ' + camerasensorheight + ' ' +
icx + ' ' + icy + ' ' +
ratio + ' ' + imagewidth + ' ' + imageheight + ' ' + calibrationratio + ' ' +
para0 + ' ' + para1 + ' ' + para2 + ' ' + para3 + ' ' + para4 + ' ' + para5 + ' ' +
mode + ' ' + alpha + ' ' + beta + ' ' + zoom;

switch (path0.pathname) {
case "/":
    res.setHeader('Content-Type', 'text/plain');
    res.end( 'params = '+ params + '\n');
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

exec_cli(params);
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