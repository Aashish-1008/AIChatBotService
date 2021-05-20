var mongoose = require('mongoose'),
	debug = require('debug')('database');



/**
 * Database module.
 * @module framework/database
 */
var Database = module.exports = {
	init: init,
	getReadyState: getReadyState
}

var dbURI;
/**
 * @param  {config object }
 * @return {null}
 */
function init(config) {
	if (!config) {
		config = Config.value.database
	}
	//Local MongoDB URL
	dbURI = config.dbURI;
	mongoose.connect(dbURI, config.clientOptions);
}


/** 
 * gets the ready state of database
 * @return {boolean} status of database readiness
 */
function getReadyState() {
	var status = mongoose.connection.readyState;

	if (status == 1)
		return true;
	else {
		return false;
	}
}

//Listen for mongoose connection events and output statuses to console
mongoose.connection.on('connected', function() {
	debug('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
	debug('Mongoose connection error : ' + err);
});