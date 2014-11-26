var fs = require("fs");
fs.readFile("helloworld.js","utf-8",function(data,err){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});
console.log("end..........");