
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
	
async function lsExample() {
  const { stdout, stderr } = await exec('dir');
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
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
	
    default:  // 讀取檔案
	var type = mime[path.extname(path0.pathname).slice(1)] || 'text/plain';
    // var type = 'image/jpeg';
    var s = fs.createReadStream(folderPath + "/" + path0.pathname);
    s.on('open', function () {
        res.setHeader('Content-Type', type);
		// res.setHeader('Content-disposition', 'attachment; filename='+query.file);
        s.pipe(res);
    });
    s.on('error', function () {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Not found');
    });	
	
	
	// res.setHeader('Content-Type', 'text/plain');
    // res.end(  path0.pathname + '\n' );
	//	exec('dir').unref();
		lsExample();
		
        break;
    }	
	
	

});

server.listen(port, ip);

console.log("Server running at http://" + ip + ":" + port);