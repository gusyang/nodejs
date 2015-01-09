var net = require("net");
var chatServer = net.createServer(), clientList = [];

chatServer.on("connection",function(client){
	client.name = client.remoteAddress + " : " + client.remotePort;

	client.write("Welcome "+client.name+"!\n");	
    console.log(client.name + " joined");

    //add all client to a list
	clientList.push(client);

	client.on("data",function(data){
		broadcast(data,client);
	});

    client.on("end",function(){
        console.log(client.name + "quit");
        //remove client from client list after close.
        clientList.splice(clientList.indexOf(client),1);
    });

    client.on("error",function(e){
        //raise exception
        console.log(e);
    });
});

function broadcast(message,client){
    var cleanup = [];

	clientList.forEach(function(c){
        console.log(client.name + "broadcast");
        //do not broadcast to client self
		if(client !== c){
            if(c.writable){
			    c.write(client.name + " Says " + message);
            }else{
                cleanup.push(c);
                c.destroy();
            }
		}
    cleanup.forEach(function(clean){
        clientList.splice(clientList.indexOf(clean),1);
    });
    });
};

chatServer.listen(9000);
console.log("listening on port:9000");
