const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer(function(request, response) {

	const urlPath = url.parse(request.url).pathname;
//	const filePath = `./client/${urlPath}`;
	let filePath = `./client/${urlPath}`;

	fs.stat(filePath, function(err, fileInfo) {
		if (!err && fileInfo.isDirectory()) {
			filePath += "/index.html";
		}
		//asynchronous, so move processing in block
		fs.exists(filePath, function(doesExist) {
			if (!doesExist) {
				response.statusCode = 404;
				response.end('Resource not found: "${urlPath}"');
			} else {
				fs.readFile(filePath, (err, data) => {
					if (err) {
						response.statusCode = 500;
						response.end(`Server error: "${err}"`);
					} else {
						response.end(data.toString('utf-8'));
					}
				});
			}
		});
	});

/*
	fs.exists(filePath, function(doesExist) {
		if (!doesExist) {
			response.statusCode = 404;
			response.end('Resource not found: "${urlPath}"');
		}
	});

	fs.readFile(filePath, (err, data) => {
		if (err) {
			response.statusCode = 500;
			response.end(`Server error: "${err}"`);
		} else {
			response.end(data.toString('utf-8'));
		}
	});
*/
/*
	fs.readFile('./client/adder.html', (err, data) => {
		response.end(data.toString('UTF-8'));
	});
*/
//	response.end('Hello world!\n');
});
/*
server.listen(process.env.PORT || 3000, function() {
	console.log(`Server listening...`);
}); 
*/
var PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
	console.log(`Server listening on port ${PORT}...`);
});
