var MongoClient = require('mongodb').MongoClient;

var log = require('../lib/log')(module);
var config = require('../config');
var connectionUrl = config.get('connectionUrlToDB');

module.exports = MongoClient.connect(connectionUrl);