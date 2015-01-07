//demo zip functions

var paramArray = process.argv;
var inputValue = paramArray.length == 2 ? "1" : paramArray[2].toString();
var useJsZip = function(){
    var zip = new require("node-zip")();
    var fs = require("fs");

    var content = fs.readFileSync("../npm-debug.log");
    zip.file("1.log",content);
    var data = zip.generate({base64:false,compression:"DEFLATE"});
    fs.writeFileSync("test.zip",data,"binary");
};

var useAdmZip = function(){
    console.log("use adm zip");
};

var useArchiver = function(){
    console.log("use archiver");
};

switch(inputValue){
    case "1":
        useJsZip();
        break;
    case "2":
        useAdmZip();
        break;
    case "3":
        useArchiver();
        break;
    default:
        console.log("unknow parameter.."+inputValue);
}

