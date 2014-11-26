var net = require("net");
var chatServer = net.createServer(), clientList = [];

chatServer.on("connection",function(client){
	client.name = client.remoteAddress + " : " + client.remotePort;

	client.write("Hi"+client.name+"!\n");	
	clientList.push(client);

	//client.write("Bye!\n");
	client.on("data",function(data){
		broadcast(data,client);
	});
});

function broadcast(message,client){
	for(var i=0;i<=clientList.length;i+=1){
		if(client !== clientList[i])
			//console.log(clientList[i]);
			clientList[i].write(client.name + " Says " + message);
		}
		console.log(data);
}
chatServer.listen(9000);