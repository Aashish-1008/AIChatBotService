var Promise = require('bluebird'),
	mongoose = require('mongoose'),
	debug = require('debug')('mongoose-operation'),
	_ = require('lodash'),
	Collections = require('../models/index');

/** @type {Object} 
   this object contains all the db operation functions like inserting , updating etc.
 */
module.exports = {
	findOneByQuery: findOneByQuery,
	bulkInsert: bulkInsert
};

/**
 * findOneByQuery find one of document matching the query
 * @param  {string} collectionName collection name to search
 * @param  {object} query          json object for search criteria
 * @return {promise}               document
 */
function findOneByQuery(collectionName, query, plainObject) {
	return new Promise(function(resolve, reject) {
		var model = mongoose.model(collectionName);

		if (!_.isEmpty(query) && !query.filter) {
			return reject(new Error('findOneByQuery filter not found'));
		};

		var q = model.findOne(query.filter);

		if (query.projection) {
			q.select(query.projection);
		}

		if (query.populate) {
			_.each(query.populate, function(pop) {
				q = q.populate(pop)
			})
		}

		q.exec(function(err, document) {
			if (err) {
				return reject(err);
			} else {
				return resolve(document)
			}
		});
	});
}

/*
[bulkInsert] - bulk insert data to mongo collecton
* @param  {[String]} modelName [ pass model name for the mongodb document]
* @param  {Array} Array of objects  [data to be dumped into database]
 */
function bulkInsert(modelName, dumpData) {
	return new Promise(function(resolve, reject) {
		var model = mongoose.model(modelName)
		model.deleteMany({}, function(err, data) {
			model.collection.insertMany(dumpData, onInsert);
		})

		function onInsert(err, docs) {
			if (err) {
				return reject(err)
			} else {
				return resolve(docs)
			}
		}
	})
}