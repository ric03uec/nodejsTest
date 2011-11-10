
// http module that ships with node.js
var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(request, response){
		var pathName = url.parse(request.url).pathname;
		console.log("Request for pathname " + pathName + " received");

		route(handle, pathName, response, request);


		/*
	 //---- Code to process Post Data Chunks----
		request.setEncoding("utf8");
		
		var postData = "";
		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("Received Post data chunk " + postDataChunk );
		});

		request.addListener("end", function(){
			route(handle, pathName, response, postData);
		});
		*/
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server started...");
}

exports.start = start;

// function of http module
/*
http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("yo! world");
	response.end();
	console.log("this is a console log");
}).listen(8888);
*/
//console.log("Server has started");
