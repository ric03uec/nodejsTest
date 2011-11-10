var queryString = require("querystring");
var fs = require("fs");
var formidable = require ("formidable");
function start(response, postData){
	console.log("Request hanlder 'start' was called. ");
	
	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

/*	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
*/

	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write(body);
	response.end();
}

function upload(response, request){
	console.log("Request handler 'upload' was called. ");
	
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files){
		console.log("parsing done");
		fs.renameSync(files.upload.path, "/tmp/test.jpeg");
		response.writeHead(200, {"Content-Type" : "text/html"});
		response.write("received image : <br/>");
		response.write("<img src='/show' />");
		response.end();
	});
	/*
	//----------Code for process post data --------------//
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.write("You sent " + queryString.parse(postData).text);
	response.end();
	*/
}

function show(response, postData){
	console.log("Request handler 'show' called.. ");
	fs.readFile("/tmp/test.jpeg", "binary", function(error, file){
		if(error){
			response.writeHead(500, {"Content-Type" : "text/plain"});
			response.write(error + "\n");
			response.end();
		}else{
			response.writeHead(200, {"Content-Type" : "image/jpeg"});
			response.write(file, "binary");
			response.end();
		}
	});
}


exports.start = start;
exports.upload = upload;
exports.show = show;
