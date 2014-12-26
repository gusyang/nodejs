var settings = require("../conf/db-mongo");
var db = require("mongodb").Db;
var Connection = require("mongodb").Connection;
var server = require("mongodb").Server;

model.exports = new db(settings.db, new server(settings.host, Connection.DEFAULT_PORT,{}));
