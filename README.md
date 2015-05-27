nodejs
======

for node js demo project only

=====use redis auth use <mranney/node_redis>===
* redis.conf
    requirepass gus
  then start redis with redis-server ./redis.config

  > option 1: add pwd when createClient
    var redis = require("redis"),
	client = redis.createClient({auth_pass:"gus"});
	
	> option 2: client.auth(password, callback)
    var redis = require("redis"),
	client = redis.createClient();
	client.auth("gus");
	

