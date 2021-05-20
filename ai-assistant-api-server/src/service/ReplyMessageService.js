var Promise = require('bluebird'),
	debug = require('debug')('intent-service'),
	_ = require('lodash'),
	db = require('../framework/mongoOperations');

/**
 * ReplyMessageService module.
 * @module controller/ReplyMessageService
 */
var ReplyMessageService = module.exports = {
	getReplyMessage: getReplyMessage
};

/**
 * [getReplyMessage finds the reply to the intent
 * @param  {[type]} intent 
 * @return object reply object to the intent
 */
function getReplyMessage(intent) {
	return new Promise(function(resolve, reject) {
		if (intent['name'] == "INTENT_NOT_FOUND")
			return resolve(Object.assign(intent, {
				"text": "Sorry, I didn't get that. I am still learning."
			}))


		db.findOneByQuery('intentReply', {
			"filter": {
				"name": intent['name']
			}
		}).then(function(intentReply) {
			if (_.isEmpty(intentReply))
				return resolve(Object.assign(intent, {
					"text": `No reply found in database for intent: '${intentName}' .`
				}))
			return resolve(Object.assign(intent, intentReply['reply'].toObject()));
		}).catch(function(err) {
			return reject(err);
		})
	})
}